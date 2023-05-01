import {createAlchemyWeb3} from "@alch/alchemy-web3";
import contract from "../../contracts/build/contracts/MyblingNFT.json";


const API_URL = "https://goerli.infura.io/v3/10629208aa9d4d00a92902d2f8ac52e3";
const contractAddress = "0x0e8B2526b077772cA9B87F3ddDaaF9e178202b4b";
const privateKey = "cc75864b16ca1443e416bad4d60c8c8eb459d71bde09f20fb07d22baaa258993";

const web3 = createAlchemyWeb3(API_URL);

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

console.log(nftContract);

export default web3;