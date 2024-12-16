const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EigenFiPoolModule", (m) => {
  const _signer = m.getParameter(
    "signer",
    "0x9A997cdd63535c64F2f265524aa744204C3015C0"
  );
  const _weth = m.getParameter(
    "weth",
    "0x6B5817E7091BC0C747741E96820b0199388245EA"
  );
  const _tokensAllowed = m.getParameter("tokensAllowed", [
    "0xE88bD33434BEA79f767F03a927EC9eE02D7Ea2ef",
    _weth,
  ]);

  const eigenFiPool = m.contract("EigenFiPool", [
    _signer,
    _tokensAllowed,
    _weth,
  ]);
  return { eigenFiPool };
});
