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
      <div className="space-y-5 lg:pl-12">
        <div className="flex w-fit flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-sm font-semibold tracking-tight text-gray-200">
              Vote Start
            </label>
            <div className='flex items-center'>
              <DateTimePicker
                // disabled={true}
                startDate={state.voteStart}
                setStartDate={(date) =>
                  dispatch({ type: "SET_VOTE_START", payload: date })
                }
                minDate={new Date()}
              />
              <div className="relative -ml-8">
                <svg
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                  height="0.9em"
                  viewBox="0 0 384 512"
                >
                  <path d="M214.6 454.6L192 477.3l-22.6-22.6-144-144L2.7 288 48 242.8l22.6 22.6L160 354.8 160 64l0-32 64 0 0 32 0 290.7 89.4-89.4L336 242.8 381.3 288l-22.6 22.6-144 144z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
          <div className="flex items-center">
            <select
                className={`block h-8 w-32 appearance-none rounded-xl bg-white px-5 font-space-grotesk text-gray-800 focus:outline-none`}
                value={state.voteDuration}
                onChange={(e) =>
                  dispatch({ type: "SET_VOTE_DURATION", payload: e.target.value })}
              >
                {[
                  { label: "1 DAY", value: "86400000" },
                  { label: "2 DAYS", value: "172800000" },
                  { label: "3 DAYS", value: "259200000" },
                  { label: "4 DAYS", value: "345600000" },
                  { label: "5 DAYS", value: "432000000" },
                  { label: "6 DAYS", value: "518400000" },
                  { label: "1 WEEK", value: "604800000" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="relative -ml-8">
                <svg
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                  height="0.9em"
                  viewBox="0 0 384 512"
                >
                  <path d="M214.6 454.6L192 477.3l-22.6-22.6-144-144L2.7 288 48 242.8l22.6 22.6L160 354.8 160 64l0-32 64 0 0 32 0 290.7 89.4-89.4L336 242.8 381.3 288l-22.6 22.6-144 144z" />
                </svg>
              </div>
            </div>
            {/* <CustomFormInput
              label="Vote Duration"
              value={state.voteDuration}
              onChange={(e) =>
                dispatch({ type: "SET_VOTE_DURATION", payload: e.target.value })
              }
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
            /> */}
          </div>
        </div>
        <div className="flex justify-end">
        <NextStepButton
          onClick={() => setActiveStep(3)}
          disabled={formValidation()}
          text="NEXT"
          includeIcon
        />
        </div>
        {/* <div className="mt-12 flex justify-between">
          <button>Previous</button>
          <button>Next</button>
        </div> */}
      </div>
    </div>
  );
};

export default TimelineForm;
