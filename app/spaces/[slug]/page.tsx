import Image from "next/image";
import Link from "next/link";
import { createClient } from "hedsvote";

async function getProposals(space: string) {
  const { getAllProposalsInSpace } = createClient();
  const proposals = await getAllProposalsInSpace(space);
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

export default async function Page({ params }: { params: { slug: string } }) {
  const proposals = await getProposals(params.slug);

  console.log("proposals****", proposals);
  // console.log("tapes", tapes);

  const mockProposals = [
    {
      id: 1,
      image:
        "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT",
      name: "hedstape 16",
      created_by: "heds",
      timeline: "OPEN",
      ipfs: "bafkreiaju7q7vzpug6dlwl3k475jr5hqytgzmpoeqjw3jqnugrbdzacxlq",
    },
    {
      id: 2,
      image:
        "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT",
      name: "reflections",
      created_by: "daniel allen",
      timeline: "OPEN",
      ipfs: "bafkreiaju7q7vzpug6dlwl3k475jr5hqytgzmpoeqjw3jqnugrbdzacxlq",
    },
    {
      id: 3,
      image:
        "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT",
      name: "high frequency",
      created_by: "noise",
      timeline: "OPEN",
      ipfs: "bafkreiaju7q7vzpug6dlwl3k475jr5hqytgzmpoeqjw3jqnugrbdzacxlq",
    },
    {
      id: 4,
      image:
        "https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT",
      name: "heds solo",
      created_by: "heds",
      timeline: "CLOSED",
      ipfs: "bafkreiaju7q7vzpug6dlwl3k475jr5hqytgzmpoeqjw3jqnugrbdzacxlq",
    },
  ];

  return (
    <div className="h-screen bg-zinc-50 text-[#2D2934]">
      <div className="h-44 border bg-red-500"></div>
      <div className="mx-auto flex w-3/4 flex-col gap-y-6 p-12">
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
        <div className="absolute right-64 top-32">
          <Image
            className="rounded-full border-4 border-blue-400"
            src="https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT"
            alt="Picture of the author"
            width={200}
            height={200}
          />
        </div>
        <h1 className="text-6xl">{params.slug}</h1>
        <p className="w-2/3 text-sm font-light tracking-widest">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h1 className="text-md">SOCIALS</h1>
        <div className="mt-12 flex flex-row justify-between">
          <h1 className="text-4xl font-semibold">PROPOSALS</h1>
          <p>+ create</p>
        </div>
        <div className="flex flex-wrap justify-between">
          {mockProposals.map((proposal) => (
            <Link href={`/proposals/${proposal.ipfs}`} key={proposal.id}>
              <div className="mt-8 box-border flex w-56 flex-col items-center justify-between rounded-2xl border-2 border-white bg-[#2D2934] p-4">
                <div className="fit-content self-start rounded-2xl border-2	border-white px-3 text-center text-white">
                  {proposal.timeline}
                </div>
                <Image
                  className="rounded-full border-2 border-white"
                  alt="Proposal cover image"
                  src={proposal.image}
                  width={75}
                  height={75}
                />
                <p className="font-mono text-white">{proposal.name}</p>
                <p className="text-white">CREATED BY</p>
                <p className="text-white">{proposal.created_by}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
