import {
    createPublicClient,
    http,
    hexToString
} from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { load_account_from_env, load_api_sepolia } from "../utils/load_env";

const { url: apiUrl } = load_api_sepolia();
const [deployerAccount] = load_account_from_env();

async function main() {
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 1)
        throw new Error("Contract address not provided");

    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
        throw new Error("Invalid contract address");

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(apiUrl),
    });

    const voteCount = await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "winningProposal",
    });

    const winnerName = await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "winnerName",
    });

    console.log(`Name: ${winnerName} Vote Count: ${voteCount}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
