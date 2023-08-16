"use server";

import { PrismaClient } from "@prisma/client";
import { createClient, Vote, Proposal } from "hedsvote";
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
          pinata_api_key: process.env.PINATA_API_KEY || "",
          pinata_secret_api_key: process.env.PINATA_API_SECRET || "",
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


export async function getProposals(space: string) {
  try {
    const proposals = await createClient().getAllProposalsInSpace(space);
    console.log(proposals.data)
  return proposals.data || undefined;
  } catch (e) {
    console.log(e)
  }
}

export async function getSpaceData(spaceName: string) {
  const spaces = await createClient().getAllSpaces();
  const space = spaces.data.find(space => space.name === spaceName);
  return space || null;
}

export async function getDisplayNameForAuthors(proposals: Proposal[] | undefined) {
  const displayNames: {[author:string]: string} = {};
  if (!proposals) return;
  for (const proposal of proposals) {
    const author = proposal.author;
    try {
      const authorRecord = await prisma.users.findUnique({
        where: {
          wallet: author.toLowerCase(),
        },
        select: {
          display_name: true
        }
      });
      if (authorRecord && authorRecord.display_name) {
        displayNames[author] = authorRecord.display_name;
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }
  return displayNames;
}
