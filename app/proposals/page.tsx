import Link from "next/link";
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
  return (
    <div className="p-12">
      <h1>All proposals</h1>
      <div className="grid gap-2 grid-cols-6">
        {proposals &&
          proposals.map((proposal) => (
            <div className="border-2 rounded-md" key={proposal.ipfs_hash}>
              <Link href={`/proposals/${proposal.ipfs_hash}`}>
                <p>{proposal.title}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
