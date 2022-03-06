pragma solidity ^0.8.0;

contract ContractOwner {
    address public owner;

    event OwnershipTransferred(address indexed previousContractOwner, address indexed newContractOwner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Sorry! You are not the contract owner!");
        _;
    }

    function transferOwnership(address newContractOwner) public onlyOwner {
        require(newContractOwner != address(0), "Error: You are not the contract owner.");
        emit OwnershipTransferred(owner, newContractOwner);
        owner = newContractOwner;
    }
}