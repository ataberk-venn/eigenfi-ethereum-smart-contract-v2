1. git clone https://github.com/HelixLabsDev/eigenfi-ethereum-smart-contract-v2.git

2. npm install

3. create a .env file, and copy and paste .env.template

4. npx hardhat compile

5. npm run deploy -- --signer [] --weth [] --network [] --chainId [] --initialOwner

###### Example

npm run deploy -- --signer 0x9A997cdd63535c64F2f265524aa744204C3015C0 --weth 0x6B5817E7091BC0C747741E96820b0199388245EA --network ethereum_holesky
--chainId 17000 --initialOwner 0x9A997cdd63535c64F2f265524aa744204C3015C0

6. npm run enable-firewall [network] [chainId]

###### Example

npm run enable-firewall holesky 17000

then change .env file VENN_POLICY_ADDRESS FAUCET_CONTRACT_ADDRESS and EIGENFIPOOL_CONTRACT_ADDRESS
you can find VENN_POLICY_ADDRESS in terminal and you can find others in venn.config.json file

7. npm run live-test

---

# EigenFiPool

### Setup

#### Configuration

The contract is initialized with the following set of parameters:

- `_signer`: Address of the signer
- `_tokensAllowed`: Addresses of the tokens to allow
- `_weth`: Address of the WETH

---

#### Getting Start

1. git clone https://github.com/HelixLabsDev/eigenfi-ethereum-smart-contract-v2.git

2. npm install

3. create a .env file, and copy and paste .env.template

4. npx hardhat compile

5. npx hardhat ignition deploy ignition/modules/EigenFiPoolModule.js --network ethereum_sepolia

6. npm run enable-firewall sepolia 11155111

## License

Created under the UNLICENSED
