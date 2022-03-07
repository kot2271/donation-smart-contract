//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ContractOwner {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Sorry! You are not the contract owner!");
        _;
    }

}