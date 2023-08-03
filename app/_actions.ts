'use server'

import axios from "axios";
import { PrismaClient } from '@prisma/client'

export const pinFileToIpfs = async (formData: any) => {
    return await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
    });
}

const prisma = new PrismaClient()

export async function getuserData(user: `0x${string}`) {
  try {
  const userProfileData = await prisma.users.findUnique({
    where: {
      wallet: user.toLowerCase(),
    }
  });
  await prisma.$disconnect();
  return userProfileData;
  } catch(e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}