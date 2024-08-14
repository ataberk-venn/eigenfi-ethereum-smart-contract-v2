const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const _signer = "0x900a7A576E37d1dc9B6B8D31BDdd78470052f8F7";
const _weth = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const _tokensAllowed = ["0x2a8da3AFB77096530146FFc544d5714C63C3CE4B"];

module.exports = buildModule("EigenFiPoolModule", (m) => {
  const eigenFiPool = m.contract("EigenFiPool", [
    _signer,
    _tokensAllowed,
    _weth,
  ]);
  return { eigenFiPool };
});
