"use client";

import { useContext, useEffect, useState } from "react";

import { CreateProposalContext } from "@/context/createProposal.context";
import CustomUpload from "./CustomUpload";
import CustomFormInput from "./CustomFormInput";
import NextStepButton from "./NextStepButton";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const TapeDetailsForm = ({ setActiveStep }: OwnProps) => {
  const { state, dispatch } = useContext(CreateProposalContext);
  const {title, description} = state.tapeDetails;
  const [newTitle, setTitle] = useState<string>(title || "");
  const [newDescription, setDescription] = useState<string>(description || "");
  const [newFile, setFile] = useState<File>(state.coverFile || new File([],""));
  const fileName = state.coverFile ? state.coverFile.name : "";

  const handleClick = () => {
    if (newTitle !== title || newDescription !== description) {
      dispatch({ type: "SET_DETAILS", payload: { title: newTitle, description: newDescription } });
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
    if ( !newTitle || !newDescription || !newFile) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full">
      <div className="space-y-5 pl-12">
        <CustomUpload
          label="Upload Cover"
          acceptFileType="image/*"
          existingFileName={fileName}
          onFileChange={handleFileChange}
        />
        <CustomFormInput
          label="Title"
          placeholder="what's the title?"
          value={newTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CustomFormInput
          label="Description"
          placeholder="write a description..."
          value={newDescription}
          onChange={(e) => setDescription(e.target.value)}
          formType="textarea"
        />
        {/* <CustomFormInput
          label="Type of Tape"
          value={tapeType}
          onChange={(e) => setTapeType(e.target.value)}
          formType="select"
          options={[
            { value: "hedstape", label: "hedsTAPE" },
            { value: "collabtape", label: "collabTAPE" },
          ]}
        /> */}
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
