# Week 1 - Group 6

## Users and addresses

- AIAwTO -  @Detergent - Address: 0x46Bec6C328eDA6A432A45b9c0c598A1A6e15C4d3 
- 4hO1fl - @Nicolas Beaudouin - Address: 0xC6CbDd7D90458c5e1003DdE243bF1561efAeE516
- LFKRoI - @lakunle - Address: 0xe046945f31e7510588155138cc9a62838c635108
- KPkomO - @kvngeko.eth - Address: 0x8f731049CfE57d67E8c1507B78A41E6EC8cD0731
- bA101G - @Robert - Address: 0x9d1aAF184154E9d6Fc7d138Ee560134732427f7E

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
- Call TransferOwnership to "0x8f731049CfE57d67E8c1507B78A41E6EC8cD0731" : https://sepolia.etherscan.io/tx/0x18d501c7138bcf9dbb1bc424a5ca396c220de244a1d72f27dafa254d554888f8
- Call SetText method **fails** from previous owner (Nicolas): https://sepolia.etherscan.io/tx/0x180f49a617e892a9d3929329ab7b38239c3da039a64a1a9aa95a94c01bc645ad
- Call SetText method **fails** from other address than owner (Robert): https://sepolia.etherscan.io/tx/0x138d7591280368f342284d8cd49c3638b29e99929666568de702d5cb6c0f509b
