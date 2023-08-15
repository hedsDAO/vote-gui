import { createClient } from "hedsvote";
import Image from "next/image";
import { getTapeByProposalId } from "../../utils/prismaUtils";
import { DateTime } from "luxon";
import Link from "next/link";
import Image from "next/image";
import OptionCard from "./OptionCard";
import LikedSubmissions from "./LikedSubmissions";
import FinalSelection from "./FinalSelection";

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
  const proposal = await getProposal(params.id);
  // const proposal = await getProposal(
  //   "bafkreib2bcrtnfdfaraavbulu2truljn5qrzyi4r3prth2zxf4mjw3z76e"
  // );

  const scores = proposal.scores || [];

  const totalScore =
    scores.reduce((acc: number, score: number) => acc + score, 0) || 0;
  // const proposal = await getProposal(params.id);
  const proposalResult = await getProposal(
    "bafkreib2bcrtnfdfaraavbulu2truljn5qrzyi4r3prth2zxf4mjw3z76e"
  );

  const tapeDataResult = getTapeByProposalId(
    "bafkreib2bcrtnfdfaraavbulu2truljn5qrzyi4r3prth2zxf4mjw3z76e"
  );

  //Load proposal and tapeData in parallel
  //  const [proposal, tapeData] = await Promise.all([proposalResult, tapeDataResult]);

  const choicesWithScores = proposal.choices.map((choice, idx) => {
    const scorePercentage = (scores[idx] / totalScore) * 100;
    const roundedPercentage =
      Math.round((scorePercentage + Number.EPSILON) * 1000) / 1000;
    return { ...choice, score: roundedPercentage };
  });

  const sortedChoicesWithScores = choicesWithScores.sort(
    (a, b) => b.score - a.score
  );

  const formatTime = (time: string) => {
    const dateObj = DateTime.fromISO(time);
    const date = dateObj.toLocaleString({
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    return date;
  };

  return (
    <div className="h-full bg-zinc-50 p-12 text-[#2D2934]">
      <Link href={"/spaces"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#2D2934"
          viewBox="0 0 256 256"
          className="inline-block">
          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
        </svg>
        <p className="inline-block">SPACE</p>
      </Link>

      <div className="mx-auto flex w-3/4 flex-col-reverse py-12 lg:flex-row">
        <div className="flex w-full flex-col gap-y-6 lg:w-4/5">
          <p className="text-3xl font-light tracking-widest">
            {proposal.title}
          </p>
          <div>
            <p className="text-xs font-medium">CREATED BY</p>
            <p className="text-sm font-light tracking-wide">
              {proposal.author}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">DESCRIPTION</p>
            <p className="text-sm font-light tracking-wide">
              {proposal.description}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">REQUIRED TO VOTE</p>
            <p className="text-sm font-light tracking-wide">
              Participants in this vote must hold at least one token from the
              following contracts. Click here to check eligibility.
            </p>
          </div>

          <div className="flex flex-row gap-x-10">
            <div>
              <p className="text-xs font-medium">START TIME</p>
              <p className="text-sm font-light tracking-wide">
                {formatTime(proposal.start_time)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium">END TIME</p>
              <p className="text-sm font-light tracking-wide">
                {formatTime(proposal.end_time)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <Image
            className="rounded-full border-4 border-red-300 drop-shadow-lg"
            src="https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT"
            alt="Picture of the author"
            width={200}
            height={200}
          />
        </div>
      </div>

      <div className="mx-auto flex w-3/4 flex-col-reverse lg:flex-row">
        <div className="h-full w-full md:w-full lg:w-2/3">
          <p className="pb-4 text-xs font-medium">OPTIONS</p>
          <div className="grid md:grid-cols-1 md:gap-2 lg:grid-cols-2 lg:gap-3">
            {proposal.choices &&
              proposal.choices.map((choice) => (
                <OptionCard key={choice.id} choice={choice} />
              ))}
          </div>
        </div>
        <div className="mx-auto w-full lg:w-1/4">
          {/* <LikedSubmissions id={params.id} proposal={proposal} /> */}
          <FinalSelection choices={sortedChoicesWithScores} />
        </div>
      </div>
    </div>
  );
}
