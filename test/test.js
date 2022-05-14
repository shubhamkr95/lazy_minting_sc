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
