"use client";

import WagmiProvider from "../providers/wagmi";
import { ProposalContextProvider } from "@/context/proposal.context";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ProposalContextProvider>
        <WagmiProvider>{children}</WagmiProvider>
      </ProposalContextProvider>
    </div>
  );
};

export default RootProvider;
