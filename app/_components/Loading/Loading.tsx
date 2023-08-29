import { Flex } from "@/common";
import { Spinner } from "@/common/Icons";
import * as styles from "@/app/_components/Loading/styles";

const Loading = () => {
  return (
    <Flex {...styles.$loadingFlexContainerStyles}>
      <Spinner width={50} height={50} />
    </Flex>
  );
};

export default Loading;
