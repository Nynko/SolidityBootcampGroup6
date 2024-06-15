// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IMyToken {
    function getPastVotes(address, uint256) external view returns (uint256);
}

contract Ballot {
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    Proposal[] public proposals;

    IMyToken public tokenContract;
    uint256 public targetBlockNumber;
    mapping(address => uint) public votePowerSpent;

    constructor(
        bytes32[] memory proposalNames,
        IMyToken _tokenContract,
        uint256 _targetBlockNumber
    ) {
        tokenContract = _tokenContract;
        targetBlockNumber = _targetBlockNumber;
        // TODO: Validate if targetBlockNumber is in the past
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function vote(uint proposal, uint amount) external {
        // TODO: Implement vote function
    }

    // getVotePower(address voter)
    // tokenContract.getPastVotes()

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
