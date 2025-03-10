import Link from "next/link";

import VerticalStepper from "./VerticalStepper";

export default function Page() {


  return (
    <div className="bg-heds-bg py-8 min-h-[82vh]">
    <div className="mx-auto max-w-[80%]  lg:max-w-3xl ">
      <div className="">
        <Link href={"/"}>
          <div className="flex flex-row items-center gap-2 py-2">
            <svg
              className="h-4 w-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
              />
            </svg>
            <p className="font-space-grotesk text-sm text-white">back</p>
          </div>
        </Link>
      </div>
      <p className="pb-4 pt-8 font-space-grotesk text-3xl font-medium lg:text-4xl text-white">
        Create Proposal
      </p>
      <hr className="mb-10 mt-4 h-[0.5px] border-t-0 bg-white opacity-100" />
      <VerticalStepper />
    </div>
    </div>
  );
}
