/* eslint-disable prettier/prettier */
import { Dispatch, SetStateAction, useState } from "react";


export function LoadContractAddress({ address, setAddress }: { address: string, setAddress: Dispatch<SetStateAction<string>> }) {
    const [error, setError] = useState<string | null>(null)
    const [localAddress, setLocalAddress] = useState<string>("")

    const checkSetAddress = (address: string) => {
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            setError("Invalid contract address");
        }
        else {
            setAddress(address);
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