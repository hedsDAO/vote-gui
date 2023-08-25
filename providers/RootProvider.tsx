"use client";

import { ProposalContextProvider } from "@/context/proposal.context";
import { CreateProposalProvider } from "@/context/createProposal.context";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Provider } from "react-redux";
import { store } from "@/store";

const WC_PROJECT_ID = "d7f07ef372c401f9d0ff10c1ff07fbaf";
const INFURA_PROVIDER_KEY = "b8453c72aa7c484fb1efee0eed133fe6";

const config = createConfig(
  getDefaultConfig({
    infuraId: INFURA_PROVIDER_KEY,
    walletConnectProjectId: WC_PROJECT_ID,
    appName: "hedsVOTE",
    appUrl: "https://heds.vote",
  })
);

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <ProposalContextProvider>
          <CreateProposalProvider>
            <WagmiConfig config={config}>
              <ConnectKitProvider>{children}</ConnectKitProvider>
            </WagmiConfig>
          </CreateProposalProvider>
        </ProposalContextProvider>
      </Provider>
    </div>
  );
};

export default RootProvider;
