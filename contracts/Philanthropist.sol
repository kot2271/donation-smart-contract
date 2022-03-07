//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./ContractOwner.sol";

contract Philanthropist is ContractOwner {
    mapping(address => uint256) public donationsAmount;
    address[] public users;

    event Received(address, uint256);

    fallback() external payable {
    }

    receive() external payable {
        require(msg.value > 0, "ERROR: Incorrect donation value.");
        if (donationsAmount[msg.sender] == 0) {
            users.push(msg.sender);
        }
        donationsAmount[msg.sender] += msg.value;
        emit Received(msg.sender, msg.value);
    }

    function getUsers() public view returns (address[] memory) {
        return users;
    }

    function getMyBalance() public view returns (uint256) {
        return donationsAmount[msg.sender];
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(address payable _to) public payable onlyOwner {
        bool sent = _to.send(address(this).balance);
        require(sent, "Error: Unsuccessful sending of Ether !");
    }
}