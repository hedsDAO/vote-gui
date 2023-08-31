import { Flex } from "@/common";
import { Spinner } from "@/common/Icons";
import * as styles from "@/app/[space]/_components/Loading/styles";

const Loading = () => {
  const spinnerClassName = "animate-spin invert-0";
  return (
    <Flex {...styles.$loadingFlexContainerStyles}>
      <Spinner className={spinnerClassName} width={50} height={50} />
    </Flex>
  );
};

export default Loading;
