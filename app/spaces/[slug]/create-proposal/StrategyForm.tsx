"use client";

import ERC721Form from "./ERC721Form";
import WhitelistForm from "./WhitelistForm";
import NextStepButton from "./NextStepButton";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

//Need to fix bug were duplicate things are rendered if a user leaves form, comes back and then resubmits
const StrategyForm = ({ setActiveStep }: OwnProps) => {
  return (
    <div className="flex flex-col lg:pl-12 gap-6">
      <div>
        <ERC721Form />
      </div>
      <div>
        <WhitelistForm />
      </div>
      <div className="mt-12 flex justify-end">
          <NextStepButton
            onClick={() => setActiveStep(4)}
            disabled={false}
            text="NEXT"
            includeIcon
          />
        </div>
    </div>
  );
};

export default StrategyForm;
