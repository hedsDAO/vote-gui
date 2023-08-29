"use client";
import Link from "next/link";
import ConnectButton from "@/components/buttons/ConnectButton/ConnectButton";
import { Flex, Typography } from "@/common";
import * as styles from "@/components/navs/Navbar/styles";
import * as constants from "@/components/navs/Navbar/constants";

const Navbar = () => {
  return (
    <Flex {...styles.$navbarFlexContainerStyles}>
      <Link href="/">
        <Typography {...styles.$brandTextStyles}>
          {constants.BRAND_TEXT}
        </Typography>
      </Link>
      <ConnectButton />
    </Flex>
  );
};

export default Navbar;
