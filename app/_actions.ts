'use server'

import axios from "axios";
import { PrismaClient } from '@prisma/client';

export const pinFileToIpfs = async (file: File, name: string) => {
  const data = new FormData();
    
    // Metadata for pinata can be customized as needed
    const pinataMetadata = {
      name: name,
      keyvalues: {
        fieldName: name,
      },
    };
  
    data.append('pinataMetadata', JSON.stringify(pinataMetadata));
    data.append('file', file);
    return await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
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