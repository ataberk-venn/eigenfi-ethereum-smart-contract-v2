async function main() {
    const _signer = "0x943793FeCa910ADE08Df1a391858E4b82eF0Cf74";
    const _weth = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
    const _tokensAllowed = ["0x2a8da3AFB77096530146FFc544d5714C63C3CE4B"]
    const eigenFi = await ethers.deployContract("EigenFiPool", [_signer, _tokensAllowed, _weth]);
    const eigenFiAddress = await eigenFi.getAddress();
    console.log("EigenFi Contract Address: ", eigenFiAddress);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });