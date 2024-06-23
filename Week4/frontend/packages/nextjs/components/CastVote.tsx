import { useState } from "react";
import { useWriteContract } from "wagmi";

export function CastVote() {

    const [amount, setAmount] = useState("");
    const [proposals, setProposals] = useState(['Proposal 1', 'Proposal 2', 'Proposal 3']);
    const [indexProposal, setIndexProposal] = useState<number|null>(null);
    const { writeContract } = useWriteContract();
  
    const handleProposalClick = (index :any) => {
      console.log('Clicked proposal index:', index);
      setIndexProposal(index)
      // You can perform any action needed with the index here
    };

    return (
      <div className="card w-96 bg-primary text-primary-content mt-4">
        <div className="card-body">
          <h2 className="card-title">Cast a vote</h2>
          <label className="label">
            <span className="label-text">Enter the amount to vote for:</span>
          </label>
          <input
            type="number"
            placeholder="Enter the amount to vote"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        <label className="label">
            <span className="label-text">Click on the proposal:</span>
          </label>
            {(
                <ul>
                {proposals.map((proposal, index) => ( 
                    <li key={index} onClick={() => handleProposalClick(index)}>
                    {proposal}
                    {indexProposal === index && "-- Selected!"}
                    </li> 
                ))}
                </ul>
            )}
        </div>
        <button
          className="btn btn-active btn-neutral"
          disabled={false}
          onClick={() => {

            if (indexProposal){
            writeContract({ 
                abi: [{
                    inputs: [
                      {
                        internalType: "uint256",
                        name: "proposal",
                        type: "uint256"
                      },
                      {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256"
                      }
                    ],
                    name: "vote",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function"
                  }
                ],
                address: '0x72F186E758Dd0e9F983CA16a51307E750DBc4eD8',
                functionName: 'vote',
                args: [
                  BigInt(indexProposal),
                  BigInt(amount)
                ],
             })
            }
        }
            // signMessage({
            //   message: signatureMessage,
            // })
          }
        >
          Cast Vote !
        </button>
        {/* {isSuccess && <div>Signature: {data}</div>}
        {isError && <div>Error signing message</div>} */}
      </div>
    );
  }