"use client";

const steps = ["DETAILS", "OPTIONS", "TIMELINE", "STRATEGY", "CONFIRM"];

interface OwnProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const VerticalStepper = ({ activeStep, setActiveStep }: OwnProps) => {
  return (
    <div className="flex flex-row lg:flex-col lg:items-start lg:justify-start justify-center lg:mb-0 mb-10">
      {steps?.map((step, i) => {
        return (
          <div className="lg:flex lg:flex-col flex flex-row lg:items-start items-center" key={step + i}>
            <button
              onClick={() => setActiveStep(i)}
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
  );
};

export default VerticalStepper;
