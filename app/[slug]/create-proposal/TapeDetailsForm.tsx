"use client";

import { useContext, useState } from "react";
import { Switch, RadioGroup } from "@headlessui/react";
import { CreateProposalContext } from "@/context/createProposal.context";
import CustomUpload from "./CustomUpload";
import CustomFormInput from "./CustomFormInput";
import NextStepButton from "./NextStepButton";
import { regex } from "@/utils/validation";
import { CheckCircle } from "@phosphor-icons/react";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const TapeDetailsForm = ({ setActiveStep }: OwnProps) => {
  const [enabled, setEnabled] = useState(false);
  const { state, dispatch } = useContext(CreateProposalContext);
  const { title, description, choiceType, showResults } = state.tapeDetails;
  const [newTitle, setTitle] = useState<string>(title || "");
  const [newDescription, setDescription] = useState<string>(description || "");
  const [newFile, setFile] = useState<File | null>(state.coverFile || null);
  const [newChoiceType, setNewChoiceType] = useState(choiceType);
  const [updatedShowResults, setUpdatedShowResults] = useState(showResults);
  const fileName = state.coverFile ? state.coverFile.name : "";

  const handleClick = () => {
    if (newTitle !== title || newDescription !== description) {
      dispatch({
        type: "SET_DETAILS",
        payload: {
          title: newTitle,
          description: newDescription,
          choiceType: newChoiceType,
          showResults: updatedShowResults,
        },
      });
    }
    console.log(state);
    setActiveStep(1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      dispatch({ type: "ADD_COVER_FILE", payload: selectedFile });
      setFile(selectedFile);
    }
  };

  const formValidation = () => {
    if (!newTitle || !newDescription || !newFile) {
      return true;
    }
    return false;
  };

  const handleFileDelete = () => {
    dispatch({ type: "ADD_COVER_FILE", payload: null });
    setFile(null);
  };

  const proposalChoiceTypes = [
    {
      name: "Audio",
      description: "Proposal with audio choices.",
    },
    {
      name: "Image",
      description: "Proposal with image choices.",
    },
  ];

  return (
    <div className="w-full">
      <div className="space-y-5 lg:pl-12">
        <CustomUpload
          subLabel="jpeg/png"
          label="Upload Cover"
          acceptFileType="image/*"
          existingFileName={fileName}
          onFileChange={handleFileChange}
          onFileDelete={() => handleFileDelete()}
          existingFile={state.coverFile}
        />
        <div className="flex flex-col gap-2 pt-5">
          <CustomFormInput
            regex={regex}
            maxChars={24}
            label="Title"
            placeholder="what's the title?"
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <CustomFormInput
            regex={regex}
            maxChars={6000}
            label="Description"
            placeholder="write a description..."
            value={newDescription}
            onChange={(e) => setDescription(e.target.value)}
            formType="textarea"
          />
        </div>
        <div className="flex flex-col gap-6 pb-5">
          <div className="flex flex-col gap-3">
            <p className="font-space-grotesk text-sm font-medium text-white">
              Proposal Type
            </p>
            <RadioGroup value={newChoiceType} onChange={setNewChoiceType}>
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                {proposalChoiceTypes.map((proposalChoiceType) => (
                  <RadioGroup.Option
                    key={proposalChoiceType.name}
                    value={proposalChoiceType.name.toLowerCase()}
                    className={({ active, checked }) =>
                      `${active ? "ring-0 ring-white ring-opacity-60" : ""}
                  ${
                    checked
                      ? "bg-white bg-opacity-90 text-black"
                      : "bg-heds-bg-dark hover:bg-heds-bg-light"
                  }
                    relative flex h-full min-w-[50%] cursor-pointer rounded-lg border-none px-3.5 py-2 shadow-sm outline-none transition-all ease-in-out focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? "text-black" : "text-gray-300"
                                }`}
                              >
                                {proposalChoiceType.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                  checked ? "text-gray-800" : "text-gray-500"
                                }`}
                              >
                                <span className="text-[10px]">
                                  {proposalChoiceType.description}
                                </span>
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-black">
                              <CheckCircle className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-space-grotesk text-sm font-medium text-white">
              Public Results
            </p>
            <Switch
              checked={updatedShowResults}
              onChange={(e) => setUpdatedShowResults(e)}
              className={`${
                updatedShowResults
                  ? "border-white bg-heds-bg"
                  : "border-white/30 bg-heds-bg"
              } relative inline-flex h-5 w-[42px] items-center rounded-full  border`}
            >
              <span className="sr-only">public results</span>
              <span
                className={`${
                  updatedShowResults
                    ? "translate-x-6 bg-white"
                    : "translate-x-1 bg-white/30"
                } inline-block h-3 w-3 transform rounded-full  transition`}
              />
            </Switch>
          </div>
        </div>
        <div className="mt-12 flex justify-end">
          <NextStepButton
            onClick={handleClick}
            disabled={formValidation()}
            text="NEXT"
            includeIcon
          />
        </div>
      </div>
    </div>
  );
};

export default TapeDetailsForm;
