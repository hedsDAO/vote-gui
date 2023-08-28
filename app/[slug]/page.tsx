import Header from "@/components/Space/Header";
import ProfilePicture from "@/components/Space/ProfilePicture";
import Details from "@/components/Space/Details";
import Socials from "@/components/Space/Socials";
import { getVotingStatus } from "../../utils/getVotingStatus";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "hedsvote";
import CreateProposalButton from "./_buttons/CreateProposal";

const { getAllProposalsInSpace, getAllSpaces } = createClient();

async function getSpaceData(name: string) {
  const spaces = await getAllSpaces();
  const spaceData = spaces.data.find((space) => space.name === name);
  return spaceData;
}

async function getProposals(name: string) {
  const proposals = await getAllProposalsInSpace(name);
  return proposals.data;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const space = await getSpaceData(slug);
  const proposals: any[] | undefined = await getProposals(slug);

  return (
    <div className="min-h-full lg:min-h-[80vh]">
      <Header src={space?.banner} />
      <ProfilePicture src={space?.image} />
      <Details title={space?.name} description={space?.description} />
      <Socials
        instagram={space?.instagram}
        twitter={space?.twitter}
        discord={space?.discord}
        soundcloud={space?.soundcloud}
      />
      <div className="mx-auto mt-10 flex max-w-4xl justify-start px-5 lg:px-10">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="font-inter text-2xl font-bold text-black">
              PROPOSALS
            </p>
          <CreateProposalButton admins={space?.authors} slug={slug}/>
          </div>
          <div className="my-5 grid min-w-[90vw] grid-cols-1 gap-4 pb-5 lg:min-w-full lg:grid-cols-3">
            {proposals?.length &&
              proposals.map((proposal, idx) => {
                const votingStatus = getVotingStatus(
                  proposal?.start_time,
                  proposal?.end_time
                );
                return (
                  <Link
                    href={`${slug}/${proposal?.ipfs_hash}`}
                    key={proposal?.author + idx}
                  >
                    <div className="col-span-1 flex w-full flex-col items-center gap-5 rounded-2xl border border-black bg-black/10 px-4 py-4 shadow-sm transition-all ease-in-out hover:bg-white">
                      <div className="mb-2 flex w-fit items-center self-start rounded-full border border-black bg-white px-[3px] py-0.5">
                        <div
                          className={
                            `${
                              votingStatus === "open"
                                ? "bg-green-500"
                                : votingStatus === "closed"
                                ? "bg-red-500"
                                : "bg-black"
                            } ` +
                            "relative -ml-[0.75px] max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px] rounded-full border border-black"
                          }
                        />
                        <div className="max-h-[20px] rounded-full pl-1.5 pr-3 font-space-grotesk text-xs text-black">
                          {votingStatus}
                        </div>
                      </div>
                      <Image
                        alt={"test"}
                        src={proposal?.cover}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[30%] rounded-full border border-black lg:w-[50%]"
                        style={{
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                      <div className="mt-2 flex flex-col items-center">
                        <p className="-mt-4 mb-4 font-space-grotesk text-xs text-black">
                          {proposal?.title}
                        </p>
                        <h4 className="text-sm font-bold text-black">
                          {votingStatus === "open"
                            ? "ENDS"
                            : votingStatus === "closed"
                            ? "ENDED"
                            : "OPENS"}
                        </h4>
                        <p className="font-space-grotesk text-sm text-black">
                          {new Date(proposal?.end_time).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
