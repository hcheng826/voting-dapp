# Voting Dapp

This repo uses the project template from [hardhat-hackathon-boilerplate](https://github.com/nomiclabs/hardhat-hackathon-boilerplate).

The Dapp is a voting app that allows users to propose their content and vote which is the best proposal. The contract owner can end the vote and the winner would be announced.

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/hcheng826/voting-dapp.git
cd voting-dapp
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

> Note: There's [an issue in `ganache-core`](https://github.com/trufflesuite/ganache-core/issues/650) that can make the `npm install` step fail.
>
> If you see `npm ERR! code ENOLOCAL`, try running `npm ci` instead of `npm install`.

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.
