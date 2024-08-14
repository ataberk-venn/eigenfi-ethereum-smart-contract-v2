const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const _signer = "0xCa28eaA4fFF145c26074F3EA08b657B288401E33";
const _weth = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const _tokensAllowed = ["0xeBB643800FF0bfCf4D4b3446B78654f924d1907F"];

module.exports = buildModule("EigenFiPoolModule", (m) => {
  const eigenFiPool = m.contract("EigenFiPool", [
    _signer,
    _tokensAllowed,
    _weth,
  ]);
  return { eigenFiPool };
});
