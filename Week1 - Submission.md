# Week 1 - Group 6

## Users and addresses

- AIAwTO -  @Detergent - Address: 
- 4hO1fl - @Nicolas Beaudouin - Address: 0xC6CbDd7D90458c5e1003DdE243bF1561efAeE516
- LFKRoI - @lakunle - Address: 
- KPkomO - @kvngeko.eth - Address: 
- bA101G - @Robert - Address: 

## Contracts
Here are at least one deployed HelloWorld contract:
- 0xC55433CD5b7aA03E3b74568aFE3Ce5c612Ce63EB

### Interface 

```solidity
interface HelloWorldInterface {

    function helloWorld() external view returns (string memory) ;

    function setText(string calldata newText) external  ;

    function transferOwnership(address newOwner) external  ;
    
}
```

## Report

- Deploying one contract: https://sepolia.etherscan.io/tx/0x9383e6610a24d6b65e77d367e08f5c6cf2da9fe8f89a586cea9bbde4139fc738
  - Calling helloWorld gives : "Hello World from Nico : )"
- Call SetText method : https://sepolia.etherscan.io/tx/0x39852787961af8b42a333405f2d5e32ca8db0407706d8b612f2c273ba337350d
  - Calling helloWorld gives : "Hello from Nico V2; )"
