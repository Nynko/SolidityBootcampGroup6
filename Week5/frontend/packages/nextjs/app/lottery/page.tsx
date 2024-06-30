"use client"

import type { NextPage } from "next";
import { LoadContractAddress } from "./components/load-contract";
import { BuyTokens } from "./components/buy-tokens";
import { useState } from "react";
import { DelegateAllowance } from "./components/delegate-allowance";
import { RedeemTokens } from "./components/redeem-tokens";

const Lottery: NextPage = () => {
    const [address, setAdress] = useState("");
    const debugMode = process.env.NEXT_PUBLIC_DEBUG;
    let blockExplorer;
    if (debugMode) blockExplorer = "http://localhost:3000/blockexplorer/transaction/"
    else blockExplorer = "https://sepolia.etherscan.io/tx/"

    return (
        <>
            <div className="text-center mt-8 bg-secondary p-10">
                <h1 className="text-4xl my-0">Lottery !</h1>
                <p className="text-neutral">
                    Lottery
                    <br /> Check{" "}
                    <LoadContractAddress setAddress={setAdress} address={address} />
                    {address && (<>
                        <BuyTokens address={address} blockExplorer={blockExplorer} />
                        <DelegateAllowance address={address} blockExplorer={blockExplorer} />
                        <RedeemTokens address={address} blockExplorer={blockExplorer} />
                    </>)}
                </p>
            </div>
        </>
    );
};

export default Lottery;
