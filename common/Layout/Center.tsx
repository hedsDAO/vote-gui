"use client";
import { Center as ChakraCenter, CenterProps, ButtonProps } from "@chakra-ui/react";

const Center = (props: CenterProps | ButtonProps) => {
  return <ChakraCenter {...props} />;
};

export default Center;