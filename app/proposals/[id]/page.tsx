import { createClient } from "hedsvote";

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
  return (
    <div className="p-12">
      <h1>Proposal Details</h1>
      {proposal && (
        <div>
          <p>{proposal.title}</p>
          <p>{proposal.description}</p>
        </div>
      )}
    </div>
  );
}
