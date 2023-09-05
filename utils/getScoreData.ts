export const getScoreData = (proposal: any) => {
  if (proposal?.scores) {
    const scores = proposal.scores || {};
    const choicesWithScores = proposal.choices.map((choice: any, idx: any) => {
      // const scorePercentage = (scores[choice.id] / totalScore) * 100;
      // const roundedPercentage =
      //   Math.round((scorePercentage + Number.EPSILON) * 1000) / 1000;
      return { ...choice, score: scores[choice.id] };
    });

    const sortedChoicesWithScores = choicesWithScores.sort(
      (a: any, b: any) => b.score - a.score
    );
    const totalScore = sortedChoicesWithScores.reduce((acc: number, val: any) => acc + val.score, 0)
    return { totalScore, sortedChoicesWithScores, scores };
  } else return { totalScore: 0, sortedChoicesWithScores: [] };
};