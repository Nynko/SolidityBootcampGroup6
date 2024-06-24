import { useWriteContract } from 'wagmi'
import React, { useState } from 'react';

export const Delegate = () => {
  const { writeContractAsync } = useWriteContract();
  const [delegateeAddress, setDelegateeAddress] = useState('');

  const handleDelegateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDelegateeAddress(event.target.value);
  };

  const handleDelegate = async () => {
    if (delegateeAddress) {
      let onSuccess, onSettled, onError;
      try {
        const tx = await writeContractAsync({
          abi: [{
            inputs: [
              {
                internalType: "address",
                name: "delegatee",
                type: "address"
              }
            ],
            name: "delegate",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          }],
          address: '0x785ad3b5b6a0592f6e5627e9895b392632541ff3', 
          functionName: 'delegate',
          args: [delegateeAddress],
        }, { onSuccess, onSettled, onError }).catch((e: Error) => { throw e });
        console.log(tx);
      } catch (error) {
        console.log(onSuccess, onSettled, onError);
        console.log((error as Error).message);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Delegatee Address"
        value={delegateeAddress}
        onChange={handleDelegateChange}
      />
      <button onClick={handleDelegate}>Delegate</button>
    </div>
  );
};

