const NFT = artifacts.require("MyblingNFT");

module.exports = function(deployer) {
  deployer.deploy(NFT, "TEST", "TEST_SB", 10, 10000, 3, 3, "ipfs://QmPD5AawNBDLVPMN7Aq4KfQiJXSZibx2RDLs1f4ZbcX1b8");
};
