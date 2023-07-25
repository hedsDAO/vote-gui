"use client";

import { useState } from "react";
import VerticalStepper from "./VerticalStepper";
import TapeDetailsForm from "./TapeDetailsForm";

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="mx-auto mt-12 w-1/2">
      <p className="py-8">Create Proposal</p>
      <hr className="mb-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <div className="flex flex-row">
        <VerticalStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        {activeStep === 0 && <TapeDetailsForm />}
      </div>
    </div>
  );
}
