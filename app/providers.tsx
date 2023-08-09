"use client";

import WagmiProvider from "../providers/wagmi";
import { ProposalContextProvider } from "@/context/proposal.context";
import { CreateProposalProvider } from "@/context/createProposal.context";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ProposalContextProvider>
       <CreateProposalProvider>
        <WagmiProvider>{children}</WagmiProvider>
       </CreateProposalProvider>
      </ProposalContextProvider>
    </div>
  );
};

export default RootProvider;
