const { expect } = require("chai");
const hardhat = require("hardhat");
const { ethers } = hardhat;
const { LazyMinter } = require("../lib/Minter");

async function deploy() {
 const [minter, redeemer] = await ethers.getSigners();

 const Token = await ethers.getContractFactory("MyToken");
 const token = await Token.connect(redeemer).deploy();
 await token.deployed();

 let factory = await ethers.getContractFactory("LazyNFT", minter);
 const contract = await factory.deploy(token.address);

 return {
  minter,
  redeemer,
  contract,
  token,
 };
}

describe("LazyNFT", function () {
 it("Should deploy", async function () {
  const signers = await ethers.getSigners();
  const minter = signers.address;

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy();
  await token.deployed();

  const LazyNFT = await ethers.getContractFactory("LazyNFT");
  const lazynft = await LazyNFT.deploy(token.address);
  await lazynft.deployed();
 });

 it("Should mint token and redeem an NFT from a signed voucher", async function () {
  const { contract, redeemer, minter, token } = await deploy();

  // Mint 60 token to redeemer address
  await token.connect(redeemer).mint(redeemer.address, 60);

  // Approve lazyMint contract to spend behalf of the owner
  await token.connect(redeemer).approve(contract.address, 20);

  const approvedAmount = await token.allowance(
   redeemer.address,
   contract.address
  );
  console.log("Approved Amount", approvedAmount.toString());

  console.log(
   "Redeemer minted token balance",
   await token.balanceOf(redeemer.address)
  );
  console.log("redeemer address ", redeemer.address);
  console.log("minter address", minter.address);

  const lazyMinter = new LazyMinter({ contract, signer: minter });
  const voucher = await lazyMinter.createVoucher(
   1,
   "https://i.imgur.com/1OIzgw5.jpeg",
   10
  );

  const tokenId = voucher.tokenId;
  const minPrice = voucher.minPrice;
  const uri = voucher.uri;
  const signature = voucher.signature;

  await expect(
   contract.redeem(redeemer.address, tokenId, minPrice, uri, signature)
  )
   .to.emit(contract, "Transfer") // transfer from null address to minter
   .withArgs(
    "0x0000000000000000000000000000000000000000",
    minter.address,
    voucher.tokenId
   )
   .and.to.emit(contract, "Transfer") // transfer from minter to redeemer
   .withArgs(minter.address, redeemer.address, voucher.tokenId);

  console.log("redeemer", await token.balanceOf(redeemer.address));
  console.log("seller", await token.balanceOf(minter.address));
  console.log("NFT owner", await contract.ownerOf(1));
 });
});
