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

async function getAllTapes() {
  const res = await fetch(
    "https://us-central1-heds-104d8.cloudfunctions.net/api/tapes"
  );
  const data = await res.json();
  return data;
}

export default async function Home() {
  const proposals = await getProposals();
  const allTapes = await getAllTapes();
  console.log("proposals", proposals);
  console.log("allTapes", allTapes);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="p-12 w-2/3">
        <div className="flex flex-row justify-between items-center">
          <p className="text-8xl font-bold">VOTING FOR</p>
          <Link href="/create-proposal">
            <div className="relative w-80">
              <button className="flex items-center bg-transparent border-2 hover:bg-blue-600 text-white font-light py-4 px-6 rounded-full">
                <span className="mr-10">CREATE A PROPOSAL</span>
              </button>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full h-10 w-28 flex items-center justify-center transition-all duration-300">
                <span className="text-blue-500 text-lg">&#8594;</span>
              </div>
            </div>
          </Link>
        </div>
        <p className="text-8xl text-right font-bold mt-4">THE MASSES</p>
      </div>
      <div className="flex flex-col items-center bg-zinc-50 w-full text-indigo-900">
        <div className="p-12 w-2/3">
          <Link href="/proposals">
            <p className="text-4xl">ALL PROPOSALS</p>
          </Link>
          {/* <div className="flex flex-row">
            {proposals &&
              proposals.map((proposal) => (
                <div className="border-2 rounded-md" key={proposal.ipfs_hash}>
                  <Link href={`/proposals/${proposal.ipfs_hash}`}>
                    <p>{proposal.title}</p>
                  </Link>
                </div>
              ))}
          </div> */}
        </div>
      </div>
      <div className="p-12 w-2/3">
        <p className="text-4xl text-white">YOU VOTED ON</p>
      </div>
    </main>
  );
}
