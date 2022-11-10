# Lazy Minting

## Working

Lazy Minting is a process in which a user can auction his nft without proving any gas fees upfront. In this app the user create a signed voucher with details required to mint the nft. Anyone who wants to buy the nft with provide the gas fees as well the nft price. After that the nft is mint on the signer address to establish the provenance on-chain. After that the NFT is transfer to the buyer address and which complete the lazy mint process, the owner can then claim the amount paid by the buyer by calling the withdraw function.

## Environment

```
API_KEY=
PRIVATE_KEY=
DB_LOCAL=mongodb url
```

## Testing

```
git clone https://github.com/shubhamkr95/lazy_minting_sc.git

cd lazy_minting_sc

npm install

npx hardhat test

npx hardhat coverage

```

## Code snippet

```
const domain = await this._signingDomain();
  const types = {
   NFTVoucher: [
    { name: "tokenId", type: "uint256" },
    { name: "minPrice", type: "uint256" },
    { name: "uri", type: "string" },
   ],
  };
  const signature = await this.signer._signTypedData(domain, types, voucher);
  return {
   ...voucher,
   signature,
  };
```

## Code style

```
npm run prettier:solidity
```
