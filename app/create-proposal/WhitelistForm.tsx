"use client";

import { PlusCircle } from "@phosphor-icons/react";

const WhitelistForm = () => {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg bg-white px-4 py-3 lg:w-[70%] hover:bg-white/80 transition-all">
      <div className="flex w-full items-center justify-between">
        <h4 className="font-space-grotesk font-medium text-black">Whitelist</h4>
        <PlusCircle className="h-5 w-5 text-black" />
      </div>
      <p className="font-space-grotesk text-sm text-black whitespace-pre-wrap max-w-[28ch]">
        Choose a set of individual addresses to distribute voting power to.
      </p>
    </div>
  );
};

export default WhitelistForm;
