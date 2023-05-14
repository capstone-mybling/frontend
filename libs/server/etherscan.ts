// import {init} from "etherscan-api";
//
// const initEtherscan = (network: string = 'goerli') => {
//     const etherscan = init(process.env.ETHERSCAN_API_KEY, network, 10000);
//     return etherscan;
// }
//
// export const getTransactionByHash = async (hash: string, network: string = 'goerli') => {
//     const etherscan = initEtherscan(network);
//     const response = await etherscan.proxy.eth_getTransactionByHash(hash);
//     return response;
// }
//
// export const getTransactionCount = async (address: string, network: string = 'goerli') => {
//     const etherscan = initEtherscan(network);
//     const response = await etherscan.proxy.eth_getTransactionCount(address);
//     return response;
// }
//
// export const getTransactionReceipt = async (hash: string, network: string = 'goerli') => {
//     const etherscan = initEtherscan(network);
//     const response = await etherscan.proxy.eth_getTransactionReceipt(hash);
//     return response;
// }
//
// export const getTokenNFTTransactions = async (address: string, network: string = 'goerli') => {
//     const etherscan = initEtherscan(network);
//     // TODO: ContractAddress env로 빼기
//     const response = await etherscan.account.tokennfttx(address, "0xDaeB2C1dF98EF8bEb26C3b996a0114Dd643B0602");
//     return response;
// }
//
// export const getTokenNFTTransaction = async (address: string, transactionHash: string, network: string = 'goerli') => {
//     const response = await getTokenNFTTransactions(address, network);
//     const transaction = response.result.find((transaction: any) => {
//         return transaction.hash === transactionHash
//     });
//     return transaction;
// }