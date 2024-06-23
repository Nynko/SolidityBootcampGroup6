import { throws } from "assert";
import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";

export function CastVote() {

    const [amount, setAmount] = useState("");
    const [proposals, setProposals] = useState(['Proposal 1', 'Proposal 2', 'Proposal 3']);
    const [indexProposal, setIndexProposal] = useState<number | null>(null);
    const { writeContractAsync } = useWriteContract();
    const [result, setResult] = useState<string | null>(null)

    const handleProposalClick = (index: any) => {
        console.log('Clicked proposal index:', index);
        setIndexProposal(index)
        // You can perform any action needed with the index here
    };

    const handleCastVote = async () => {
        if (indexProposal && amount) {
            try {
                const tx = await writeContractAsync({
                    abi: [{
                        inputs: [
                            {
                                internalType: "uint256",
                                name: "proposal",
                                type: "uint256"
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256"
                            }
                        ],
                        name: "vote",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function"
                    }
                    ],
                    address: '0x23038b8beb34163530712918b123cf7d21442c94',
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
            <button
                className="btn btn-active btn-neutral"
                disabled={false}
                onClick={handleCastVote}
            >
                Cast Vote !
            </button>
        </div>
    );
}