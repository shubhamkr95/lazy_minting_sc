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
});
