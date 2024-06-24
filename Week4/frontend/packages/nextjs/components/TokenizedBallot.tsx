import { CastVote } from "./CastVote";
import { Delegate } from "./Delegate";
 import { Query } from "./Query";

export function TokenizedBallot() {



    return (
      <div className="card flex  w-[80%] p-4   text-primary-content mt-4 gap-4 justify-center items-center">
        <CastVote/>
        <Delegate/> 
        <Query/>
      </div>
    );
  }