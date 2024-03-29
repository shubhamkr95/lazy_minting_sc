// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
 constructor() ERC20("MyToken", "MTK") {}

 function mint(address to, uint256 amount) public {
  _mint(to, amount);
 }
}
