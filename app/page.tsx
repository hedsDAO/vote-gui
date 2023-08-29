import { Flex } from "@/common";
import Header from "@/app/_components/Header/Header";
import Spaces from "@/app/_components/Spaces/Spaces";
import * as styles from "@/app/styles";

export default function Home() {
  return (
    <Flex {...styles.$flexContainerStyles}>
      <Header />
      <Spaces />
    </Flex>
  );
}
