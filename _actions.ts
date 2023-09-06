"use server";

import { PrismaClient } from "@prisma/client";
import { createClient, Vote, Proposal, Choice } from "hedsvote";
import { WalletClient } from "viem";
import axios from "axios";

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

const { castVote, getProposal, getAllProposalsInSpace, getAllSpaces } = createClient();

export const castUserVote = async ({
  vote,
  account,
}: {
  vote: Vote;
  account: WalletClient;
}) => {
  try {
    await castVote(account, vote);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const getProposalById = async (id: string) => {
  try {
    const proposal = await getProposal(id);
    return proposal.data || undefined;
  } catch (error) {
    console.log(error);
  }
};


export async function getProposals(space: string) {
  try {
    const proposals = await getAllProposalsInSpace(space);
    // console.log(proposals.data)
  return proposals.data || undefined;
  } catch (e) {
    console.log(e)
  }
}

export async function getSpaceData(spaceName: string) {
  const spaces = await getAllSpaces();
  const space = spaces.data.find(space => space.name === spaceName);
  return space || null;
}

export async function getHedsTapeTracks(choices: Choice[]) {
  const songsQuery = choices.map(choice => choice.media?.slice(choice.media.lastIndexOf("/") + 1)).join(',');
  try {
  const res = await axios.get(`https://us-central1-heds-104d8.cloudfunctions.net/api/songs/many-songs`,{
    params: {
      songHashes: songsQuery
    }});
  const songs = res.data;
  const updatedChoices = choices.map(choice => {
    const isPublicTrack = songs.some((song: any) => song.audio === choice.media && song.public);
    return {
      ...choice,
      isPublic: isPublicTrack
    }
  })
  return updatedChoices;
  } catch (e) {
    console.log(e)
  }
}

// const prisma = new PrismaClient();

// export async function getuserData(user: `0x${string}`) {
//   try {
//     const userProfileData = await prisma.users.findUnique({
//       where: {
//         wallet: user.toLowerCase(),
//       },
//     });
//     await prisma.$disconnect();
//     return userProfileData;
//   } catch (e) {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// }

// export async function getDisplayNameForAuthors(proposals: Proposal[] | undefined) {
//   const displayNames: {[author:string]: string} = {};
//   if (!proposals) return;
//   for (const proposal of proposals) {
//     const author = proposal.author;
//     try {
//       const authorRecord = await prisma.users.findUnique({
//         where: {
//           wallet: author.toLowerCase(),
//         },
//         select: {
//           display_name: true
//         }
//       });
//       if (authorRecord && authorRecord.display_name) {
//         displayNames[author] = authorRecord.display_name;
//       }
//     } catch (e) {
//       console.error(e);
//       process.exit(1);
//     } finally {
//       await prisma.$disconnect();
//     }
//   }
//   return displayNames;
// }
