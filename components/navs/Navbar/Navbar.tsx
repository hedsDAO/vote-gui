"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Flex, Typography } from "@/common";
import * as styles from "@/components/navs/Navbar/styles";
import * as constants from "@/components/navs/Navbar/constants";
import { AuthButtonWithModal, ModalSteps} from "@heds-dev/auth"

const ConnectButton = dynamic(() => import("@/components/buttons/ConnectButton/ConnectButton"), { ssr: false });

const Navbar = () => {
  // const { data, isError, isFetching} = useIsDisplayNameUnique("cambot");
  const setStep = (arg: ModalSteps) => console.log(`set ${arg} step`);
  const onLoginButtonClick = (arg: boolean) => console.log(`modal clicked, set to ${arg}`);
  return (
    <Flex {...styles.$navbarFlexContainerStyles}>
      <Link href="/">
        <Typography {...styles.$brandTextStyles}>{constants.BRAND_TEXT}</Typography>
      </Link>
      <ConnectButton />
      <AuthButtonWithModal currentStep={undefined} isOpen={false} setStep={setStep} onLoginButtonClick={onLoginButtonClick} />
    </Flex>
  );
};

export default Navbar;
