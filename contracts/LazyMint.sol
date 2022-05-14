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
}