pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

contract Vote {
    struct Proposal {
        uint votesCount;
        string content;
    }

    Proposal[] public proposals;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    event ProposalSubmitted(address proposer, string content);
    event VoteOn(address voter, uint idx);
    event VoteEnd();

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function propose(string memory _content) public {
        proposals.push(Proposal(0, _content));
        emit ProposalSubmitted(msg.sender, _content);
    }

    function vote(uint256 _idx) public {
        proposals[_idx].votesCount += 1;
        emit VoteOn(msg.sender, _idx);
    }

    function endVote() public onlyOwner returns (uint[] memory) {
        uint[] memory winningProposals = new uint[](proposals.length);
        uint maxVoteCount = getMaxVotesCount();

        for (uint i=0; i < proposals.length; i++) {
            if (proposals[i].votesCount == maxVoteCount) {
                winningProposals[i] = 1;
            }
        }
        emit VoteEnd();
        return winningProposals;
    }

    function getMaxVotesCount() private view returns (uint) {
        uint maxVotesCount = 0;
        for (uint i=0; i < proposals.length; i++) {
            if (proposals[i].votesCount > maxVotesCount) {
                maxVotesCount = proposals[i].votesCount;
            }
        }
        return maxVotesCount;
    }

    function getProposals() external view returns (Proposal[] memory) {
        return proposals;
    }
}
