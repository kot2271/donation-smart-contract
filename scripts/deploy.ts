import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const Philanthropist = await ethers.getContractFactory("Philanthropist");
    const philanthropist = await Philanthropist.deploy();
    await philanthropist.deployed();
    console.log("Philanthropist deployed to:", philanthropist.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});