"use client";

import dynamic from "next/dynamic";
import { Flex } from "@/common";
import SSRProposals from "@/app/[space]/_components/Proposals/SSRProposals";
import SSRSpaceDetails from "@/app/[space]/_components/SpaceDetails/SSRSpaceDetails";
import * as styles from "@/app/[space]/styles";

const Proposals = dynamic(() => import("./_components/Proposals/Proposals"), { loading: () => <SSRProposals /> });
const SpaceDetails = dynamic(() => import("./_components/SpaceDetails/SpaceDetails"), { loading: () => <SSRSpaceDetails /> });

const Space = ({ params }: { params: { space: string } }) => {
  const { space: slug } = params;
  return (
    <Flex {...styles.$spaceDetailsParentFlexStyles}>
      <SpaceDetails slug={slug} />
      <Proposals slug={slug} />
    </Flex>
  );
};

export default Space;
