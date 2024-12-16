const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("StakedETHModule", (m) => {
  const initialOwner = m.getParameter(
    "initialOwner",
    "0x9A997cdd63535c64F2f265524aa744204C3015C0"
  );

  const stETH = m.contract("StakedETH", [initialOwner]);
  return { stETH };
});
