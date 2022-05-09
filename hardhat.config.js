require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("solidity-coverage");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const ALCHEMY_API_KEY = process.env.API_KEY;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;

module.exports = {
 solidity: "0.8.0",
 networks: {
  rinkeby: {
   url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
   accounts: [`${RINKEBY_PRIVATE_KEY}`],
  },
 },
 plugins: ["solidity-coverage"],
};
