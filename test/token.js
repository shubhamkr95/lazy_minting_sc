const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
 let Token;
 let owner;
 let addr1;
 let addr2;

 beforeEach(async () => {
  // get contract factory and signers here
  [addr1] = await ethers.getSigners();

  Token = await ethers.getContractFactory("MyToken");
  token = await Token.deploy();
  await token.deployed();
 });

 describe("Deployment ERC20 token", function () {
  // assign total supply to the owner
  it("Should assign total supply to the owner address", async function () {
   const mintTx = await token.mint(addr1.address, 40);
   console.log(mintTx.hash);
   expect(await token.balanceOf(addr1.address)).to.equal(40);
  });
 });
});
