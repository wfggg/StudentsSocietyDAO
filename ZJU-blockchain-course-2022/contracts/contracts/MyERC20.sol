// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {

    mapping(address => bool) claimedAirdropStudentList;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {

    }

    function airdrop() external {
        require(claimedAirdropStudentList[msg.sender] == false, "This student has claimed airdrop already");
        _mint(msg.sender, 10000);
        claimedAirdropStudentList[msg.sender] = true;
    }

}
