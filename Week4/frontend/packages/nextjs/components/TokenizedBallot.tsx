import { CastVote } from "./CastVote";
import { Delegate } from "./Delegate";
import { CONST_SEPOLIA_TOKEN_ADDRESS } from "~~/utils/getChain";

export function TokenizedBallot() {



    return (
      <div className="card w-96 bg-primary text-primary-content mt-4 gap-4 justify-center items-center">
        <CastVote/>
        <Delegate/> 
      </div>
    );
  }