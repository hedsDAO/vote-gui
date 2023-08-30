import { Flex } from "@/common";
import SpaceDetails from "./_components/SpaceDetails/SpaceDetails";
import { Suspense } from "react";
import Loading from "./_components/Loading/Loading";
import Proposals from "./_components/Proposals/Proposals";
import * as styles from "@/app/[space]/styles";

const Space = ({ params }: { params: { space: string } }) => {
  const { space: slug } = params;

  return (
    <Flex {...styles.$spaceDetailsParentFlexStyles}>
      <Suspense fallback={<Loading />}>
        <SpaceDetails slug={slug} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Proposals slug={slug} />
      </Suspense>
    </Flex>
  );
};

export default Space;
