"use client";

const steps = ["DETAILS", "OPTIONS", "TIMELINE", "CONFIRM"];

interface OwnProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const VerticalStepper = ({ activeStep, setActiveStep }: OwnProps) => {
  return (
    <div className="w-1/4">
      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div key={index}>
            <div
              className={`rounded-md border-2 border-white p-2 
        ${
          activeStep === index
            ? "bg-white text-[#17151C]"
            : "bg-none text-white"
        }`}>
              <p className="font-space text-center text-sm font-bold">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center">
                <div className="h-10 min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <button
          className="m-2 bg-red-500 p-2 text-white"
          onClick={() => setActiveStep((prev) => prev - 1)}>
          Prev
        </button>
        <button
          className="m-2 bg-green-500 p-2 text-white"
          onClick={() => setActiveStep((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default VerticalStepper;
