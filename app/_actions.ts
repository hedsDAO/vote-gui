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

export async function main() {
  try {
  const allUsers = await prisma.users.findMany()
  console.log(allUsers)
  await prisma.$disconnect()
  } catch(e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}