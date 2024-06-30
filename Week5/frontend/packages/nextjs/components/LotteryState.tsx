import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import { abi as lotteryAbi } from "~~/abi/Lottery.json";

interface LotteryContractData {
  betsOpen: boolean;
  betsClosingTime: number;
  prizePool: number;
  ownerPool: number;
}

export function LotteryState() {
  const [error, setError] = useState<string | null>(null);
  const [contractData, setContractData] = useState<LotteryContractData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const client = usePublicClient();
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

  useEffect(() => {
    const fetchContractData = async () => {
      setIsLoading(true); 
      try {
        console.log("here")
        const [betsOpenResult, betsClosingTimeResult, prizePoolResult, ownerPoolResult] = await Promise.all([
          client?.readContract({
            abi: lotteryAbi,
            address: address,
            functionName: "betsOpen",
          }),
          client?.readContract({
            abi: lotteryAbi,
            address: address,
            functionName: "betsClosingTime",
          }),
          client?.readContract({
            abi: lotteryAbi,
            address: address,
          functionName: "prizePool",
        }),
          client?.readContract({
            abi: lotteryAbi,
            address: address,
            functionName: "ownerPool",
          }),
        ]);
        console.log("here too");

        setContractData({
            betsOpen: typeof betsOpenResult === 'boolean' ? betsOpenResult : false,
            betsClosingTime: typeof betsClosingTimeResult === 'number' ? betsClosingTimeResult : 0, 
            prizePool: typeof prizePoolResult === 'number' ? prizePoolResult : 0,
            ownerPool: typeof ownerPoolResult === 'number' ? ownerPoolResult : 0,
          });
      } catch (error) {
        setError("Error fetching contract data");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchContractData();
  }, [client, address]); 

  return (
    <div>
      {isLoading ? (
        <p>Loading lottery data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : contractData ? (
        <div>
          <p>Bets Open: {contractData.betsOpen.toString()}</p>
          <p>Bets Closing Time: {contractData.betsClosingTime.toString()}</p>
          <p>Prize Pool: {contractData.prizePool.toString()}</p>
          <p>Owner Pool: {contractData.ownerPool.toString()}</p>
        </div>
      ) : (
        <p>No data available yet.</p>
      )}
    </div>
  );
}