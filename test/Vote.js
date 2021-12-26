const { expect } = require("chai");

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

    // describe("Deployment", () => {
    //     it("Should set the right owner", async () => {
    //         expect(await hardhatToken.owner()).to.equal(owner.address);
    //     });
    // });

    describe("Voting", () => {
        it("Can propose", async () => {
            await VoteContract.propose('proposal0');
            expect(await VoteContract.getProposalCount()).to.equal(1);
            expect(await VoteContract.getProposalContent(0)).to.equal('proposal0');
        });
        it("Can vote", async () => {
            await VoteContract.propose('proposal0');
            await VoteContract.propose('proposal1');
            await VoteContract.vote(0);
            expect(await VoteContract.getProposalVotesCount(0)).to.equal(1);
            expect(await VoteContract.getProposalVotesCount(1)).to.equal(0);
        });
        it("Can end and find winner when there's only one", async () => {
            await VoteContract.propose('proposal0');
            await VoteContract.propose('proposal1');
            await VoteContract.vote(0);
            const x = await VoteContract.endVote();
            const y = await VoteContract.getProposals();
            console.log('await VoteContract.end(): ', x);
            console.log('VoteContract.getProposals(): ', y[0].content);
            expect(await VoteContract.getProposalVotesCount(0)).to.equal(1);

            console.log('await VoteContract.getProposalVotesCount(0): ', await VoteContract.getProposalVotesCount(0));
            // expect(await VoteContract.end()).to.equal([1, 0]);
        });
        it("Can end and find winner when there're more than one", async () => {
            await VoteContract.propose('proposal0');
            await VoteContract.propose('proposal1');
            await VoteContract.vote(0);
            await VoteContract.vote(1);
        });
    });

});
