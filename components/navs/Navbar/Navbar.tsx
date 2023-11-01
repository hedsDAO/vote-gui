"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Flex, Typography } from "@/common";
import * as styles from "@/components/navs/Navbar/styles";
import * as constants from "@/components/navs/Navbar/constants";
import { GoogleOAuthProvider } from "@react-oauth/google";
const ConnectButton = dynamic(() => import("@/components/buttons/ConnectButton/ConnectButton"), { ssr: false });
const LoginButton = dynamic(() => import("@/components/buttons/LoginButton/LoginButton"), {ssr: false});


const Navbar = () => {

  return (
    <Flex {...styles.$navbarFlexContainerStyles}>
      <Link href="/">
        <Typography {...styles.$brandTextStyles}>{constants.BRAND_TEXT}</Typography>
      </Link>
      <ConnectButton />
      <GoogleOAuthProvider clientId={"559705662876-1c9jlct4nu96b3f90fkcc6bcbd7i8i3b.apps.googleusercontent.com"}>
        <LoginButton />
      </GoogleOAuthProvider>
    </Flex>
  );
};

export default Navbar;
