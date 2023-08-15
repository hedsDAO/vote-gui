"use client";

import Link from "next/link";
import ProposalCard from "@/components/ProposalCard";
import SpaceCard from "@/components/SpaceCard";

import { useAccount } from "wagmi";
import { getuserData } from "./_actions";
import { useEffect, useState } from "react";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (!address) return;
    getuserData(address).then((result) => {
      setUserData(result);
    });
  }, [address]);

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

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#2d2934]">
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
          <Link href="/spaces" className="flex flex-row items-center py-4">
            <p className="text-center text-3xl text-[#2D2934]">
              VIEW ALL SPACES
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256">
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
            </svg>
          </Link>
          <div className="flex flex-row justify-between gap-x-2 overflow-x-scroll">
            {mockProposals &&
              mockProposals.map((proposal) => (
                <SpaceCard
                  key={proposal.id}
                  name={proposal.name}
                  image={proposal.image}
                  author={proposal.created_by}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="w-2/3 p-12">
        <p className="py-4 text-3xl text-white">YOU VOTED ON</p>
        <div className="flex flex-row justify-between">
          {mockProposals &&
            mockProposals.map((proposal) => (
              <ProposalCard
                link={`/proposals/${proposal.ipfs}`}
                key={proposal.id}
                id={proposal.id}
                name={proposal.name}
                image={proposal.image}
                author={proposal.created_by}
                timeline={proposal.timeline}
                $light
              />
            ))}
        </div>
      </div>
    </main>
  );
}
