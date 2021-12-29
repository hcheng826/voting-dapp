const { expect } = require("chai");

const { ethers } = require("hardhat");

describe("Vote contract", function () {

    let Vote;
    let VoteContract;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        Vote = await ethers.getContractFactory("Vote");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        VoteContract = await Vote.deploy();
        await VoteContract.deployed();
    });

    describe("Deployment", () => {
        it("Should set the right owner", async () => {
            expect(await VoteContract.owner()).to.equal(owner.address);
        });
    });

    describe("Voting", () => {
        it("Can propose", async () => {
            await VoteContract.propose('proposal0');
            const proposals = await VoteContract.getProposals();
            expect(proposals.length).to.equal(1);
            expect(proposals[0].content).to.equal('proposal0');
        });
        it("Can vote", async () => {
            await VoteContract.propose('proposal0');
            await VoteContract.propose('proposal1');
            await VoteContract.vote(0);
            const proposals = await VoteContract.getProposals();
            expect(proposals[0].votesCount).to.equal(1);
            expect(proposals[1].votesCount).to.equal(0);
        });
        it("Can end and find winner when there's only one", async () => {
            await VoteContract.propose('proposal0');
            await VoteContract.propose('proposal1');
            await VoteContract.vote(0);

            const tx = await VoteContract.endVote();
            const rc = await tx.wait();
            const endVoteEvent = rc.events.find(event => event.event === 'VoteEnd');
            expect(endVoteEvent.args[0].map(i => i.toNumber())).to.eql([1, 0]);
        });
        it("Can end and find winners when there're more than one", async () => {
            await VoteContract.propose('proposal0');
            await VoteContract.propose('proposal1');
            await VoteContract.vote(0);
            await VoteContract.vote(1);

            const tx = await VoteContract.endVote();
            const rc = await tx.wait();
            const endVoteEvent = rc.events.find(event => event.event === 'VoteEnd');
            expect(endVoteEvent.args[0].map(i => i.toNumber())).to.eql([1, 1]);
        });
        it("Block non-owner from ending the vote", async () => {
            await VoteContract.propose('proposal0');
            await VoteContract.propose('proposal1');
            await VoteContract.vote(0);

            await expect(VoteContract.connect(addr1).endVote())
                .to.be.revertedWith("Only contract owner can call this function");
        });
        it("Can clear proposals", async () => {
            await VoteContract.propose('proposal0');
            await VoteContract.propose('proposal1');
            await VoteContract.vote(0);

            await VoteContract.endVote();
            await VoteContract.clearProposals();
            const proposals = await VoteContract.getProposals();
            expect(proposals.length).to.equal(0);
        });
    });

});
