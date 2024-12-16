require("dotenv").config();
const { VennClient } = require("@vennbuild/venn-dapp-sdk");
const { Interface, JsonRpcProvider, Wallet, AbiCoder } = require("ethers");
const EIGENFIPOOL_CONTRACT_ABI = require("../app/abi/EigenFiPool.json");
const FAUCET_CONTRACT_ABI = require("../app/abi/ERC20Faucet.json");
const STAKEDETH_CONTRACT_ABI = require("../app/abi/StakedETH.json");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const vennURL = process.env.VENN_NODE_URL;
const vennMockURL = process.env.VENN_MOCK_NODE_URL;
const vennPolicyAddress = process.env.VENN_POLICY_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.API_URL;
const faucetContractAddress = process.env.FAUCET_CONTRACT_ADDRESS;
const eigenfiPoolContractAddress = process.env.EIGENFIPOOL_CONTRACT_ADDRESS;

if (!vennURL) {
  throw "env vennNodeUrl is not defined";
}
if (!vennMockURL) {
  throw "env vennNodeUrl is not defined";
}
if (!vennPolicyAddress) {
  throw "env venn policy address is not defined";
}
if (!privateKey) {
  throw "privatekey is not defined";
}
if (!rpcUrl) {
  throw "rpcUrl  is not defined";
}
if (!faucetContractAddress) {
  throw "faucetContractAddress is not defined";
}
if (!eigenfiPoolContractAddress) {
  throw "eigenfiPoolContractAddress is not defined";
}

const vennClient = new VennClient({ vennURL, vennPolicyAddress });
const vennMockClient = new VennClient({
  vennURL: vennMockURL,
  vennPolicyAddress,
});

const provider = new JsonRpcProvider(rpcUrl);
const wallet = new Wallet(privateKey, provider);

async function runTransaction(from, to, value, ABI, functionName, params) {
  const contractInterface = new Interface(ABI);
  const data = contractInterface.encodeFunctionData(functionName, params);
  const transaction = {
    from,
    to,
    data,
    value,
  };
  const receipt = await wallet.sendTransaction(transaction);
  return receipt;
}

async function createTransaction(from, to, value, ABI, functionName, params) {
  const contractInterface = new Interface(ABI);
  const data = contractInterface.encodeFunctionData(functionName, params);
  const transaction = {
    from,
    to,
    data,
    value,
  };
  return transaction;
}

async function createApprovedTransaction(
  from,
  to,
  value,
  ABI,
  functionName,
  params
) {
  const transaction = await createTransaction(
    from,
    to,
    value,
    ABI,
    functionName,
    params
  );

  console.log;

  const approvedTransaction = await vennClient.approve(transaction);
  return approvedTransaction;
}

async function createMockApprovedTransaction(
  from,
  to,
  value,
  ABI,
  functionName,
  params
) {
  const transaction = await createTransaction(
    from,
    to,
    value,
    ABI,
    functionName,
    params
  );
  const approvedTransaction = await vennMockClient.approve(transaction);
  return approvedTransaction;
}

async function test(from, to, value, ABI, functionName, params) {
  try {
    const transaction = await createTransaction(
      from,
      to,
      value,
      ABI,
      functionName,
      params
    );

    const receipt = await wallet.sendTransaction(transaction);

    console.log("normal transaction not pass");
    process.exit(1);
  } catch (err) {}

  try {
    const approvedTransaction = await createApprovedTransaction(
      from,
      to,
      value,
      ABI,
      functionName,
      params
    );

    const receipt = await wallet.sendTransaction(approvedTransaction);
  } catch (err) {
    console.log(err);
    throw "approved transaction should pass";
  }

  try {
    const mockApprovedTransaction = await createMockApprovedTransaction(
      from,
      to,
      value,
      ABI,
      functionName,
      params
    );

    console.log(mockApprovedTransaction);

    const receipt = await wallet.sendTransaction(mockApprovedTransaction);

    console.log("mock transaction not pass");
    process.exit(1);
  } catch (err) {}
}

