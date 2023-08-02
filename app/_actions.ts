'use server'

import axios from "axios";

export const pinFileToIpfs = async (formData: any) => {
    return await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
    });
}