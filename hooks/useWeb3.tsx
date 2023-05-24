import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import NFT from "@contracts/build/contracts/NFT.json";
import Marketplace from "@contracts/build/contracts/Marketplace.json";
import axios from "axios";

const Web3DefaultValues = {
  account: "",
  network: "LOCALHOST",
  balance: 0,
  // connectWallet: () => {},
  marketplaceContract: null,
  nftContract: null,
  isReady: false,
  isConnected: false,
};

type NetworkNames = {
  [key: string]: string;
  maticmum: string;
  unknown: string;
  goerli: string;
  sepolia: string;
  "matic-mumbai": string;
};

const networkNames: NetworkNames = {
  maticmum: "MUMBAI",
  unknown: "LOCALHOST",
  goerli: "goerli",
  sepolia: "sepolia",
  "matic-mumbai": "MUMBAI",
};
const useWeb3 = () => {
  const [isConnected, setIsConnected] = useState<boolean>(
    Web3DefaultValues.isConnected
  );

  const [IsReady, setIsReady] = useState<boolean>(Web3DefaultValues.isReady);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [account, setAccount] = useState<string>(Web3DefaultValues.account);
  const [balance, setBalance] = useState<number>(Web3DefaultValues.balance);
  const [network, setNetwork] = useState<string>(Web3DefaultValues.network);
  const [accountOrigin, setAccountOrigin] = useState<string>(
    Web3DefaultValues.account
  );
  const [marketplaceContract, setMarketplaceContract] = useState<any>(
    Web3DefaultValues.marketplaceContract
  );
  const [nftContract, setNftContract] = useState<any>(
    Web3DefaultValues.nftContract
  );

  useEffect(() => {
    initializeWeb3();
  }, []);

  const initializeWeb3WithoutSigner = async () => {
    const alchemyProvider = new ethers.AlchemyProvider(80001);
    setIsConnected(false);
    await getAndSetWeb3ContextWithoutSigner(alchemyProvider);
  };

  const initializeWeb3 = async () => {
    try {
      if (!window.ethereum) {
        return await initializeWeb3WithoutSigner();
      }

      const modal = new Web3Modal();
      const connection = await modal.connect();
      if (connection) {
        setIsConnected(true);
      }

      // provider 변경?
      const provider = new ethers.BrowserProvider(connection, "any");
      await getAndSetWeb3ContextWithoutSigner(provider);
    } catch (e) {
      console.log(e);
    }
  };

  const getAndSetWeb3ContextWithoutSigner = async (provider: any) => {
    setIsReady(false);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    await getAndSetAccountAndBalance(provider, signerAddress);
    const networkName = await getAndSetNetwork(provider);
    const isSuccess = await setupContracts(signer, networkName);
    setIsReady(isSuccess);
  };

  const getAndSetAccountAndBalance = async (provider: any, address: string) => {
    setAccountOrigin(address);
    setAccount(address.toLowerCase());
    await setLogin(address.toLowerCase());
    const signerBalance = await provider.getBalance(address);
    const balance = ethers.formatEther(signerBalance);
    setBalance(Number(balance));
  };

  const getAndSetNetwork = async (provider: any) => {
    const { name } = await provider.getNetwork();
    const networkName = networkNames[name] || "";
    setNetwork(networkName);
    return networkName;
  };

  const setLogin = async (address: string) => {
    try {
      await axios.post("/api/users/login", { address: address });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLogin(true);
    }
  };

  const setupContracts = async (signer: any, networkName: string) => {
    if (!networkName) {
      return false;
    }
    const marketplaceContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_MARKET_PLACE_CONTRACT_ADDRESS!,
      Marketplace.abi,
      signer
    );
    const nftContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
      NFT.abi,
      signer
    );
    setMarketplaceContract(marketplaceContract);
    setNftContract(nftContract);

    return true;
  };

  return {
    isConnected,
    IsReady,
    account,
    accountOrigin,
    balance,
    network,
    marketplaceContract,
    nftContract,
    isLogin,
  };
};

export default useWeb3;
