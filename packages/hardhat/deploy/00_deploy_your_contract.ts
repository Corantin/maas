// deploy/00_deploy_your_contract.js

import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-web3";

const { ethers } = require("hardhat");

const localChainId = "31337";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const verificationContractName = "contracts/mocks_HoneyTest.sol:HoneyTestToken";

export default async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();
  const chainId = await hre.getChainId();

  console.log("chainId: ", chainId);

  let multiSigFactoryContract: Contract;

  if (hre.network.zksync) {
    //   console.log("Deploying HoneyTest on zkSync...", { deployer });
    const wallet = new Wallet(process.env.PRIVATE_KEY!);
    console.log("Wallet initialized");
    const zkDeployer = new Deployer(hre, wallet);
    console.log("Deployer initialized");

    const tokenArtifact = await zkDeployer.loadArtifact(contractName);
    console.log("TokenArtifact loaded");
  } else {
    const factoryDeployResult = await deploy("MultiSigFactory", {
      from: deployer,
      log: true,
    });
    multiSigFactoryContract = new Contract(
      factoryDeployResult.address,
      factoryDeployResult.abi
    );
  }

  // const MultiSigWalletDeployed = await deploy("MultiSigWallet", {
  //   from: deployer,
  //   args: [
  //     // chainId,
  //     // ["0x813f45BD0B48a334A3cc06bCEf1c44AAd907b8c1"],
  //     // 1,
  //     "default_name",
  //     MultiSigFactoryDeployed.address,
  //   ],
  //   log: true,
  // });

  // console.log(
  //   "MultiSig wallet deployed at => ",
  //   MultiSigWalletDeployed.address
  // );

  console.log(
    "MultiSig factory deployed at =>",
    multiSigFactoryContract.address
  );

  // Getting a previously deployed contract
  // const multiSigFactory = await ethers.getContract("MultiSigFactory", deployer);
  /*  await YourContract.setPurpose("Hello");
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       contractArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["MultiSigFactory", "MultiSigWallet"];
