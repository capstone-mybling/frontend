// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

contract MyblingNFT is ERC721Enumerable, Ownable, ReentrancyGuard{

    error WaitForACoupleOfBlocks(uint tillBlock, uint currentBlock);
    error InsufficientValue(uint paidPrice, uint price);
    error OutOfNFTs();
    error FailedToWithdraw();

    mapping(address=>uint) public NumberTracker;
    uint public limit;
    uint public latestId;
    uint public price;
    uint public interval;
    uint public revelingBlock;
    string public notReveledNFTURI;

    using Strings for uint;

    constructor(
        string memory _name,
        string memory _symbol,
        uint _limit,
        uint _price,
        uint _interval,
        uint _revelingBlock,
        string memory _notReveledNFTURI
    ) ERC721(_name, _symbol) {
        limit = _limit;
        price = _price;
        interval = _interval;
        revelingBlock = _revelingBlock + block.number;
        notReveledNFTURI = _notReveledNFTURI;
    }

    receive() external payable{
       mint();
    }

    function mint() public payable nonReentrant() {
        if (NumberTracker[msg.sender] == 0 ? false : NumberTracker[msg.sender] + interval >= block.number) {
            revert WaitForACoupleOfBlocks(NumberTracker[msg.sender] + interval, block.number);
        }

        if (price != msg.value) {
            revert InsufficientValue(msg.value, price);
        }

        if (latestId >= limit) {
            revert OutOfNFTs();
        }

        _safeMint(msg.sender, ++latestId);
        NumberTracker[msg.sender] = block.number;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        if (revelingBlock <= block.number) {
            string memory baseURI = _baseURI();
            return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
        }
        return notReveledNFTURI;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmPD5AawNBDLVPMN7Aq4KfQiJXSZibx2RDLs1f4ZbcX1b8";
    }

    function airdrop(address _to, uint _number) external onlyOwner() {
        if (latestId + _number > limit) {
            revert OutOfNFTs();
        }

        for (uint i; i < _number; ++i) {
            _safeMint(_to, ++latestId);
        }
    }

    function airdrops(address[] calldata _to) external onlyOwner() {
        uint _size = _to.length;

        if (latestId + _size > limit) {
            revert OutOfNFTs();
        }

        for (uint i; i < _size; ++i) {
            _safeMint(_to[i], ++latestId);
        }
    }

    function setPrice(uint _price) external onlyOwner() {
        price = _price;
    }

    function setInterval(uint _interval) external onlyOwner() {
        interval = _interval;
    }

    function currentBalance() external view returns(uint) {
        return address(this).balance;
    }

    function withdraw() external onlyOwner() {
        (bool _result,) = address(msg.sender).call{value: address(this).balance}("");
        if (!_result) revert FailedToWithdraw();
    }
}