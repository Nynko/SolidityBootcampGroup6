import { throws } from "assert";
import { useEffect, useState } from "react";
import { hexToBigInt, parseEther, toHex, hexToString } from "viem";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { abi } from "../abi/TokenizedBallot.json"

export function CastVote() {
    const [proposals, setProposals] = useState<string[]>([])
    const [address, setAdress] = useState("")
    const [amount, setAmount] = useState("");
    const [indexProposal, setIndexProposal] = useState<number | null>(null);
    const { writeContractAsync } = useWriteContract();
    const [result, setResult] = useState<string | null>(null)
    const client = usePublicClient();


    const handleGetProposals = async () => {
        client?.getStorageAt({ address: address, slot: toHex(1) })
            .then(
                async (size) => {
                    if (size) {
                        const lenght = hexToBigInt(size)
                        const _proposals = []
                        for (let i = BigInt(0); i < lenght; i++) {
                            const [proposal] = await client.readContract({
                                abi: abi,
                                address: address,
                                functionName: 'proposals',
                                args: [i]
                            }
                            ) as [`0x${string}`, bigint];
                            _proposals.push(hexToString(proposal, { size: 32 }));
                        }
                        setProposals(_proposals);
                    }
                }
            )
    }

    const handleProposalClick = (index: any) => {
        console.log('Clicked proposal index:', index);
        setIndexProposal(index)
        // You can perform any action needed with the index here
    };

    const handleCastVote = async () => {
        if (indexProposal && amount) {
            try {
                const tx = await writeContractAsync({
                    abi,
                    address: address,
                    functionName: 'vote',
                    args: [
                        BigInt(indexProposal),
                        parseEther(amount)
                    ],
                }).catch((e: Error) => { throw e })
                setResult(`tx hash: ${tx}`)
            } catch (error) {
                setResult(error.message)
            }
        }
    }

    return (
        <div className="card w-96 bg-primary text-primary-content mt-4">
            <div className="card-body">
                <h2 className="card-title">Cast a vote</h2>
                {proposals && (<>
                    <label className="label">
                        <span className="label-text">Enter contract address:</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Contract Address"
                        className="input input-bordered w-full max-w-xs"
                        value={address}
                        onChange={e => setAdress(e.target.value)}
                        onKeyUp={(e) => { if (e.key == "Enter") { handleGetProposals() } }}
                    />
                </>)}
                {!result ? (
                    <>
                        <label className="label">
                            <span className="label-text">Enter the amount to vote for:</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter the amount to vote"
                            className="input input-bordered w-full max-w-xs"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                        <label className="label">
                            <span className="label-text">Click on the proposal:</span>
                        </label>
                        {(
                            <ul>
                                {proposals.map((proposal, index) => (
                                    <li key={index} onClick={() => handleProposalClick(index)}>
                                        {proposal}
                                        {indexProposal === index && "-- Selected!"}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>) : (
                    <>
                        <label className="label">
                            <span className="label-text">{result}</span>
                        </label>
                    </>
                )
                }
            </div>
            {!result && <button
                className="btn btn-active btn-neutral"
                disabled={false}
                onClick={handleCastVote}
            >
                Cast Vote !
            </button>}
        </div>
    );
}