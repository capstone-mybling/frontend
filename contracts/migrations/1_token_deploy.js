const NFT = artifacts.require("NFT");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = async function (deployer) {
  const marketPlace = await deployer.deploy(MarketPlace, 1);
  const nft = await deployer.deploy(NFT);
  console.log(MarketPlace.address, NFT.address);
};
