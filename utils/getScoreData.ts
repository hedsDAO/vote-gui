export const getScoreData = (proposal: any) => {
  if (proposal?.scores) {
    const scores = proposal.scores || [];
    const totalScore =
      scores.reduce((acc: number, score: number) => acc + score, 0) || 0;
    const choicesWithScores = proposal.choices.map((choice: any, idx: any) => {
      const scorePercentage = (scores[idx] / totalScore) * 100;
      const roundedPercentage =
        Math.round((scorePercentage + Number.EPSILON) * 1000) / 1000;
      return { ...choice, score: roundedPercentage };
    });

    const sortedChoicesWithScores = choicesWithScores.sort(
      (a: any, b: any) => b.score - a.score
    );
    return { totalScore, sortedChoicesWithScores };
  } else return { totalScore: 0, sortedChoicesWithScores: [] };
};
