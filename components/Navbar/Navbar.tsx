"use client";
import Link from "next/link";

import ConnectButton from "@/components/ConnectButton/ConnectButton";

const Navbar = () => {
  return (
    <div className="flex max-h-[7vh] min-h-[7vh] w-full items-center justify-between bg-heds-bg px-5 py-4 lg:px-8">
      <Link href="/">
        <h1 className="font-space-grotesk hover:text-white text-white/80 tracking-widest lg:text-lg">
          hedsVOTE
        </h1>
      </Link>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
