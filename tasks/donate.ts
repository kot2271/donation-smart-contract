import {task} from "hardhat/config";
import {TaskArguments} from "hardhat/types";

task("donate", "Donate Ethereum to contract")
    .addParam("amount", "Amount value")
    .setAction(async (args: TaskArguments, hre) => {
        const [account] = await hre.ethers.getSigners();
        const contractAddress = <string>process.env.TASK_CONTRACT_ADDRESS;
        const instance = await hre.ethers.getContractAt("Philanthropist", contractAddress);
        await account.sendTransaction({
            to: instance.address,
            value: hre.ethers.utils.parseEther(args.amount),
        });
        console.log(`Donate ${args.amount} ETH`);
    });

module.exports = {};