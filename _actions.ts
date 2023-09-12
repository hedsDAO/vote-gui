"use server";

import { PrismaClient } from "@prisma/client";
import { createClient, Vote, Proposal, Choice, SingleChoiceVote, QuadraticVote } from "hedsvote";
import { WalletClient } from "viem";
import axios from "axios";

export const pinFileToIpfs = async (formData: FormData) => {
  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      body: formData,
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY || "",
        pinata_secret_api_key: process.env.PINATA_API_SECRET || "",
      },
    });

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

export const castUserVote = async ({ vote, account }: { vote: Vote; account: WalletClient }) => {
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
    console.log(e);
  }
}

export async function getSpaceData(spaceName: string) {
  const spaces = await getAllSpaces();
  const space = spaces.data.find((space) => space.name === spaceName);
  return space || null;
}

export async function getHedsTapeTracks(choices: Choice[]) {
  const songsQuery = choices.map((choice) => choice.media?.slice(choice.media.lastIndexOf("/") + 1)).join(",");
  try {
    const res = await axios.get(`https://us-central1-heds-104d8.cloudfunctions.net/api/songs/many-songs`, {
      params: {
        songHashes: songsQuery,
      },
    });
    const songs = res.data;
    const updatedChoices = choices.map((choice) => {
      const isPublicTrack = songs.some((song: any) => song.audio === choice.media && song.public);
      return {
        ...choice,
        isPublic: isPublicTrack,
      };
    });
    return updatedChoices;
  } catch (e) {
    console.log(e);
  }
}

export async function getVoterData(votes: SingleChoiceVote[] | QuadraticVote[]) {
  const userQuery = votes.map((vote) => vote.voter);
  const res = await axios.get(`https://us-central1-heds-104d8.cloudfunctions.net/api/users/manyUsers`, {
    params: {
      walletIds: userQuery,
    },
  });
  let voterData: {
    [key: string]: {
      display_name: string;
      wallet: string;
      profile_picture: string;
    };
  } = {};
  const users = res.data;
  if (users)
    res.data?.map((user: any) => {
      voterData[user.wallet] = { display_name: user.display_name, wallet: user.wallet, profile_picture: user.profile_picture };
    });
  return voterData;
}

export async function getTapeData(proposal_image: string) {
  const res = await axios.get(`https://us-central1-heds-104d8.cloudfunctions.net/api/tapes/`);
  if (res.data) {
    const filteredTapes = res.data.filter((e: any) => e.image === proposal_image);
    if (filteredTapes?.length) {
      const tape_id = filteredTapes[0]?.id;
      const res = await axios.get(`https://us-central1-heds-104d8.cloudfunctions.net/api/tapes/${tape_id}/songs`);
      if (res.data) {
        const tapeTracks = res.data.filter((track: any) => track?.type === "track");
        return tapeTracks.map((track: any) => track?.submission_data?.sub_id)
      }
    }
  }
}
