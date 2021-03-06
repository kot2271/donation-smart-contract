import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "@typechain/hardhat";
import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from "hardhat/config";
import "solidity-coverage";
import "@babel/register";
import "./tasks/donate.ts";
import "./tasks/balance.ts";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: HardhatUserConfig = {
    solidity: "0.8.4",
    networks: {
        rinkeby: {
            url: process.env.RINKEBY_URL || "",
            accounts:
                process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

export default config;