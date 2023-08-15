import Link from "next/link";
import Image from "next/image";
import { createClient } from "hedsvote";

async function getProposals() {
  const { getAllProposalsInSpace } = createClient();
  const proposals = await getAllProposalsInSpace("heds");
  if (!proposals) {
    throw new Error("no proposals");
  }
  return proposals.data;
}

export default async function Page() {
  const proposals = await getProposals();
  // console.log("proposals", proposals);
  return (
    <div className="flex flex-wrap p-12">
      {proposals &&
        proposals.map((proposal) => (
          <Link
            className="p-0.5"
            href={`/proposals/${proposal.ipfs_hash}`}
            key={proposal.ipfs_hash}>
            <div className="flex flex-col items-center justify-between rounded-2xl border-2 border-black p-2">
              <Image
                alt="Proposal cover image"
                className="rounded-md"
                src={
                  "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT"
                }
                width={300}
                height={300}
              />
              <p className="text-mono w-full p-1 text-left">{proposal.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