async function testWait(from, to, value, ABI, functionName, params) {
  try {
    const transaction = await createTransaction(
      from,
      to,
      value,
      ABI,
      functionName,
      params
    );

    const receipt = await wallet.sendTransaction(transaction);

    await receipt.wait();

    console.log("normal transaction not pass");
    process.exit(1);
  } catch (err) {}

  try {
    const approvedTransaction = await createApprovedTransaction(
      from,
      to,
      value,
      ABI,
      functionName,
      params
    );

    const receipt = await wallet.sendTransaction(approvedTransaction);
    await receipt.wait();
  } catch (err) {
    console.log(err);
    throw "approved transaction should pass";
  }

  try {
    const mockApprovedTransaction = await createMockApprovedTransaction(
      from,
      to,
      value,
      ABI,
      functionName,
      params
    );

    console.log(mockApprovedTransaction);

    const receipt = await wallet.sendTransaction(mockApprovedTransaction);
    await receipt.wait();

    console.log("mock transaction not pass");
    process.exit(1);
  } catch (err) {}
}

async function main() {
  let amount = 1;

  const getTokenAddressTransaction = await createTransaction(
    null,
    faucetContractAddress,
    0,
    FAUCET_CONTRACT_ABI,
    "token",
    []
  );

  const tokenAddress = AbiCoder.defaultAbiCoder().decode(
    ["address"],
    await provider.call(getTokenAddressTransaction)
  )[0];

  await runTransaction(
    wallet.address,
    tokenAddress,
    0,
    STAKEDETH_CONTRACT_ABI,
    "mint",
    [faucetContractAddress, 1000000]
  );

  console.log("Token sended Faucet Contract");

  await testWait(
    wallet.address,
    faucetContractAddress,
    0,
    FAUCET_CONTRACT_ABI,
    "setDailyAllowance",
    [11]
  );

  console.log("setDailyAllowance pass");

  await testWait(
    wallet.address,
    faucetContractAddress,
    0,
    FAUCET_CONTRACT_ABI,
    "claimTokens",
    []
  );

  console.log("claimTokens pass");

  await testWait(
    wallet.address,
    faucetContractAddress,
    0,
    FAUCET_CONTRACT_ABI,
    "withdrawTokens",
    [10]
  );

  console.log("withdrawTokens pass");

  // allow to send
  await (
    await runTransaction(
      wallet.address,
      tokenAddress,
      0,
      STAKEDETH_CONTRACT_ABI,
      "approve",
      [eigenfiPoolContractAddress, 100]
    )
  ).wait();

  console.log("token approved for depositFor function");

  await testWait(
    wallet.address,
    eigenfiPoolContractAddress,
    0,
    EIGENFIPOOL_CONTRACT_ABI,
    "depositFor",
    [tokenAddress, wallet.address, amount]
  );

  console.log("depositFor pass");

  await test(
    wallet.address,
    eigenfiPoolContractAddress,
    amount,
    EIGENFIPOOL_CONTRACT_ABI,
    "depositETHFor",
    [wallet.address]
  );

  console.log("depositETHFor pass");

  await test(
    wallet.address,
    eigenfiPoolContractAddress,
    0,
    EIGENFIPOOL_CONTRACT_ABI,
    "withdraw",
    [tokenAddress, amount]
  );

  console.log("withdraw Pass");

  // await test(
  //   wallet.address,
  //   eigenfiPoolContractAddress,
  //   0,
  //   EIGENFIPOOL_CONTRACT_ABI,
  //   "migrateWithSig",
  //   []
  // );
  //
  // await test(
  //   wallet.address,
  //   eigenfiPoolContractAddress,
  //   0,
  //   EIGENFIPOOL_CONTRACT_ABI,
  //   "migrate",
  //   []
  // );
  //

  await test(
    wallet.address,
    eigenfiPoolContractAddress,
    0,
    EIGENFIPOOL_CONTRACT_ABI,
    "blockMigrator",
    [Wallet.createRandom(["123"]).address, true]
  );

  console.log("blockMigrator Pass");

  await test(
    wallet.address,
    eigenfiPoolContractAddress,
    0,
    EIGENFIPOOL_CONTRACT_ABI,
    "setStakable",
    [Wallet.createRandom(["123"]).address, true]
  );

  console.log("setStakable Pass");

  await test(
    wallet.address,
    eigenfiPoolContractAddress,
    0,
    EIGENFIPOOL_CONTRACT_ABI,
    "setHelixSigner",
    [Wallet.createRandom(["123"]).address]
  );
}

main().catch(console.error);
