const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const initialOwner = "0x3989BCC4a9A4E356265AcC658fB10Dfb3a86ddd7";

module.exports = buildModule("MockTokenModule", (m) => {
  const mockToken = m.contract("MockToken", [initialOwner]);
  return { mockToken };
});
