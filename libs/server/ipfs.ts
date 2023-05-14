import pinataSDK from "@pinata/sdk";
import {ReadStream} from "fs";

const initializePinata = () => {
    const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);
    return pinata;
}


export const uploadFileToIPFS = async (file: ReadStream, name: string) => {
    const pinata = initializePinata();
    const response = await pinata.pinFileToIPFS(file, {
        pinataMetadata: {
            name,
        }
    });
    return {
        ipfsHash: response.IpfsHash,
        pinSize: response.PinSize,
    };
}

export const uploadJsonToIPFS = async (data: object, name) => {
    const pinata = initializePinata();
    const response = await pinata.pinJSONToIPFS(data, {
        pinataMetadata: {
            name,
        }
    });
    return {
        ipfsHash: response.IpfsHash,
        pinSize: response.PinSize,
    };
}
