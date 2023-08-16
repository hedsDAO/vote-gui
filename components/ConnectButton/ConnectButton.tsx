"use client";

import { ConnectKitButton } from "connectkit";

const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <button
            className="font-space-grotesk lg:text-lg text-white/90 hover:text-white/100 transition-all"
            onClick={show}
          >
            {isConnected ? <p className="text-sm">{address?.slice(0, 5) + '...'}</p> : <>connect</>}
        
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButton;
