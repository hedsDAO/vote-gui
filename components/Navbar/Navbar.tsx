"use client";
import Link from "next/link";
import ConnectButton from "@/components/ConnectButton/ConnectButton";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between bg-heds-bg px-5 py-5 lg:px-7 max-h-[7vh] min-h-[7vh]">
      <Link href="/">
        <h1 className="font-space-grotesk text-white hover:text-white/80 pl-2.5 lg:text-lg tracking-wide">
          hedsVOTE
        </h1>
      </Link>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
