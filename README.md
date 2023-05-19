# Decentralized Game Night Voting Application

This is a demo application to implement voting in solidity smart contract using ReactJS.

[Menthol Game Night](https://menthol-game-night.vercel.app/)

## Installation

After you cloned the repository, install the packages using

```shell
npm install
```

You first need to compile the contract and deploy it to a blockchain network. Run the following commands to compile and deploy the contract.

```shell
npx hardhat compile
npx hardhat run scripts/deploy.js --network volta
```

You can also use another blockchain by writing the blockchain's endpoint in hardhat-config.

Once you have pasted the contract address to constant.js file, simply run command

```shell
npm start
```
