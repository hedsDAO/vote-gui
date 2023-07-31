"use client";

import WagmiProvider from "../providers/wagmi";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <WagmiProvider>{children}</WagmiProvider>
    </div>
  );
};

export default RootProvider;
