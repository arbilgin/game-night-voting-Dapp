async function main() {
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(["agar.io", "poker", "Age of Empires", "jackBox", "Fall Guys", "Among Us"], 150);
  await voting.deployed();
  console.log("Contract deployed to: ", voting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });