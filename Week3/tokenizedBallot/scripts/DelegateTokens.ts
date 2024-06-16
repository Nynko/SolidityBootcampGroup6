import { viem } from "hardhat";
import { Account } from "viem";
import { load_account_from_env } from "../utils/load_env";

export async function delegateTokens(
  contract: `0x${string}`,
  addressTo: `0x${string}`,
  account: Account
) {
  const tokenContract = await viem.getContractAt("MyToken", contract);
  tokenContract.write.delegate([addressTo], { account });
}

async function main() {
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");
  const contractAddress = parameters[0] as `0x${string}`;
  if (!contractAddress) throw new Error("Contract address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");
  const delegateAddress = parameters[1] as `0x${string}`;
  const [account] = load_account_from_env();

  delegateTokens(contractAddress, delegateAddress, account);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
