# ref: https://hardhat.org/tutorial/hackathon-boilerplate-project.html

## under root
# unit test
npx hardhat test

# start local test network
npx hardhat node
# deploy to local network
npx hardhat --network localhost run scripts/deploy.js

# faucet
npx hardhat --network localhost faucet <your address>

## under frontend/
# start app
cd frontend/
npm install
npm run start

