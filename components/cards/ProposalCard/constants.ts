export const calculateVotingStatusText = (votingStatus?: "upcoming" | "open" | "closed" | null) => {
  switch (votingStatus) {
    case "upcoming":
      return "OPENS";
    case "open":
      return "OPEN";
    case "closed":
      return "ENDED";
    default: // null
  }
};
