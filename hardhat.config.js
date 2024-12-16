/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomicfoundation/hardhat-ignition-ethers");
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-abi-exporter");

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    ethereum_sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
    },
    ethereum_holesky: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
  abiExporter: {
    path: "./app/abi",
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
  },
};
