import axios from "axios";
import { Vote } from "@heds-dev/hedsvote";

export async function getParticipantsUserData(
  votes: Vote[] | undefined
) {
  if (!votes) return;
  const voterUserData: {
    [voter: string]: { displayName: string; profilePicture: string, wallet?: string };
  } = {};
  try {
    const userIds = votes.map(vote => vote.voter).join(',');
    const response = await axios.get(`https://user-v6adscuyxq-uc.a.run.app/many-users`, { params: userIds});
    const repsonseData = response.data
    for (const user of repsonseData) {
      if (user) {
        voterUserData[user.id] = {
          displayName: user.display_name,
          profilePicture: user.profile_picture,
          wallet: user.wallet
        };
      }
    }
    return voterUserData;
  } catch (e: any) {
    throw new Error(e);
    return;
  }
}
