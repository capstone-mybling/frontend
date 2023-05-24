declare module "@contracts/build/contracts/NFT.json" {
  const value: any;
  const mint: (tokenURI: string) => Promise<void>;
  const tokenCount: () => Promise<BigInt>;
  const setApprovalForAll: (
    address: string,
    approved: boolean
  ) => Promise<void>;
  const approve: (address: string, tokenId: BigInt) => Promise<void>;
  export default value;
}
