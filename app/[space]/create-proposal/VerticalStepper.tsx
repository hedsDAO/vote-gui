"use client";
import { useContext, useState } from "react";
import { CreateProposalContext } from "@/context/createProposal.context";
import TapeDetailsForm from "./TapeDetailsForm";
import OptionsForm from "./OptionsForm";
import TimelineForm from "./TimelineForm";
import StrategyForm from "./StrategyForm";
import ConfirmForm from "./ConfirmForm";

const steps = ["DETAILS", "OPTIONS", "TIMELINE", "STRATEGY", "CONFIRM"];

interface OwnProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const VerticalStepper = () => {
  const { state, } = useContext(CreateProposalContext);
  const [activeStep, setActiveStep] = useState(0);
  const {coverFile, tapeDetails, choiceOptions, strategy,voteDuration, voteStart} = state;
  const canNavigateToStep = (step: number) => {
    if (step === activeStep) return false;
    switch (step) {
      case 0:
        return true;
      case 1:
        return coverFile && tapeDetails;
      case 2:
        return choiceOptions && activeStep > 1;
      case 3:
        return voteDuration && voteStart && activeStep > 2;
      case 4:
        // return strategy && activeStep > 3;
        return true;
      default:
        return false;
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8" >
      <div className="col-span-2">
        <div className="flex flex-row lg:flex-col lg:items-start lg:justify-start justify-center lg:mb-0 mb-10">
          {steps?.map((step, i) => {
            return (
              <div className="lg:flex lg:flex-col flex flex-row lg:items-start items-center" key={step + i}>
                <button
                  onClick={() => 
                    canNavigateToStep(i) && 
                    setActiveStep(i)}
                    className={
                      `${
                        i === activeStep ? "bg-white" : ""
                      } ` +
                      `${
                        i <= activeStep ? "bg-white" : "bg-transparent opacity-60"
                      } ` +
                      "flex lg:min-w-[16ch] lg:min-h-auto min-w-[1.5ch] min-h-[1.5ch] items-center justify-center rounded-full lg:rounded-xl border-2 lg:border border-white py-1.5"
                  }
                >
                  <p
                    className={
                      `${i === activeStep ? "text-black" : "hidden lg:block"} ` +
                      `${i <= activeStep ? "text-black" : "text-white "} ` +
                      "font-space-grotesk tracking-wider font-medium text-sm px-3"
                    }
                  >
                    {step}
                  </p>
                </button>
                {i !== steps.length - 1 ? (
                  <div
                    className={
                      `${i === activeStep ? "animate-pulse" : ""} ` +
                      `${i <= activeStep ? "bg-white" : "bg-white/30"} ` +
                      "mx-auto h-[0.2rem] w-9 lg:h-9 lg:w-[0.2rem]"
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:col-span-6">
      {activeStep === 0 && <TapeDetailsForm setActiveStep={setActiveStep} />}
      {activeStep === 1 && <OptionsForm setActiveStep={setActiveStep} />}
      {activeStep === 2 && <TimelineForm setActiveStep={setActiveStep} />}
      {activeStep === 3 && <StrategyForm setActiveStep={setActiveStep} />}
      {activeStep === 4 && <ConfirmForm setActiveStep={setActiveStep} />}
      </div>
    </div>
  );
};

export default VerticalStepper;
