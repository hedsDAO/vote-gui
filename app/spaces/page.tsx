import Link from "next/link";
import { createClient } from "hedsvote";
import SpaceCard from "@/components/SpaceCard";

async function getSpaces() {
  const { getAllSpaces } = createClient();
  const spaces = await getAllSpaces();
  if (!spaces) {
    throw new Error("no spaces");
  }
  return spaces.data;
}

export default async function Page() {
  // const data = await getSpaces();
  const spaces = [
    { name: "heds" },
    { name: "test" },
    { name: "noise" },
    { name: "nicole" },
  ];

  return (
    <div className="h-screen w-screen overflow-auto bg-zinc-50">
      <div className="mx-auto mt-12 w-2/3">
        <h1 className="py-6 text-2xl font-semibold text-[#2D2934]">
          ALL SPACES
        </h1>
        <Link href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </Link>
        <div className="grid grid-cols-4 grid-rows-3 gap-5 py-6">
          {spaces.map((space) => (
            <SpaceCard
              key={space.name}
              name={space.name}
              image="https://www.heds.cloud/ipfs/QmceLhYvjioGowYT7EMtofiaWt7aYRrPbE4tLn8HjfZpyT"
              author={space.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
