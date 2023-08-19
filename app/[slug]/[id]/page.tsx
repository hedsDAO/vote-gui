import { getProposalById } from "@/app/_actions";
import Image from "next/image";
import Details from "./Details";
import ChoiceCards from "./ChoiceCards";
import Link from "next/link";
import { QuadraticVote, SingleChoiceVote } from "hedsvote";
import axios from "axios";
import Ballot from "@/app/[slug]/[id]/Ballot";
import { getVotingStatus } from "@/utils/getVotingStatus";
// import { useContext } from "react";
// import { ProposalContext } from "@/context/proposal.context";

interface ProposalProps {
  params: { slug: string; id: string };
}

async function getAuthorDisplayName(author: string) {
  if (author?.length > 0) {
    const wallet = author.toLowerCase();
    try {
      const user = await axios.get(
        `https://us-central1-heds-104d8.cloudfunctions.net/api/users/${wallet}`
      );
      return user.data.display_name;
    } catch (e: any) {
      throw new Error(e);
    }
  } else return;
}

async function getParticipantsUserData(
  votes: QuadraticVote[] | SingleChoiceVote[] | undefined
) {
  if (!votes) return;
  const voterUserData: {
    [voter: string]: { displayName: string; profilePicture: string };
  } = {};
  try {
    for (const vote of votes) {
      const voter = vote.voter.toLowerCase();
      const user = await axios.get(
        `https://us-central1-heds-104d8.cloudfunctions.net/api/users/${voter}`
      );
      if (user.data) {
        voterUserData[voter] = {
          displayName: user.data.display_name,
          profilePicture: user.data.profile_picture,
        };
      }
    }
    return voterUserData;
  } catch (e: any) {
    throw new Error(e);
  }
}
export default async function Page({ params }: ProposalProps) {
  const { slug, id } = params;
  // const { state, dispatch } = useContext(ProposalContext);
  const proposal: any | undefined = await getProposalById(id);
  const authorDisplayName = await getAuthorDisplayName(proposal?.author);
  const voterUserData = await getParticipantsUserData(proposal?.votes);
  const votingStatus = getVotingStatus(
    proposal?.start_time,
    proposal?.end_time
  );

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

  console.log(totalScore, "sorted");

  return (
    <div className="flex min-h-[82vh] max-w-5xl flex-col px-4 lg:mx-auto">
      <div className="flex justify-between lg:mt-10">
        <div className="mt-5 flex flex-col gap-5">
          <Link href={`/${slug}`}>
            <div className="pointer-events-auto flex items-center gap-4 lg:-ml-8">
              <Image
                alt="back"
                src={"/icons/arrow-left.svg"}
                width={14}
                height={14}
              />
              <p className="-mt-[1px] font-space-grotesk text-black/70 transition-all hover:text-black">
                space
              </p>
            </div>
          </Link>
          <div className="mx-auto inline-block lg:hidden">
            <Image
              alt={"cover"}
              src={proposal?.cover}
              width={0}
              height={0}
              sizes="100vw"
              className="aspect-square rounded-full border-4 border-heds-bg-red object-cover"
              style={{ height: "100%", width: "auto", objectFit: "cover" }}
            />
          </div>
          {authorDisplayName && (
            <Details
              description={proposal.description}
              voterUserData={voterUserData}
              displayName={authorDisplayName}
              proposal={proposal}
            />
          )}
        </div>
        <div className="hidden aspect-square max-h-[150px] min-h-[150px] min-w-[150px] max-w-[150px] lg:inline-block lg:max-h-[250px]  lg:min-h-[250px] lg:min-w-[250px] lg:max-w-[250px]">
          <Image
            alt={"cover"}
            src={proposal?.cover}
            width={0}
            height={0}
            sizes="100vw"
            className="aspect-square rounded-full border-4 border-heds-bg-red object-cover"
            style={{ height: "100%", width: "auto", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="my-8 flex flex-col lg:max-w-4xl lg:items-start">
        <div className="flex w-full items-center justify-between pb-3">
          <p className="font-inter text-base font-semibold tracking-wide text-black/80">
            CHOICES
          </p>
          {votingStatus === "open" ? (
            <Ballot
              choices={proposal?.choices}
              strategies={proposal?.strategies}
              proposalId={proposal?.ipfs_hash}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="mb-4 grid w-full grid-cols-1 gap-4 lg:w-[100%] lg:grid-cols-2">
          <ChoiceCards
            totalScore={totalScore}
            sortedChoicesWithScores={sortedChoicesWithScores}
            votingStatus={votingStatus}
            type={proposal.choiceType}
            choices={proposal?.choices}
          />
        </div>
      </div>
    </div>
  );
}
