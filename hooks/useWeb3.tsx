import {useEffect, useState} from "react";
import Web3Modal from 'web3modal'
import {ethers} from "ethers";
import NFT from "@contracts/build/contracts/NFT.json";
import Marketplace from "@contracts/build/contracts/Marketplace.json";

const Web3DefaultValues = {
    account: '',
    network: 'LOCALHOST',
    balance: 0,
    // connectWallet: () => {},
    marketplaceContract: null,
    nftContract: null,
    isReady: false,
    isConnected: false,
}

const networkNames = {
    maticmum: 'MUMBAI',
    unknown: 'LOCALHOST',
    goerli: 'goerli'
}

const useWeb3 = () => {
    const [isConnected, setIsConnected] = useState<boolean>(Web3DefaultValues.isConnected);
    const [IsReady, setIsReady] = useState<boolean>(Web3DefaultValues.isReady);
    const [account, setAccount] = useState<string>(Web3DefaultValues.account);
    const [balance, setBalance] = useState<number>(Web3DefaultValues.balance);
    const [network, setNetwork] = useState<string>(Web3DefaultValues.network);
    const [marketplaceContract, setMarketplaceContract] = useState<any>(Web3DefaultValues.marketplaceContract);
    const [nftContract, setNftContract] = useState<any>(Web3DefaultValues.nftContract);

    useEffect(() => {
        initializeWeb3();
    }, []);

    const initializeWeb3WithoutSigner = async () => {
        const alchemyProvider = new ethers.AlchemyProvider(80001);
        setIsConnected(false);
        await getAndSetWeb3ContextWithoutSigner(alchemyProvider);
    }

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
            const provider = new ethers.BrowserProvider(connection, 'any');
            await getAndSetWeb3ContextWithoutSigner(provider);
        } catch (e) {
            console.log(e);
        }
    }

    const getAndSetWeb3ContextWithoutSigner = async (provider: any) => {
        setIsReady(false);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        await getAndSetAccountAndBalance(provider, signerAddress);
        const networkName = await getAndSetNetwork(provider);
        const isSuccess = await setupContracts(signer, networkName);
        setIsReady(isSuccess);
    }

    const getAndSetAccountAndBalance = async (provider: any, address: string) => {
        setAccount(address);
        const signerBalance = await provider.getBalance(address);
        const balance = ethers.formatEther(signerBalance);
        setBalance(Number(balance));
    }

    const getAndSetNetwork = async (provider: any) => {
        const { name: network } = await provider.getNetwork();
        const networkName = networkNames[network] || '';
        setNetwork(networkName);
        return networkName;
    }

    const setupContracts = async (signer: any, networkName: string) => {
        if (!networkName) {
            // TODO: error
            return false;
        }
        const marketplaceContract = new ethers.Contract("0xEE4414BbCAaDA751698F7B30B777734A538819f3", Marketplace.abi, signer);
        const nftContract = new ethers.Contract("0x75d20409FD728431fEBDC6119B359048Aa15A4da", NFT.abi, signer);
        setMarketplaceContract(marketplaceContract);
        setNftContract(nftContract);
        return true;
    }

    return {
        isConnected,
        IsReady,
        account,
        balance,
        network,
        marketplaceContract,
        nftContract
    }
}

export default useWeb3;