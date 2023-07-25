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

  console.log("proposals", proposals);
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
    <div className="mt-12">
      <h1 className="mx-auto w-2/3 py-8 text-4xl font-bold">Proposals</h1>
      <div className="mx-auto flex w-2/3 flex-wrap justify-between">
        {mockProposals.map((proposal) => (
          <Link href={`/proposals/${proposal.ipfs}`} key={proposal.id}>
            <div className="mt-8 box-border flex w-56 flex-col items-center justify-between rounded-2xl border-2 border-white p-4">
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
  );
}
