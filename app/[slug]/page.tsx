import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { createClient, Proposal } from "hedsvote";
import ProposalCard from "@/components/ProposalCard";

const { getAllProposalsInSpace, getAllSpaces } = createClient();

const prisma = new PrismaClient();

async function getProposals(space: string) {
  const proposals = await getAllProposalsInSpace(space);
  if (!proposals) {
    throw new Error("no proposals");
  }
  return proposals.data;
}

async function getSpaceData(spaceName: string) {
  const spaces = await getAllSpaces();
  const space = spaces.data.find(space => space.name === spaceName);
  return space || null;
}

async function getDisplayNameForAuthors(proposals: Proposal[]) {
  const displayNames: {[author:string]: string} = {};
  for (const proposal of proposals) {
    const author = proposal.author;
    try {
      const authorRecord = await prisma.users.findUnique({
        where: {
          wallet: author.toLowerCase(),
        },
        select: {
          display_name: true
        }
      });
      if (authorRecord && authorRecord.display_name) {
        displayNames[author] = authorRecord.display_name; // Corrected line
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }
  return displayNames;
}


export default async function Page({ params }: { params: { slug: string } }) {
  const {slug} = params;
  const proposals = await getProposals(slug);
  const space = await getSpaceData(slug);
  const displayNames = await getDisplayNameForAuthors(proposals);

  return (
    <div className="h-full text-[#2D2934]">
      <div className="h-44 border bg-red-500"></div>
      <div className="mx-auto flex w-3/4 flex-col gap-y-6 p-12">
        <Link href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#2D2934"
            viewBox="0 0 256 256"
            className="inline-block">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
          <p className="inline-block">Back</p>
        </Link>
        <div className="right-64 top-32 lg:absolute">
          <Image
            className="rounded-full border-4 border-blue-400"
            src={space?.image || ""}
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
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256">
            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256">
            <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
          </svg>
        </div>
        <div className="mt-12 flex flex-row justify-between">
          <h1 className="text-4xl font-semibold">PROPOSALS</h1>
          <p>+ create</p>
        </div>
        <div className="flex h-fit flex-wrap justify-between">
          {proposals.map((proposal) => (
            <ProposalCard
              link={`/${slug}/${proposal.ipfs_hash}`}
              key={proposal.ipfs_hash}
              id={proposal.ipfs_hash}
              name={proposal.title}
              image={proposal.cover || ""}
              author={displayNames[proposal.author]}
              timeline={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
