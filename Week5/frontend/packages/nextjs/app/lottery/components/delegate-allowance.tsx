/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { hexToBigInt, parseEther, toHex, hexToString } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import { abi as tokenAbi } from "../../../../../../lottery-contract/artifacts/contracts/LotteryToken.sol/LotteryToken.json"
import { abi as lotteryAbi } from "../../../../../../lottery-contract/artifacts/contracts/Lottery.sol/Lottery.json"

const MAXUINT256 =
    115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export function DelegateAllowance({ address, blockExplorer }: { address: string, blockExplorer: string }) {
    const { writeContractAsync } = useWriteContract();
    const [result, setResult] = useState<string | null>(null)
    const [tokenAddress, setTokenAddress] = useState<string | null>(null);
    const client = usePublicClient();

    useEffect(
        () => {
            client?.readContract({
                abi: lotteryAbi,
                address: address,
                functionName: "paymentToken",
            }).then((addr) => setTokenAddress(addr as string)).catch((e: Error) => {
                console.log("ERROR occured : ", e.message)
                setResult(`When getting the token address: ${e.message}`)
            })

        }, [address]
    )



    const handleApprove = async () => {
        if (tokenAddress) {
            console.log(`Approve allowance of any amount of tokens`);
            const tx = await writeContractAsync({
                abi: tokenAbi,
                address: tokenAddress,
                functionName: 'approve',
                args: [address, MAXUINT256],
            }).catch((e: Error) => {
                console.log("ERROR occured : ", e.message)
                setResult(e.message)
            })
            if (tx) {
                setResult(tx)
            }
            console.log(`tx hash: ${tx}`)

        }
    }

    return (
        <div className="card w-full  bg-primary text-primary-content mt-4 p-4 ">
            <div className="card-body">
                <h2 className="card-title">{"Delegate allowance (approve)"}</h2>
            </div>
            {!result && <button
                className="btn btn-active btn-neutral"
                disabled={false}
                onClick={handleApprove}
            >
                Delegate allowance
            </button>}
            {result && <label className="label flex flex-col">
                <span className="label-text">Transaction Hash: {result} </span>
                <a target="_blank" href={blockExplorer + result} className="label-text hover:scale-125 bg-slate-500 rounded-3xl p-2"> Check it on explorer!  </a>
            </label>}
        </div>
    );
}