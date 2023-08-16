"use client";
import { useState } from "react";
import { createClient } from "hedsvote";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { mainnet, goerli } from "wagmi/chains";
import { useWalletClient } from "wagmi";
import { WalletClient } from "viem";
import { create } from "domain";

async function createSpaceHandler(walletClient: WalletClient) {
  // const { createSpace } = createClient();
  // const space = await createSpace(walletClient, {
  //   name: "nicole's space",
  //   authors: ["0x55C59AE5b124261d021421f07C6cad699C993b3d"],
  // });
  // return space;
}

function Page() {
  // const [space, setSpace] = useState("");
  // const [createdSpace, setCreatedSpace] =
  //   useState<Awaited<ReturnType<typeof createSpaceHandler>>>();
  // const { data: walletClient, isError, isLoading } = useWalletClient();

  // async function onClick() {
  //   if (!walletClient) {
  //     return;
  //   }

  //   const newSpace = await createSpaceHandler(walletClient);

  //   // some point in the future, might be a different render
  //   setCreatedSpace(newSpace);
  // }

  // console.log("walletClient", walletClient, isLoading);

  // // if (!isLoading) {
  // //   await createSpaceHandler(walletClient);
  // // }

  return (
    <div>
      {/* <input
        className="block w-full border-b-2 border-gray-400 bg-transparent text-gray-200 placeholder-gray-200"
        value={space}
        onChange={(e) => setSpace(e.target.value)}
      />
      <button onClick={onClick}>Create Space</button> */}
    </div>
  );
}

export default Page;
