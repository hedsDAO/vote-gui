"use client";

import { useState } from "react";
import Link from "next/link";

import VerticalStepper from "./VerticalStepper";
import TapeDetailsForm from "./TapeDetailsForm";
import OptionsForm from "./OptionsForm";
import TimelineForm from "./TimelineForm";

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="mx-auto mt-12 w-1/2">
      <Link href={"/"}>
        <div className="flex flex-row items-center py-2">
          <svg
            className="h-5 w-5 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
            />
          </svg>
          <p className="text-sm">Back</p>
        </div>
      </Link>
      <p className="py-2 text-4xl">Create Proposal</p>
      <hr className="mb-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <div className="flex flex-row">
        <VerticalStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        {activeStep === 0 && <TapeDetailsForm setActiveStep={setActiveStep}/>}
        {activeStep === 1 && <OptionsForm />}
        {activeStep === 2 && <TimelineForm />}
      </div>
    </div>
  );
}
