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
  const mockProposals = [
    {
      id: 1,
      image:
        "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT",
      name: "hedstape 16",
      created_by: "heds",
      timeline: "OPEN",
    },
    {
      id: 2,
      image:
        "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT",
      name: "reflections",
      created_by: "daniel allen",
      timeline: "OPEN",
    },
    {
      id: 3,
      image:
        "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT",
      name: "high frequency",
      created_by: "noise",
      timeline: "OPEN",
    },
    {
      id: 4,
      image:
        "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT",
      name: "heds solo",
      created_by: "heds",
      timeline: "CLOSED",
    },
  ];

  console.log("proposals", proposals);
  console.log("allTapes", allTapes);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-2/3 p-12">
        <div className="flex flex-row items-center justify-between">
          <p className="text-8xl font-bold">VOTING FOR</p>
          <Link href="/create-proposal">
            <div className="relative w-80">
              <button className="flex items-center rounded-full border-2 bg-transparent px-6 py-4 font-light text-white hover:bg-blue-600">
                <span className="mr-10">CREATE A PROPOSAL</span>
              </button>
              <div className="absolute right-0 top-1/2 flex h-10 w-28 -translate-y-1/2 transform items-center justify-center rounded-full bg-white transition-all duration-300">
                <span className="text-lg text-blue-500">&#8594;</span>
              </div>
            </div>
          </Link>
        </div>
        <p className="mt-4 text-right text-8xl font-bold">THE MASSES</p>
        <div className="float-right mt-6 w-1/2">
          <p className="text-right text-white">
            Enhance Your Experience: Vote and Influence Your Favorite Tunes with
            Our Cutting-Edge Media Voting Protocol
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center bg-zinc-50">
        <div className="w-2/3 p-12">
          <Link href="/proposals">
            <p className="text-4xl text-[#2D2934]">ALL PROPOSALS</p>
          </Link>
          <div className="flex flex-row justify-between">
            {mockProposals &&
              mockProposals.map((proposal) => (
                // <div className="border-2 rounded-md" key={proposal.ipfs_hash}>
                //   <Link href={`/proposals/${proposal.ipfs_hash}`}>
                //     <p>{proposal.title}</p>
                //   </Link>
                // </div>

                <div
                  className="mt-8 box-border flex w-56 flex-col items-center justify-between rounded-2xl border-4 border-black p-4"
                  key={proposal.id}>
                  <div className="fit-content self-start rounded-2xl border-2	border-black px-3 text-center text-black">
                    {proposal.timeline}
                  </div>
                  <Image
                    className="rounded-full border-2 border-black"
                    alt="Proposal cover image"
                    src={proposal.image}
                    width={75}
                    height={75}
                  />
                  <p className="font-mono text-black">{proposal.name}</p>
                  <p className="text-black">CREATED BY</p>
                  <p className="text-black">{proposal.created_by}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-2/3 p-12">
        <p className="text-4xl text-white">YOU VOTED ON</p>
      </div>
    </main>
  );
}
