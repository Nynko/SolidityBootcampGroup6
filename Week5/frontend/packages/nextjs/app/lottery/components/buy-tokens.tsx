/* eslint-disable prettier/prettier */
import { useState } from "react";
import { hexToBigInt, parseEther, toHex, hexToString } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import { abi } from "../../../../../../lottery-contract/artifacts/contracts/Lottery.sol/Lottery.json"



export function BuyTokens({ address, blockExplorer }: { address: string, blockExplorer: string }) {
    const [amount, setAmount] = useState("");
    const { writeContractAsync } = useWriteContract();
    const [result, setResult] = useState<string | null>(null)

    const handleBuyTokens = async () => {
        if (address && amount) {
            try {
                console.log(`Buying tokens for: ${amount} ETH`);
                const tx = await writeContractAsync({
                    abi,
                    address: address,
                    functionName: 'purchaseTokens',
                    args: [],
                    value: parseEther(amount),
                }).catch((e: Error) => { throw e })
                setResult(tx)
                console.log(`tx hash: ${tx}`)
            } catch (error) {
                if (error instanceof Error) {
                    console.log("ERROR occured : ", error.message)
                    setResult(error.message)
                }
            }
        }
    }

    return (
        <div className="card w-full  bg-primary text-primary-content mt-4 p-4 ">
            <div className="card-body">
                <h2 className="card-title">Buy Tokens</h2>
                <>
                    <label className="label">
                        <span className="label-text">Enter the amount to buy</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter the amount to buy"
                        className="input input-bordered w-full max-w-xs"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </>
            </div>
            {!result && <button
                className="btn btn-active btn-neutral"
                disabled={false}
                onClick={handleBuyTokens}
            >
                Buy Tokens !
            </button>}
            {result && <label className="label flex flex-col">
                <span className="label-text">Transaction Hash: {result} </span>
                <a target="_blank" href={blockExplorer + result} className="label-text hover:scale-125 bg-slate-500 rounded-3xl p-2"> Check it on explorer!  </a>
            </label>}
        </div>
    );
}