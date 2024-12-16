const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("child_process");

const chainName = process.argv.at(2);
const chainId = process.argv.at(3);

if (!chainName) {
  console.log("provide chain name");
  process.exit(1);
}
if (!chainId) {
  console.log("provide chain id");
  process.exit(1);
}

class ContractsBuilder {
  constructor() {
    this.contracts = {};
  }

  addContract(name, address) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new Error(
        `Invalid Ethereum address for contract "${name}": ${address}`
      );
    }
    this.contracts[name] = address;
    return this;
  }

  build() {
    return this.contracts;
  }
}

let file = { networks: {} };
let builder = new ContractsBuilder();

const jsonFilePath = path.join(
  __dirname,
  `../ignition/deployments/chain-${chainId}/deployed_addresses.json`
);

try {
  const deployedAddresses = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

  for (const [key, address] of Object.entries(deployedAddresses)) {
    const contractName = key.split("#")[1] || key;
    if (contractName == "StakedETH" || contractName == "MockToken") {
      continue;
    }
    builder.addContract(contractName, address);
  }

  console.log("Contracts added successfully!");
} catch (error) {
  console.error("Failed to read or parse the JSON file:", error.message);
  process.exit(1);
}

file.networks[chainName] = {
  contracts: builder.build(),
  policyAddress: "",
};

console.log("Generated file content:", JSON.stringify(file, null, 2));

try {
  fs.writeFileSync("venn.config.json", JSON.stringify(file, null, 2));
  console.log("Saved to venn.config.json!");
} catch (error) {
  console.error("Failed to save file:", error.message);
}

try {
  console.log("Running `venn enable` ...");
  execSync("venn enable", {
    stdio: "inherit",
    cwd: path.resolve(__dirname, "../"),
  });
  console.log("`venn enable` executed successfully!");
} catch (error) {
  console.error("Failed to run `venn enable`:", error.message);
  process.exit(1);
}
