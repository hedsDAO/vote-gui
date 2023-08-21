import axios from "axios";

export async function getAuthorDisplayName(author: string) {
  if (author?.length > 0) {
    const wallet = author.toLowerCase();
    try {
      const user = await axios.get(
        `https://us-central1-heds-104d8.cloudfunctions.net/api/users/${wallet}`
      );
      return user.data.display_name;
    } catch (e: any) {
      throw new Error(e);
    }
  } else return;
}
