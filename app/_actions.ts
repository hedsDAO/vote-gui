"use server";

import { PrismaClient } from "@prisma/client";
import { createClient, Vote } from "hedsvote";
import { WalletClient } from "viem";

// export const pinFileToIpfs = async (formData: any) => {
//   return await axios.post(
//     "https://api.pinata.cloud/pinning/pinFileToIPFS",
//     formData,
//     {
//       maxBodyLength: Infinity,
//       headers: {
//         pinata_api_key: process.env.PINATA_API_KEY,
//         pinata_secret_api_key: process.env.PINATA_API_SECRET,
//       },
//     }
//   );
// };

const prisma = new PrismaClient();

export async function getuserData(user: `0x${string}`) {
  try {
    const userProfileData = await prisma.users.findUnique({
      where: {
        wallet: user.toLowerCase(),
      },
    });
    await prisma.$disconnect();
    return userProfileData;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// export const pinFileToIpfs = async (formData: FormData) => {
//     return await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         maxBodyLength: Infinity,
//         headers: {
//           pinata_api_key: process.env.PINATA_API_KEY,
//           pinata_secret_api_key: process.env.PINATA_API_SECRET,
//         },
//     });
// }
export const pinFileToIpfs = async (formData: FormData) => {
  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        body: formData,
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const castVote = async ({
  vote,
  account,
}: {
  vote: Vote;
  account: WalletClient;
}) => {
  const { castVote } = createClient();
  try {
    await castVote(account, vote);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const getProposalById = async (id: string) => {
  const { getProposal } = createClient();
  try {
    const proposal = await getProposal(id);
    return proposal;
  } catch (error) {
    console.log(error);
  }
};
