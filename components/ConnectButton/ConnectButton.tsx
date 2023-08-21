"use client";

import { ConnectKitButton } from "connectkit";
import Image from "next/image";

const ConnectButton = () => {
  return (
    <>
      <ConnectKitButton.Custom>
        {({ isConnected, isConnecting, show, address }) => {
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
