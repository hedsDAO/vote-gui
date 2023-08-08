"use client";
import { useContext } from "react";
import CustomFormInput from "./CustomFormInput";
import DateTimePicker from "./DateTimePicker";
import NextStepButton from "./NextStepButton";
import { CreateProposalContext } from "@/context/createProposal.context";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const TimelineForm = ({ setActiveStep }: OwnProps) => {
  const { state, dispatch } = useContext(CreateProposalContext);

  const formValidation = () => {
    if (!state.voteDuration || !state.voteStart) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full">
      <div className="space-y-5 pl-12">
        <div className="flex w-fit flex-col">
          <label className="font-mono text-sm font-semibold tracking-tight text-gray-200">
            Vote Start
          </label>
          <DateTimePicker
            startDate={state.voteStart}
            setStartDate={(date) => dispatch({ type: 'SET_VOTE_START', payload: date })}
            minDate={new Date()}
          />
          <CustomFormInput
            label="Vote Duration"
            value={state.voteDuration}
            onChange={(e) => dispatch({ type: 'SET_VOTE_DURATION', payload: e.target.value })}
            formType="select"
            options={[
              { label: "1 DAY", value: "86400000" },
              { label: "2 DAYS", value: "172800000" },
              { label: "3 DAYS", value: "259200000" },
              { label: "4 DAYS", value: "345600000" },
              { label: "5 DAYS", value: "432000000" },
              { label: "6 DAYS", value: "518400000" },
              { label: "1 WEEK", value: "604800000" },
            ]}
          />
        </div>
        <NextStepButton
            onClick={() => setActiveStep(3)}
            disabled={formValidation()}
            text="NEXT"
            includeIcon
          />
        {/* <div className="mt-12 flex justify-between">
          <button>Previous</button>
          <button>Next</button>
        </div> */}
      </div>
    </div>
  );
};

export default TimelineForm;
