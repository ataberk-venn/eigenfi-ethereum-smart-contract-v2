const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const _signer = "0x3989BCC4a9A4E356265AcC658fB10Dfb3a86ddd7";
const _weth = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const _tokensAllowed = ["0xF47763Ae4b3C4A04345C65229e99344be107301b"];

module.exports = buildModule("EigenFiPoolModule", (m) => {
  const eigenFiPool = m.contract("EigenFiPool", [
    _signer,
    _tokensAllowed,
    _weth,
  ]);
  return { eigenFiPool };
});
