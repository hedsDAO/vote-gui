import { createClient } from "hedsvote";
import { DateTime } from "luxon";

import Image from "next/image";

async function getProposal(id: string) {
  const { getProposal } = createClient();
  const proposal = await getProposal(id);
  if (!proposal) {
    throw new Error("no proposal");
  }
  return proposal.data;
}

async function getTapeById(id: string) {
  const res = await fetch(
    `https://us-central1-heds-104d8.cloudfunctions.net/api/tapes/${id}`
  );
  const data = await res.json();
  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  // const proposal = await getProposal(params.id);
  const proposal = await getProposal(
    "bafkreib2bcrtnfdfaraavbulu2truljn5qrzyi4r3prth2zxf4mjw3z76e"
  );

  console.log("proposal*****", proposal);

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

  const formatTime = (time: number) => {
    if (time !== 0) {
      const dateObj = DateTime.fromMillis(time);
      const date = dateObj.toLocaleString({
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
      return date;
    }
  };

  return (
    <div className="h-screen p-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="#FFFFFF"
        viewBox="0 0 256 256"
        className="inline-block">
        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
      </svg>
      <p className="inline-block">PROPOSALS</p>

      <div className="mx-auto w-10/12 py-12">
        <div className="flex w-4/5 flex-col">
          <p className="text-3xl font-light tracking-widest">
            {proposal.title}
          </p>
          <p className="text-sm">CREATED BY</p>
          <p className="text-md font-light tracking-wide">{proposal.author}</p>
          <p className="text-sm">DESCRIPTION</p>
          <p className="text-md font-light tracking-wide">
            {proposal.description}
          </p>
          <p className="text-sm">REQUIRED TO VOTE</p>
          <p className="text-md font-light tracking-wide">
            Participants in this vote must hold at least one token from the
            following contracts. Click here to check eligibility.
          </p>
          <p className="text-sm">START TIME</p>
          <p className="text-md font-light tracking-wide">
            {DateTime.fromISO(proposal.start_time)}
          </p>
          <p className="text-sm">END TIME</p>
          <p className="text-sm">OPTIONS</p>
          <div className="grid grid-cols-2 gap-3">
            {proposal.choices &&
              proposal.choices.map((choice) => (
                <div
                  className="flex flex-row rounded-lg border px-2 py-3"
                  key={choice.id}>
                  <Image
                    alt="Choice cover image"
                    className="rounded-md"
                    src={choice.image}
                    width={50}
                    height={50}
                  />
                  <p className="self-center font-mono text-xs">{choice.name}</p>
                </div>
              ))}
          </div>
        </div>

        {/*         
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
                      <Image
                        alt="Choice cover image"
                        className="rounded-md"
                        src={choice.image}
                        width={75}
                        height={75}
                      />
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
        </div> */}
      </div>
    </div>
  );
}
