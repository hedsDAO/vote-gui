import { ScoreData } from "@/store/proposal";
import { Choice, Proposal } from "hedsvote";

export const sortChoices = (proposal: Proposal | null, scoreData: ScoreData): Choice[] => {
  if (!proposal) return [] as Choice[];
  else if (scoreData && proposal?.choices?.length) {
    const rankingByChoiceId = Object.keys(scoreData).sort((a, b) => scoreData[b].score - scoreData[a].score);
    let choicesByChoiceId: { [key: string]: number } = {};
    proposal?.choices.map((choice: Choice, idx: number) => (choicesByChoiceId[choice.id] = idx));
    const sortedChoices: Choice[] = rankingByChoiceId.map((id: string) => proposal?.choices[choicesByChoiceId[id]]);
    console.log(sortedChoices);
    return sortedChoices;
  }
  return [] as Choice[];
};
