export const getUserVotePercentages = (proposal: any, address: any) => {
  const userVote = proposal?.votes?.find(
    (vote: any) => vote?.voter?.toLowerCase() === address?.toLowerCase()
  );
  const totalAllottedVotes = userVote?.vote_choices?.reduce(
    (a: any, b: any) => {
      return a + b?.amount;
    },
    0
  );
  const userVotePercentages = userVote?.vote_choices?.map((vote: any) => {
    return {
      ...vote,
      percentage: vote?.amount / totalAllottedVotes,
    };
  });
  return userVotePercentages;
};
