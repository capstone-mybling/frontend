declare module "@contracts/build/contracts/Marketplace.json" {
  const value: any;
  const makeItem: (
    address: string,
    BigInt: number,
    price: BigInt
  ) => Promise<void>;
  const itemCount: () => Promise<BigInt>;
  export default value;
}
