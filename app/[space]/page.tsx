import { Suspense } from "react";

import { Flex } from "@/common";
import Loading from "./_components/Loading/Loading";
import Proposals from "./_components/Proposals/Proposals";
import SpaceNavbar from "./_components/SpaceNavbar/SpaceNavbar";
import SpaceDetails from "./_components/SpaceDetails/SpaceDetails";
import * as styles from "@/app/[space]/styles";

const Space = ({ params }: { params: { space: string } }) => {
  const { space: slug } = params;
  return (
    <Flex {...styles.$spaceDetailsParentFlexStyles}>
      <Suspense fallback={<Loading />}>
        <SpaceDetails slug={slug} />
      </Suspense>
      <Flex {...styles.$parentSpaceNavbarFlexStyles}>
        <SpaceNavbar slug={slug} />
      </Flex>
      <Suspense fallback={<Loading />}>
        <Proposals slug={slug} />
      </Suspense>
    </Flex>
  );
};

export default Space;
