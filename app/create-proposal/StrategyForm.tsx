"use client";

import ERC721Form from "./ERC721Form";
import WhitelistForm from "./WhitelistForm";

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
    </div>
  );
};

export default StrategyForm;
