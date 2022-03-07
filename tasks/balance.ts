import {task} from "hardhat/config";
import {TaskArguments} from "hardhat/types";

task("balance", "Check contract balance").setAction(
    async (args: TaskArguments, hre) => {
        const [account] = await hre.ethers.getSigners();
        const contractAddress = <string>process.env.TASK_CONTRACT_ADDRESS;
        const instance = await hre.ethers.getContractAt("Philanthropist", contractAddress);
        const balance = parseFloat(
            hre.ethers.utils.formatEther(
                await instance.connect(account.address).getBalance()
            )
        );
        console.log("Balance: ", balance);
    }
);

module.exports = {};