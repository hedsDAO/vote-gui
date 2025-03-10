"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import axios from "axios";
import { useEffect } from "react";
import { createNewUserData } from "@/utils/createNewUserData";
import { Button, Typography } from "@/common";
import { Spinner } from "@/common/Icons";
import * as styles from "./styles";

const getUserData = async (address: string) => {
  try {
    const adr = address.toLowerCase();
    const userDataResult = await axios.get(
      `https://us-central1-heds-104d8.cloudfunctions.net/api/users/${adr}`
    );
    if (!userDataResult.data.id) {
      const data = createNewUserData(adr);
      await axios.post(
        `https://us-central1-heds-104d8.cloudfunctions.net/api/users`,
        data
      );
      return;
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
    return;
  }
};

const ConnectButtonSm = () => {
  const { address, isConnected } = useAccount();
  useEffect(() => {
    if (!address) return;
    getUserData(address as `0x${string}`);
  }, [isConnected, address]);
  
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address }) => {
        return (
          <Button {...styles.$connectButtonSmStyles} onClick={show}>
            {isConnecting ? (
              <Spinner height={12} width={12} className="invert-0 animate-spin"  />
            ) : isConnected ? (
              <Typography {...styles.$connectButtonTextStyles}>
                {address?.slice(0, 5).toLowerCase() + "..."}
              </Typography>
            ) : (
              <Typography {...styles.$connectButtonTextSmStyles}>
                connect
              </Typography>
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButtonSm;
