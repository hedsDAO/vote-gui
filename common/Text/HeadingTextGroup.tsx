"use client";

import Flex from "@/common/Layout/Flex";
import { FlexProps } from "@chakra-ui/react";

interface HeadingTextGroupProps extends FlexProps {
  children: [JSX.Element, JSX.Element];
}

const HeadingTextGroup = (props: HeadingTextGroupProps) => {
  let formattedFlexProps = { ...props, children: null };
  return (
    <Flex gap={4} direction={"column"} {...formattedFlexProps}>
      {props.children[0]}
      {props.children[1]}
    </Flex>
  );
};

export default HeadingTextGroup;
