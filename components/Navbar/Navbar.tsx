"use client";

import ConnectButton from "@/components/ConnectButton/ConnectButton";

const Navbar = () => {
  return (
    <div className="flex w-full max-h-[10vh] min-h-[10vh] items-baseline justify-between bg-heds-bg px-5 py-4 lg:px-8">
      <h1 className="font-space-grotesk tracking-wide lg:text-xl">
        hedsVOTE
      </h1>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
