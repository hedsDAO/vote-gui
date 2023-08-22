"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import { createNewUserData } from "@/utils/createNewUserData";

const getUserData = async (address: string) => {
  try {
    const adr = address.toLowerCase();
    const userDataResult = await axios.get(`https://us-central1-heds-104d8.cloudfunctions.net/api/users/${adr}`)
    if (!userDataResult.data.id) {
      const data = createNewUserData(adr);
      await axios.post(`https://us-central1-heds-104d8.cloudfunctions.net/api/users`, data);
      return;
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

const ConnectButton = () => {
  const {address, isConnected} = useAccount()

  useEffect(() => {
    if(!address) return;
    getUserData(address as `0x${string}`);
  }, [isConnected])
  return (
    <>
      <ConnectKitButton.Custom>
        { ({ isConnected, isConnecting, show, address }) => {
          return (
            <button
              className="rounded-lg bg-white bg-opacity-10 px-4 py-1.5 font-space-grotesk text-white/90 transition-all hover:text-white/80 lg:text-sm"
              onClick={show}
            >
              {isConnecting ? (
                <Image
                  className="animate-spin py-[1px] invert"
                  src={"/icons/spinner.svg"}
                  alt="loading"
                  height={14}
                  width={14}
                />
              ) : isConnected ? (
                <p className="text-xs">{address?.slice(0, 5).toLowerCase() + "..."}</p>
              ) : (
                <p className="text-xs">connect</p>
              )}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </>
  );
};

export default ConnectButton;
