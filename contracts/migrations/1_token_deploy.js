const NFT = artifacts.require("NFT");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = async function(deployer) {
  const marketPlace = await deployer.deploy(MarketPlace);
  const nft = await deployer.deploy(NFT, MarketPlace.address);
  console.log(MarketPlace.address, NFT.address);
};
