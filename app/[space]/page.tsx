"use client";

import dynamic from "next/dynamic";
import { Flex } from "@/common";
import SSRProposals from "@/app/[space]/_components/Proposals/SSRProposals";
import SSRSpaceDetails from "@/app/[space]/_components/SpaceDetails/SSRSpaceDetails";
import * as styles from "@/app/[space]/styles";

/**
 * @constant {JSX.Element} Space
 * @param {object} params - The params object contains the space slug of the current space.
 * @description This component is responsible for dynamically rendering the space details and associated SSR/non-SSR components.
 * @returns {JSX.Element} The space page.
 */

const Proposals = dynamic(() => import("./_components/Proposals/Proposals"), { loading: () => <SSRProposals /> });
const SpaceDetails = dynamic(() => import("./_components/SpaceDetails/SpaceDetails"), { loading: () => <SSRSpaceDetails /> });
const StateHydration = dynamic(() => import("./_components/StateHydration/StateHydration"), { ssr: false });

const Space = ({ params }: { params: { space: string } }) => {
  const { space: slug } = params;
  return (
    <Flex {...styles.$spaceDetailsParentFlexStyles}>
      <StateHydration space={slug} />
      <SpaceDetails slug={slug} />
      <Proposals slug={slug} />
    </Flex>
  );
};

export default Space;
