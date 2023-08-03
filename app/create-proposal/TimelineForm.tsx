"use client";
import { useState, ChangeEvent } from "react";
import CustomFormInput from "./CustomFormInput";
import DateTimePicker from "./DateTimePicker";

const TimelineForm = () => {
  const [voteStart, setVoteStart] = useState(new Date());
  const [voteDuration, setVoteDuration] = useState<string>("86400000");
  const [mintStart, setMintStart] = useState(new Date());
  const [mintDuration, setMintDuration] = useState<string>("86400000");

  return (
    <div className="w-full">
      <div className="space-y-5 pl-12">
        <div className="flex w-fit flex-col">
          <label className="font-mono text-sm font-semibold tracking-tight text-gray-200">
            Vote Start
          </label>
          <DateTimePicker
            startDate={voteStart}
            setStartDate={setVoteStart}
            minDate={new Date()}
          />
          <CustomFormInput
            label="Vote Duration"
            value={voteDuration}
            onChange={(e) => setVoteDuration(e.target.value)}
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

        <div className="flex w-fit flex-col">
          <label className="font-mono text-sm font-semibold tracking-tight text-gray-200">
            Vote Start
          </label>
          <DateTimePicker
            startDate={mintStart}
            setStartDate={setMintStart}
            minDate={new Date()}
          />
          <CustomFormInput
            label="Mint Duration"
            value={mintDuration}
            onChange={(e) => setMintDuration(e.target.value)}
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
        {/* <div className="mt-12 flex justify-between">
          <button>Previous</button>
          <button>Next</button>
        </div> */}
      </div>
    </div>
  );
};

export default TimelineForm;
