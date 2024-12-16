const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MockTokenModule", (m) => {
  const initialOwner = m.getParameter(
    "initialOwner",
    "0x9A997cdd63535c64F2f265524aa744204C3015C0"
  );

  const mockToken = m.contract("MockToken", [initialOwner]);
  return { mockToken };
});
