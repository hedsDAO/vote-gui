import { createClient } from "hedsvote";
import { Typography, Flex } from "@/common";
import * as styles from "@/app/[space]/_components/SpaceNavbar/styles";
import * as constants from "@/app/[space]/_components/SpaceNavbar/constants";
import CreateProposalButton from "@/components/buttons/CreateProposalButton/CreateProposalButton";

const { getAllSpaces } = createClient();

async function getSpaceData(name: string) {
  const spaces = await getAllSpaces();
  const spaceData = spaces.data.find((space) => space.name === name);
  return spaceData;
}

const SpaceNavbar = async ({ slug }: { slug: string }) => {
  const space = await getSpaceData(slug);
  return (
    <Flex {...styles.$parentFlexStyles}>
      <Typography {...styles.$proposalHeaderTextStyles}>{constants.PROPOSAL_HEADER_TEXT}</Typography>
      <CreateProposalButton slug={slug} admins={space?.authors} />
    </Flex>
  );
};

export default SpaceNavbar;
