import { Choice } from "hedsvote";

interface ChoiceWithScore extends Choice {
  score: number;
}

const FinalSelection = ({ choices }: { choices: ChoiceWithScore[] }) => {
  return (
    <>
      <p className="text-sm font-light tracking-widest">FINAL SELECTION</p>
      <div className="flex h-72 w-72 flex-col justify-items-center gap-y-1.5 overflow-y-scroll rounded-md border bg-[#EAEAEA] px-4 py-6 drop-shadow-lg">
        {choices.map((choice) => {
          const scorePercentage = "w-[" + choice.score + "%]";
          // console.log("scorePercentage", scorePercentage);
          return (
            <div
              className="h-10 w-full rounded-lg bg-[#505050]"
              key={choice.id}>
              <div
                className={`h-10 ${scorePercentage} rounded-l-lg bg-[#AFAFAF]`}>
                <p className="font-space px-4 align-middle text-xs leading-10 text-white">
                  {choice.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FinalSelection;
