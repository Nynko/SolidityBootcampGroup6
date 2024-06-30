/* eslint-disable prettier/prettier */
import { Dispatch, SetStateAction, useState } from "react";
import { usePublicClient } from "wagmi";
import { abi as lotteryAbi } from "../../../../../../lottery-contract/artifacts/contracts/Lottery.sol/Lottery.json"


export function LoadContractAddress({ address, setAddress, setTokenAddress }: { address: string, setAddress: Dispatch<SetStateAction<string>>, setTokenAddress: Dispatch<SetStateAction<string | null>> }) {
    const [error, setError] = useState<string | null>(null)
    const [localAddress, setLocalAddress] = useState<string>("")
    const client = usePublicClient();

    const checkSetAddress = (address: string) => {
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            setError("Invalid contract address");
        }
        else {
            setAddress(address);
            client?.readContract({
                abi: lotteryAbi,
                address: address,
                functionName: "paymentToken",
            }).then((addr) => setTokenAddress(addr as string)).catch((e: Error) => {
                console.log("ERROR occured : ", e.message)
                throw e;
            })
        }

    }

    return (
        <div className="card w-full  bg-primary text-primary-content mt-4 p-4 ">
            <div className="card-body">
                <h2 className="card-title">Load Lottery Contract</h2>
                {address ? (
                    <>
                        <label className="label">
                            <span className="label-text">Contract loaded at: {address}</span>
                        </label>
                    </>

                ) : (

                    <>
                        <label className="label">
                            <span className="label-text">Enter contract address:</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Contract Address"
                            className="input input-bordered w-full "
                            value={localAddress}
                            onChange={e => setLocalAddress(e.target.value)}
                        />
                        <button
                            className="btn w-[40%] items-center justify-center btn-active btn-neutral"
                            onClick={() => checkSetAddress(localAddress)}>
                            Load the contrat
                        </button>
                        {error && <p className="text-color red">{error}</p>}

                    </>)
                }
            </div >
        </div >
    );
}