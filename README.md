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
