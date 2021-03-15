require("dotenv").config()
require('babel-register')
require('babel-polyfill')
const HDWalletProvider = require("@truffle/hdwallet-provider")
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();
const mnemonic = process.env.MNEMONIC.trim()
// const GOERLI_KEY = "67776afcab7646549ef71a43736a8edc";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mainnet.matic.today`),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    goerli: {
      provider: () => {
        // console.log(env.INFURA_API_KEY)
        return new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/' + process.env.GOERLI_KEY)
      },
      network_id: '5', // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "0.6.6"
      // evmVersion: "petersburg"
    }
  }
}
