async function main() {
    const mockToken = await ethers.deployContract("MockToken",);
    const mockTokenAddress = await mockToken.getAddress();
    console.log("MockToken Contract Address: ", mockTokenAddress);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });