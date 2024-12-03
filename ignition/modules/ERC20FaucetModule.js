const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const _token = "0x36D272eCBd80A8B09eB6bA19E2a390470D1c6d69";
const _dailyAllowance = 10000000000000000000n;

module.exports = buildModule("ERC20FaucetModule", (m) => {
  const erc20Faucet = m.contract("ERC20Faucet", [_token, _dailyAllowance]);
  return { erc20Faucet };
});
