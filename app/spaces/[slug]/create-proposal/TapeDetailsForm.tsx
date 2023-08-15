"use client";

import { useContext, useState } from "react";

import { CreateProposalContext } from "@/context/createProposal.context";
import CustomUpload from "./CustomUpload";
import CustomFormInput from "./CustomFormInput";
import NextStepButton from "./NextStepButton";
import { regex } from "@/app/utils/validation";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const TapeDetailsForm = ({ setActiveStep }: OwnProps) => {
  const { state, dispatch } = useContext(CreateProposalContext);
  const { title, description } = state.tapeDetails;
  const [newTitle, setTitle] = useState<string>(title || "");
  const [newDescription, setDescription] = useState<string>(description || "");
  const [newFile, setFile] = useState<File | null>(state.coverFile || null);
  const fileName = state.coverFile ? state.coverFile.name : "";

  const handleClick = () => {
    if (newTitle !== title || newDescription !== description) {
      dispatch({
        type: "SET_DETAILS",
        payload: { title: newTitle, description: newDescription },
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
        <div className="pt-5 flex flex-col gap-2">
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
