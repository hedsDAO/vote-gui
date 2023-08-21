export interface SortedChoice {
  id: number;
  proposal_id: string;
  image: string;
  wallet_id: string;
  artist: string;
  name: string;
  location: string;
  media: string;
  score: number;
}

export interface CurrentSongProps {
  media: string;
  sound: Howl | null;
  percentage: number;
  isLoading: boolean;
  isPlaying: boolean;
}

export interface VoterUserData {
  [voter: string]: {
    displayName: string;
    profilePicture: string;
  };
}
