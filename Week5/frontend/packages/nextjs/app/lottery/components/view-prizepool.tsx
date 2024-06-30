/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { abi as lotteryAbi } from "../../../abi/Lottery.json";
import { formatEther, hexToBigInt, hexToString, parseEther, toHex } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";

export function ViewPrizePool({ address }: { address: string }) {
  const [prizePool, setPrizePool] = useState<string | null>(null);
  const client = usePublicClient();

  const handlePrizepool = async () => {
    console.log(`View total prize pool`);
    const tx = await client
      ?.readContract({
        abi: lotteryAbi,
        address: address,
        functionName: "prizePool",
        args: [],
      })
      .catch((e: Error) => {
        console.log("ERROR occured : ", e.message);
        setPrizePool(e.message);
      });

    setPrizePool(`${tx}`);
    console.log(tx);
  };

  return (
    <div className="card w-full  bg-primary text-primary-content mt-4 p-4 ">
      <div className="card-body">
        <h2 className="card-title">{"View Prizepool"}</h2>
      </div>
      {!prizePool && (
        <button className="btn btn-active btn-neutral" disabled={false} onClick={handlePrizepool}>
          Get prize pool
        </button>
      )}
      {prizePool && (
        <label className="label flex flex-col">
          <span className="label-text">Total Prize pool: {prizePool} Tokens</span>
        </label>
      )}
    </div>
  );
}
