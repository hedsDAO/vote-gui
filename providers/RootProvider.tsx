"use client";

import { ProposalContextProvider } from "@/context/proposal.context";
import { CreateProposalProvider } from "@/context/createProposal.context";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { store } from "@/store";
import { Inter, Space_Grotesk, Space_Mono, Work_Sans } from "next/font/google";
import { defaultTheme } from "@/theme";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const workSans = Work_Sans({ subsets: ["latin"] });

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
      <style jsx global>
        {`
          :root {
            --font-work-sans: ${workSans.style.fontFamily};
          }
        `}
      </style>
      <style jsx global>
        {`
          :root {
            --font-space-mono: ${spaceMono.style.fontFamily};
          }
        `}
      </style>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <style jsx global>
        {`
          :root {
            --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
          }
        `}
      </style>
      <Provider store={store}>
        <CacheProvider>
          <ChakraProvider theme={defaultTheme}>
            <ProposalContextProvider>
              <CreateProposalProvider>
                <WagmiConfig config={config}>
                  <ConnectKitProvider>{children}</ConnectKitProvider>
                </WagmiConfig>
              </CreateProposalProvider>
            </ProposalContextProvider>
          </ChakraProvider>
        </CacheProvider>
      </Provider>
    </div>
  );
};

export default RootProvider;
