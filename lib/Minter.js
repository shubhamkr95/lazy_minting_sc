// These constants must match the ones used in the smart contract.
const SIGNING_DOMAIN_NAME = "LazyNFT-Voucher";
const SIGNING_DOMAIN_VERSION = "1";

class LazyMinter {
 constructor({ contract, signer }) {
  this.contract = contract;
  this.signer = signer;
 }

 async createVoucher(tokenId, uri, minPrice = 0) {
  // const minPriced = JSONbig.parse(minPrice);

  const voucher = { tokenId, uri, minPrice };
  const domain = await this._signingDomain();
  const types = {
   NFTVoucher: [
    { name: "tokenId", type: "uint256" },
    { name: "minPrice", type: "uint256" },
    { name: "uri", type: "string" },
   ],
  };
 }
}
