
const hre = require("hardhat");
const fs = require('fs')

async function main() {

  const Sonics = await hre.ethers.getContractFactory("Sonics");
  const sonic = await Sonics.deploy();

  await sonic.deployed();

  console.log("Greeter deployed to:", sonic.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
