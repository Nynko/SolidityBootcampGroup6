# Week 1 - Group 6

## Users and addresses

- AIAwTO -  @Detergent - Address: 
- 4hO1fl - @Nicolas Beaudouin - Address: 0xC6CbDd7D90458c5e1003DdE243bF1561efAeE516
- LFKRoI - @lakunle - Address: 
- KPkomO - @kvngeko.eth - Address: 
- bA101G - @Robert - Address: 

## Contracts
Here are at least one deployed HelloWorld contract:
- 0x46Bdb5448Adf36a6C3856cdA2Df649961eE7981f

### Interface 

```solidity
interface HelloWorldInterface {

    function helloWorld() external view returns (string memory) ;

    function setText(string calldata newText) external  ;

    function transferOwnership(address newOwner) external  ;
    
}
```

## Report

- Deploying one contract: https://sepolia.etherscan.io/tx/0x620ad3b295d2a7012f8c001ebcf740d3fcf72b78965e4b1aed69a91f6409cedd
  - Calling helloWorld gives : "Hello World!"
- Call SetText method : https://sepolia.etherscan.io/tx/0xe47cc314f7d43f543213826aebb05b100228559d7d24801e5103ec72762350ff
  - Calling helloWorld gives : "Hello from Nico !"
