import { createClient } from "hedsvote";
import Image from "next/image";

async function getProposal(id: string) {
  const { getProposal } = createClient();
  const proposal = await getProposal(id);
  if (!proposal) {
    throw new Error("no proposal");
  }
  return proposal.data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const proposal = await getProposal(params.id);
  console.log("proposal", proposal);

  return (
    <div className="p-12">
      <div className="flex w-4/5 flex-row">
        <div className="flex flex-col">
          <p className="text-5xl tracking-widest">{proposal.title}</p>
          <p className="text-sm font-light tracking-wide">{proposal.author}</p>
        </div>
        <p>{proposal.description}</p>
      </div>

      <div className="flex flex-row">
        <div className="flex w-4/5 flex-wrap">
          {proposal.choices &&
            proposal.choices.map((choice) => (
              <div
                className="m-0.5 flex w-64 flex-row rounded-lg border border-white"
                key={choice.id}>
                <div className="flex items-center p-2">
                  <Image
                    alt="Choice cover image"
                    className="rounded-md"
                    src={choice.image}
                    width={75}
                    height={75}
                  />
                </div>
                <div className="w-full py-2 pl-2 pr-4">
                  <p className="text-xs">{choice.name}</p>
                  <div className="flex flex-row justify-between">
                    <p className="text-xs">{choice.artist}</p>
                    <p className="text-xs">5%</p>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2.5 rounded-full bg-blue-600"
                      style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex w-1/5 flex-col">
          {proposal.votes &&
            proposal.votes.map((vote) => (
              <div
                className="flex flex-row justify-between rounded-lg border border-white"
                key={vote.voter}>
                <p className="text-xs">{vote.voter.slice(0, 10)}</p>
                <p className="text-xs">{vote.vp}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
