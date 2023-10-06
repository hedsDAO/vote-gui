"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Flex, Typography } from "@/common";
import * as styles from "@/components/navs/Navbar/styles";
import * as constants from "@/components/navs/Navbar/constants";
import {  ModalSteps} from "@heds-dev/auth"
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { GoogleOAuthProvider } from "@react-oauth/google";
const ConnectButton = dynamic(() => import("@/components/buttons/ConnectButton/ConnectButton"), { ssr: false });
const LoginButton = dynamic(() => import("@/components/buttons/LoginButton/LoginButton"), {ssr: false});


const Navbar = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setStep] = useState<ModalSteps>(1);
  const validateUserWallet = (wallet: `0x${string}`) => console.log(wallet);
  const {connectors} = useConnect();

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
