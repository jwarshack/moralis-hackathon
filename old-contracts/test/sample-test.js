const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sonics", function () {
  it("issue and redeem", async function () {
    const Token = await ethers.getContractFactory("Sonics");
    const token = await Token.deploy();
    await token.deployed();

    const [_, buyer1, buyer2, buyer3] = await ethers.getSigners()

    await token.connect(buyer1).issue(0, 4, { value: ethers.utils.parseEther("0.4")})
    await token.connect(buyer2).issue(0, 2, { value: ethers.utils.parseEther("0.2")})
    await token.connect(buyer3).issue(0, 4, { value: ethers.utils.parseEther("0.4")})

    const mintTracker = await token.mintTracker(0)
    console.log(mintTracker.toString())

    // await token.connect(buyer1).setApprovalForAll(token.address, true);

    await token.connect(buyer1).redeem(0, 4)
    await token.connect(buyer2).redeem(0,1)

    let contractBal = await token.balanceOf(token.address, 0)
    console.log(contractBal.toString())
    const redeemers = await token.redeemers(0, 0)
    await token.connect(buyer2).redeem(0,1)
    await token.connect(buyer3).redeem(0,4)


    contractBal = await token.balanceOf(token.address, 0)
    console.log(contractBal.toString())


 




  });
});
