/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { abi as lotteryAbi } from "../../../abi/Lottery.json";
import { formatEther, hexToBigInt, hexToString, parseEther, toHex } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import { parse } from "path";

export function OpenBets({ address }: { address: string,  }) {
   const [error, setError] = useState<String | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);   
  const { writeContractAsync } = useWriteContract();

  const client = usePublicClient();
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [amount, setAmount] = useState<string>("");
const transformDateToTimestamp = () => {
    const timestamp = selectedDate ? Math.floor(selectedDate.getTime() / 1000) : 0;     
      console.log(timestamp);

  return BigInt(timestamp);
};

 useEffect(() => {  
    const checkOwner = async () => {
      console.log(`Checking if owner`);
      const owner = await client
        ?.readContract({
          abi: lotteryAbi,
          address: address,
          functionName: "owner",
          args: [],
        })
        .catch((e: Error) => {
          console.log("ERROR occured getting the owner : ", e.message);
          setError(e.message);
        }) as string;
      console.log("THE OWNER IS : ", owner);
      setIsOwner(owner === client?.account);
      setError(null);
    };
    checkOwner();
  }
    , [client, address]);


  const openBets = async () => {
    console.log(`open the bets`);
    const tx = await writeContractAsync({
      abi: lotteryAbi,
      address: address,
      functionName: 'openBets',
      args: [transformDateToTimestamp()],
      })
      .catch((e: Error) => {
        console.log("ERROR occured : ", e.message);
        setError(e.message);
      })
      console.log(`tx hash: ${tx}`);  
     setError(null)
     
   };
   const withdrawFees = async () => {
    console.log(`withdraw the fees`);
    const tx = await writeContractAsync({
      abi: lotteryAbi,
      address: address,
      functionName: 'ownerWithdraw',
      args: [parseEther(amount)],
      })
      .catch((e: Error) => {
        console.log("ERROR occured : ", e.message);
        setError(e.message);
      })
      console.log(`tx hash: ${tx}`);  
     setError(null)
     
   };
  


  return (
    !isOwner ? <div className="card w-full  bg-primary text-primary-content mt-4 p-4 ">
      <div className="card-body"> 
        <h2 className="card-title">{"Open Bets"}</h2>
      </div>
      <div>
            <label className="label">
                Select a date:
                <input
                    type="date"
                    value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
            </label>
        </div>
    
        <button className="btn btn-active btn-neutral"  onClick={openBets}>
          Open Bets
        </button>
        <h2 className="card-title">Withdraw Tokens</h2>
               
                    <label className="label">
                        <span className="label-text">Enter the amount to withdraw</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter the amount to buy"
                        className="input input-bordered w-full max-w-xs"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                        <button className="btn btn-active btn-neutral"  onClick={withdrawFees}>
          Withdraw
        </button>
      {
        error && (
          <label className="label flex flex-col">
            <span className="label-text">Error: {error}</span>
          </label>
        )
      }
    </div> : <> </>
  );
}
