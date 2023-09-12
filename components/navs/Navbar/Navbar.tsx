"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Flex, Typography } from "@/common";
import * as styles from "@/components/navs/Navbar/styles";
import * as constants from "@/components/navs/Navbar/constants";

const ConnectButton = dynamic(() => import("@/components/buttons/ConnectButton/ConnectButton"), { ssr: false });

const Navbar = () => {
  return (
    <Flex {...styles.$navbarFlexContainerStyles}>
      <Link href="/">
        <Typography {...styles.$brandTextStyles}>{constants.BRAND_TEXT}</Typography>
      </Link>
      <ConnectButton />
    </Flex>
  );
};

export default Navbar;
