import {
    createPublicClient,
    http,
    createWalletClient,
    formatEther,
  } from "viem";
  import { sepolia } from "viem/chains";
  import { privateKeyToAccount } from "viem/accounts";
  import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
  require("dotenv").config();
  
  const contractAddress = "0x878357c449a6aa94a6b3956f58b430d9ed84ebeb";
  const providerApiWithKey = process.env.INFURA_API|| "";
  const deployerPrivateKey = process.env.SEPOLIA_PRIVATE_KEY || "";

  async function main() {
    const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");
  const contractAddress = parameters[0] as `0x${string}`;
  
  if (!contractAddress) throw new Error("Contract address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");
  const voterAddress = parameters[1] as `0x${string}`;
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`${providerApiWithKey}`),
  });
  const blockNumber = await publicClient.getBlockNumber();
  console.log("Last block number:", blockNumber);

  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`${providerApiWithKey}`),
  });
  console.log("Deployer address:", walletClient.account.address);
  const balance = await publicClient.getBalance({
    address: walletClient.account.address,
  });
  console.log(
    "Deployer balance:",
    formatEther(balance),
    walletClient.chain.nativeCurrency.symbol
  );

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "giveRightToVote",
    account: account,
    args: [voterAddress],
  });
  console.log("Transaction hash:", hash);
  console.log("Waiting for confirmations...");
    const reciept = await publicClient.waitForTransactionReceipt({ hash });
    console.log("Transaction Confirmed");

  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });