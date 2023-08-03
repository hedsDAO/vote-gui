import { createClient } from "hedsvote";
import Image from "next/image";
import { getTapeByProposalId } from "../../utils/prismaUtils";

async function getProposal(id: string) {
  const { getProposal } = createClient();
  const proposal = await getProposal(id);
  if (!proposal) {
    throw new Error("no proposal");
  }
  return proposal.data;
}

// async function getTapeById(id: string) {
//   const res = await fetch(
//     `https://us-central1-heds-104d8.cloudfunctions.net/api/tapes/${id}`
//   );
//   const data = await res.json();
//   return data;
// }

export default async function Page({ params }: { params: { id: string } }) {
  // const proposal = await getProposal(params.id);
  const proposalResult = await getProposal(
    "bafkreib2bcrtnfdfaraavbulu2truljn5qrzyi4r3prth2zxf4mjw3z76e"
  );
  
  const tapeDataResult = getTapeByProposalId("bafkreib2bcrtnfdfaraavbulu2truljn5qrzyi4r3prth2zxf4mjw3z76e");

  //Load proposal and tapeData in parallel
 const [proposal, tapeData] = await Promise.all([proposalResult, tapeDataResult]);


  const scores = proposal.scores || [];

  const totalScore =
    scores.reduce((acc: number, score: number) => acc + score, 0) || 0;

  const choicesWithScores = proposal.choices.map((choice, idx) => {
    const scorePercentage = (scores[idx] / totalScore) * 100;
    const roundedPercentage =
      Math.round((scorePercentage + Number.EPSILON) * 1000) / 1000;
    return { ...choice, score: roundedPercentage };
  });

  const sortedChoicesWithScores = choicesWithScores.sort(
    (a, b) => b.score - a.score
  );

  return (
    <div className="h-screen p-12">
      <div className="flex w-4/5 flex-row">
        <div className="flex flex-col">
          <p className="text-5xl tracking-widest">{proposal.title}</p>
          <p className="text-sm font-light tracking-wide">{proposal.author}</p>
        </div>
        <p>{proposal.description}</p>
      </div>
      <div className="flex flex-row">
        <div className="h-fit w-4/5">
          <p>SUBMISSIONS</p>
          <div className="flex flex-wrap">
            {sortedChoicesWithScores &&
              sortedChoicesWithScores.map((choice) => (
                <div
                  className="m-0.5 flex w-64 flex-row rounded-lg border border-white"
                  key={choice.id}>
                  <div className="flex items-center p-2">
                    {choice.image && <Image
                      alt="Choice cover image"
                      className="rounded-md"
                      src={choice.image}
                      width={75}
                      height={75}
                      />
                    }
                  </div>
                  <div className="w-full py-2 pl-2 pr-4">
                    <p className="text-xs">{choice.name}</p>
                    <div className="flex flex-row justify-between">
                      <p className="text-xs">{choice.artist}</p>
                      <p className="text-xs">{choice.score.toFixed(2)}%</p>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: choice.score }}></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-1/5">
          RESULTS
          <div className="rounded-md border p-4 text-center">
            <p>Voting is now closed</p>
          </div>
          <div className="flex h-96 flex-col overflow-scroll rounded-md border p-2">
            {proposal.votes &&
              proposal.votes.map((vote) => (
                <div
                  className="flex flex-row justify-between rounded-lg border border-white p-4"
                  key={vote.voter}>
                  <p className="text-xs">{vote.voter.slice(0, 10)}</p>
                  <p className="text-xs">{vote.vp}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
