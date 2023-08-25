// import { getProposalById } from "@/app/_actions";
import Image from "next/image";
import Details from "./Details";
import { getVotingStatus } from "@/utils/getVotingStatus";
import { getAuthorDisplayName } from "@/utils/getAuthorDisplayName";
import { getParticipantsUserData } from "@/utils/getParticipantsUserData";
import { getScoreData } from "@/utils/getScoreData";
import Header from "./Header";
import VotingNavbar from "./VotingNavbar";
import { createClient } from "hedsvote";
import DeleteProposalButton from "./_buttons/DeleteProposalButton";

const { getAllProposalsInSpace, getAllSpaces, getProposal } = createClient();

async function getSpaceData(name: string) {
  const spaces = await getAllSpaces();
  const spaceData = spaces.data.find((space) => space.name === name);
  return spaceData;
}
async function getProposalData(id: string) {
  return (await getProposal(id)).data;
}

export default async function Page({ params }: any) {
  const { space: slug, id }: { space: string; id: string } = params;
  const space = await getSpaceData(slug);
  const proposal: any | undefined = await getProposalData(id);
  const authorDisplayName = await getAuthorDisplayName(proposal?.author);
  const voterUserData = await getParticipantsUserData(proposal?.votes);
  const { sortedChoicesWithScores, totalScore } = getScoreData(proposal);
  const votingStatus = getVotingStatus(
    proposal?.start_time,
    proposal?.end_time
  );

  return (
    <div className="flex min-h-[82vh] max-w-5xl flex-col  px-4 lg:mx-auto">
      <div className="flex justify-between lg:mt-10">
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex mb-5 min-w-full justify-between">
            {proposal?.cover && <Header space={slug} cover={proposal?.cover} />}
            <DeleteProposalButton proposal={proposal} space={slug} id={id} admins={space?.authors} />
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
      <VotingNavbar
        voterUserData={voterUserData}
        sortedChoicesWithScores={sortedChoicesWithScores}
        proposal={proposal}
        votingStatus={votingStatus}
      />
    </div>
  );
}
