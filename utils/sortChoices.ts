import { ScoreData } from "@/store/proposal";
import { Choice, Proposal } from "@heds-dev/hedsvote";

export const sortChoices = (proposal: Proposal | null, scoreData: ScoreData, chosenTracks?: string[] | null): Choice[] => {
  if (!proposal) return [] as Choice[];
  else if (chosenTracks?.length && scoreData && proposal?.choices?.length) {
    const rankingByChoiceId = Object.keys(scoreData).sort((a, b) => scoreData[b].score - scoreData[a].score);
    let choicesByChoiceId: { [key: string]: number } = {};
    proposal?.choices.map((choice: Choice, idx: number) => (choicesByChoiceId[choice.id] = idx));
    const sortedChoices: Choice[] = rankingByChoiceId.map((id: string) => proposal?.choices[choicesByChoiceId[id]]);
    const secondHalf = sortedChoices.filter((choice) => !chosenTracks.includes(choice.name));
    const firstHalf = sortedChoices.filter((choice) => chosenTracks.includes(choice.name));
    const sortedChosenChoices = [...firstHalf, ...secondHalf];
    return sortedChosenChoices;
  } else if (scoreData && proposal?.choices?.length) {
    const rankingByChoiceId = Object.keys(scoreData).sort((a, b) => scoreData[b].score - scoreData[a].score);
    let choicesByChoiceId: { [key: string]: number } = {};
    proposal?.choices.map((choice: Choice, idx: number) => (choicesByChoiceId[choice.id] = idx));
    const sortedChoices: Choice[] = rankingByChoiceId.map((id: string) => proposal?.choices[choicesByChoiceId[id]]);

    return sortedChoices;
  }
  return [] as Choice[];
};
