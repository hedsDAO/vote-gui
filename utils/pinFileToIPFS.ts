import axios from "axios";
import axiosRetry from 'axios-retry';
import { config } from "dotenv";
import 'dotenv/config'
config()

export const pinFileToIpfs = async (formData: FormData) => {
    const axiosInstance = axios.create();
    axiosRetry(axiosInstance, { retries: 5 });
  return await axiosInstance.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: Infinity,
      headers: {
        pinata_api_key: "f0bec188c920226e705d",
        pinata_secret_api_key: "f06667bd183d073067c7d13412fb6ce0c2e23f30cb609beb417d682cea862632",
      },
    }
  );
};