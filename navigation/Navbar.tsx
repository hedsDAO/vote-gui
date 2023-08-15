"use client";
import { Web3Button } from "@web3modal/react";

const Navbar = () => {
  return (
    <div className="sticky top-0 w-full px-4 py-2">
      <div className="flex w-1/3 flex-row justify-end">
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
