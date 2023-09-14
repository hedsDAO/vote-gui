"use client";

import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";

interface LinkIconButtonProps extends ButtonProps {
  link: string;
}

const LinkIconButton = (props: LinkIconButtonProps) => {
  return (
    <Link href={props.link}>
      <ChakraButton minH="unset" bg="unset" border="unset" {...props} />
    </Link>
  );
};

export default LinkIconButton;
