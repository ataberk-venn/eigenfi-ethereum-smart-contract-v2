const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ERC20FaucetModule", (m) => {
  const _token = m.getParameter(
    "token",
    "0xE88bD33434BEA79f767F03a927EC9eE02D7Ea2ef"
  );

  const _dailyAllowance = m.getParameter(
    "dailyAllowance",
    10000000000000000000n
  );

  const erc20Faucet = m.contract("ERC20Faucet", [_token, _dailyAllowance]);
  return { erc20Faucet };
});
