import { expect } from "chai";
import { ethers } from "hardhat";

describe("Philanthropist", function () {
    it("Refill of the balance", async function () {
        const Philanthropist = await ethers.getContractFactory("Philanthropist");
        const philanthropist = await Philanthropist.deploy();
        await philanthropist.deployed();
        const [accountOne, accountTwo] = await ethers.getSigners();

        expect(await philanthropist.getBalance()).to.equal(0);

        await accountOne.sendTransaction({
            to: philanthropist.address,
            value: ethers.utils.parseEther("1"),
        });

        await accountTwo.sendTransaction({
            to: philanthropist.address,
            value: ethers.utils.parseEther("4"),
        });

        expect(
            parseFloat(ethers.utils.formatEther(await philanthropist.getBalance()))
        ).to.equal(5);
        expect(
            parseFloat(
                ethers.utils.formatEther(
                    await philanthropist.connect(accountOne).getMyBalance()
                )
            )
        ).to.equal(1);
        expect(
            parseFloat(
                ethers.utils.formatEther(
                    await philanthropist.connect(accountTwo).getMyBalance()
                )
            )
        ).to.equal(4);
    });

    it("Withdrawal of ETH from the contract", async function () {
        const Philanthropist = await ethers.getContractFactory("Philanthropist");
        const philanthropist = await Philanthropist.deploy();
        await philanthropist.deployed();
        const [accountOne, accountTwo, accountThree] = await ethers.getSigners();

        await accountOne.sendTransaction({
            to: philanthropist.address,
            value: ethers.utils.parseEther("1"),
        });
        await accountTwo.sendTransaction({
            to: philanthropist.address,
            value: ethers.utils.parseEther("4"),
        });

        await expect(
            philanthropist.connect(accountTwo).withdraw(await accountThree.getAddress())
        ).to.be.revertedWith("Error: You are not the contract owner.");

        await philanthropist.withdraw(await accountThree.getAddress());
        expect(
            parseFloat(ethers.utils.formatEther(await philanthropist.getBalance()))
        ).to.equal(0);
        expect(
            parseFloat(ethers.utils.formatEther(await accountThree.getBalance()))
        ).to.equal(10005);
    });

    it("List of users", async function () {
        const {deploy} = await ethers.getContractFactory("Philanthropist");
        const philanthropist = await deploy();
        await philanthropist.deployed();
        const [accountOne, accountTwo, accountThree] = await ethers.getSigners();

        await accountOne.sendTransaction({
            to: philanthropist.address,
            value: ethers.utils.parseEther("1"),
        });
        await accountTwo.sendTransaction({
            to: philanthropist.address,
            value: ethers.utils.parseEther("4"),
        });
        await accountTwo.sendTransaction({
            to: philanthropist.address,
            value: ethers.utils.parseEther("4"),
        });
        await accountThree.sendTransaction({
            to: philanthropist.address,
            value: ethers.utils.parseEther("10"),
        });

        expect(await philanthropist.getUsers()).to.deep.equal([
            await accountOne.getAddress(),
            await accountTwo.getAddress(),
            await accountThree.getAddress(),
        ]);
    });
});

