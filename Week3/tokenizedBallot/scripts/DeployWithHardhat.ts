import { viem } from "hardhat";
import { toHex, hexToString, formatEther } from "viem";
import { load_account_from_env } from "../utils/load_env";


async function main() {
    const [deployer] = load_account_from_env();

  const publicClient = await viem.getPublicClient();
  const blockNumber = await publicClient.getBlockNumber();
  console.log("Last block number:", blockNumber);
   console.log("Deployer address:", deployer.address);
  const balance = await publicClient.getBalance({
    address: deployer.address,
  });
  console.log(
    "Deployer balance:",
    formatEther(balance),
    "ETH"
   );
 
  console.log("\nDeploying TOKEN contract");
  const tokenContract = await viem.deployContract("MyToken", [
     "MyToken",
     "MTK",
     "MyToken",
  ]);

  console.log("Token contract deployed to:", tokenContract.address);
  // console.log("Proposals: ");
  // for (let index = 0; index < PROPOSALS.length; index++) {
  //   const proposal = await ballotContract.read.proposals([BigInt(index)]);
  //   const name = hexToString(proposal[0], { size: 32 });
  //   console.log({ index, name, proposal });
  // }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
