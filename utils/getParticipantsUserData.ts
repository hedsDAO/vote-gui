import axios from "axios";
import { QuadraticVote, SingleChoiceVote } from "hedsvote";

export async function getParticipantsUserData(
  votes: QuadraticVote[] | SingleChoiceVote[] | undefined
) {
  if (!votes) return;
  const voterUserData: {
    [voter: string]: { displayName: string; profilePicture: string };
  } = {};
  try {
    for (const vote of votes) {
      const voter = vote.voter.toLowerCase();
      const user = await axios.get(
        `https://us-central1-heds-104d8.cloudfunctions.net/api/users/${voter}`
      );
      if (user.data) {
        voterUserData[voter] = {
          displayName: user.data.display_name,
          profilePicture: user.data.profile_picture,
        };
      }
    }
    return voterUserData;
  } catch (e: any) {
    throw new Error(e);
    return;
  }
}
