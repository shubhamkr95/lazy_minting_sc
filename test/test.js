const { expect } = require("chai");
const hardhat = require("hardhat");
const { ethers } = hardhat;
const { LazyMinter } = require("../lib/Minter");

async function deploy() {
 const [minter, redeemer, _] = await ethers.getSigners();

 let factory = await ethers.getContractFactory("LazyNFT", minter);
 const contract = await factory.deploy();

 return {
  minter,
  redeemer,
  contract,
 };
}

describe("LazyNFT", function () {
 it("Should deploy", async function () {
  const signers = await ethers.getSigners();
  const minter = signers.address;

  const LazyNFT = await ethers.getContractFactory("LazyNFT");
  const lazynft = await LazyNFT.deploy();
  await lazynft.deployed();
 });

 it("Should redeem an NFT from a signed voucher", async function () {
  const { contract, redeemer, minter } = await deploy();

  const lazyMinter = new LazyMinter({ contract, signer: minter });
  // console.log(lazyMinter);
  const voucher = await lazyMinter.createVoucher(
   1,
   "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
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
 });
});
