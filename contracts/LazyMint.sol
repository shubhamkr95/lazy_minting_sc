//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract LazyNFT is ERC721URIStorage, EIP712, AccessControl {
 bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
 string private constant SIGNING_DOMAIN = "LazyNFT-Voucher";
 string private constant SIGNATURE_VERSION = "1";

 mapping(address => uint256) public pendingWithdrawals;

 address private signer;

 constructor()
  ERC721("LazyMINT", "LAZY")
  EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION)
 {}

 function setMinter(address _signer) internal {
  signer = _signer;
  _setupRole(MINTER_ROLE, signer);
 }

 function getMinter() public view returns (address) {
  return signer;
 }

 /// @notice Redeems an Voucher for an actual NFT, creating it in the process.
 /// @param redeemer The address of the account which will receive the NFT upon success.
 function redeem(
  address redeemer,
  uint256 tokenId,
  uint256 minPrice,
  string memory uri,
  bytes memory signature
 ) public payable returns (uint256) {
  // make sure signature is valid and get the address of the signer
  signer = _verify(tokenId, minPrice, uri, signature);

  // set the minter address in _setupRole
  setMinter(signer);

  // make sure that the signer is authorized to mint NFTs
  require(hasRole(MINTER_ROLE, signer), "Signature invalid or unauthorized");

  // make sure that the redeemer is paying enough to cover the buyer's cost
  require(msg.value >= minPrice, "Insufficient funds to redeem");

  // first assign the token to the signer, to establish provenance on-chain
  _mint(signer, tokenId);
  _setTokenURI(tokenId, uri);

  _transfer(signer, redeemer, tokenId);

  // record payment to signer's withdrawal balance
  pendingWithdrawals[signer] += msg.value;

  return tokenId;
 }
}
