import { createClient } from "hedsvote";
import Image from "next/image";
import { getTapeByProposalId } from "../../utils/prismaUtils";
import { DateTime } from "luxon";
import Link from "next/link";
import OptionCard from "./OptionCard";

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


  console.log("proposal*****", proposal);

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

      <div className="mx-auto flex w-3/4 flex-row py-12">
        <div className="flex w-4/5 flex-col gap-y-6">
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
        <div className="w-1/4 border">
          <p>image</p>
        </div>
      </div>

      <div className="mx-auto flex w-3/4 flex-row">
        <div className="h-full w-2/3">
          <p className="pb-4 text-xs font-medium">OPTIONS</p>
          <div className="grid grid-cols-2 gap-3">
            {proposal.choices &&
              proposal.choices.map((choice) => (
                <OptionCard key={choice.id} choice={choice} />
              ))}
          </div>
        </div>
        <div className="mx-auto h-full w-1/4 border">
          <p>wallet</p>
        </div>
      </div>
    </div>
  );
}
