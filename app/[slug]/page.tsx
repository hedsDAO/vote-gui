// "use client";

import { createClient, Proposal, SpaceData } from "hedsvote";
import { getSpaceData, getDisplayNameForAuthors, getProposals } from "../_actions";
import { useEffect, useState } from "react";
import Header from "@/components/Space/Header";
import ProfilePicture from "@/components/Space/ProfilePicture";
import Details from "@/components/Space/Details";
import Socials from "@/components/Space/Socials";
import { getVotingStatus } from "../utils/getVotingStatus";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DisplayName {
  [author: string]: string;
}

const Page =  async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  // const router = useRouter();
  // const [proposals, setProposals] = useState<any[] | null>(null);
  // const [space, setSpace] = useState<SpaceData | null>(null);
  // const [displayNames, setDisplayNames] = useState<DisplayName | null>(null);

  const space = await getSpaceData(slug);
  const proposals: any[] | undefined = await getProposals(slug);


  // const loadSpaceData = async () => {
  //   const space = await getSpaceData(slug);
  //   const proposals: Proposal[] | undefined = await getProposals(slug);
  //   const displayNames = await getDisplayNameForAuthors(proposals || undefined);
  //   console.log(proposals);
  //   setProposals(proposals || []);
  //   setSpace(space);
  //   setDisplayNames(displayNames || {});
  // };

  // useEffect(() => {
  //   loadSpaceData();
  // }, []);

  // const getProposals = async (space: string) => {
  //   try {
  //     const proposals = await createClient().getAllProposalsInSpace(space);
  //     console.log(proposals.data);
  //     return proposals.data || undefined;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className="min-h-[80vh]">
      <Header src={space?.banner} />
      <ProfilePicture src={space?.image} />
      <Details title={space?.name} description={space?.description} />
      <Socials
        instagram={space?.instagram}
        twitter={space?.twitter}
        discord={space?.discord}
        soundcloud={space?.soundcloud}
      />
      <div className="mx-auto mt-10 flex max-w-4xl justify-start px-10">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="font-inter text-2xl font-bold text-black">
              PROPOSALS
            </p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-4">
            {proposals?.length &&
              proposals.map((proposal, idx) => {
                const votingStatus = getVotingStatus(
                  proposal?.start_time,
                  proposal?.end_time
                );
                return (
                  <div
                    role="button"
                    // onClick={() => {
                    //   router.push(`${slug}/${proposal.ipfs_hash}`);
                    // }}
                    key={proposal.author + idx}
                    className="col-span-1 flex w-full flex-col items-center gap-5 rounded-2xl border border-black px-4 py-4 shadow-sm"
                  >
                    <div className="mb-2 flex w-fit items-center self-start rounded-full border border-black p-0.5">
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
                      src={proposal.cover || ""}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="rounded-full border border-black"
                      style={{
                        width: "50%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                    <div className="mt-2 flex flex-col items-center">
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
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
