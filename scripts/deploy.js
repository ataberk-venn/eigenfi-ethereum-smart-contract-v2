const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("child_process");
const { parseArgs } = require("./utils.js");

const optionalKeys = ["signer", "weth", "network", "chainId", "initialOwner"];
const keys = ["signer", "weth", "network", "chainId", "initialOwner"];
const args = parseArgs(keys, optionalKeys);

function findContractName(name) {
  const jsonFilePath = path.join(
    __dirname,
    `../ignition/deployments/chain-${args.chainId}/deployed_addresses.json`
  );

  try {
    const deployedAddresses = JSON.parse(
      fs.readFileSync(jsonFilePath, "utf-8")
    );

    return deployedAddresses[name];
  } catch (error) {
    console.error("Failed to read or parse the JSON file:", error.message);
    process.exit(1);
  }
}

try {
  try {
    const jsonFilePath = path.join(__dirname, `../ignition/parameters.json`);

    let parameters = {};

    try {
      parameters = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    } catch {}

    parameters["StakedETHModule"] = {
      initialOwner: args.initialOwner,
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(parameters, null, 2));
  } catch (error) {
    console.log(error);
    process.exit(2);
  }

  //Deploy StakedETHModule
  execSync(
    `npx hardhat ignition deploy ignition/modules/StakedETHModule.js --parameters ignition/parameters.json --network ${args.network} --verify`,
    {
      stdio: "inherit",
    }
  );

  //Get the StakedETHModule.js contract address
  let tokenContract = findContractName("StakedETHModule#StakedETH");

  //write configs to parameters.json
  try {
    const jsonFilePath = path.join(__dirname, `../ignition/parameters.json`);

    let parameters = {};

    try {
      parameters = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    } catch {}

    parameters["ERC20FaucetModule"] = {
      token: tokenContract,
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(parameters, null, 2));
  } catch (error) {
    console.log(error);
    process.exit(2);
  }

  //Deploy ERC20FaucetModule
  execSync(
    `npx hardhat ignition deploy ignition/modules/ERC20FaucetModule.js --parameters ignition/parameters.json --network ${args.network} --verify`,
    {
      stdio: "inherit",
    }
  );

  //write configs to parameters.json
  try {
    const jsonFilePath = path.join(__dirname, `../ignition/parameters.json`);

    const parameters = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    parameters["EigenFiPoolModule"] = {
      signer: args.signer,
      weth: args.weth,
      tokensAllowed: [tokenContract, args.weth],
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(parameters, null, 2));
  } catch (error) {
    console.log(error);
    process.exit(2);
  }

  //Deploy EigenFiPoolModule
  execSync(
    `npx hardhat ignition deploy ignition/modules/EigenFiPoolModule.js --parameters ignition/parameters.json --network ${args.network} --verify`,
    {
      stdio: "inherit",
    }
  );
} catch (error) {
  console.log(error);
}
