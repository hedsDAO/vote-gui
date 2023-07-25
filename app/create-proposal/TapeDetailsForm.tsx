"use client";

import { useState } from "react";

import CustomUpload from "./CustomUpload";
import CustomFormInput from "./CustomFormInput";
import NextStepButton from "./NextStepButton";

const TapeDetailsForm = () => {
  const [fileName, setFileName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [bpm, setBpm] = useState<string>("");
  const [tapeType, setTapeType] = useState<string>("hedstape");

  const handleClick = () => {
    // dispatch.adminModel.setTapeDetails({ name, description, bpm: Number(bpm), type_type: tapeType });
    // goToNext();
    console.log("fileName", fileName);
    console.log("name", name);
    console.log("description", description);
    console.log("bpm", bpm);
    console.log("tapeType", tapeType);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch.adminModel.uploadCoverImage(e.target.files[0]);
    // setFileName(e.target.files[0].name);
    console.log("fileChange", e);
  };

  const formValidation = () => {
    // if (!fileName || !name || !description || !bpm || !tapeType) {
    //   return true;
    // }
    return false;
  };

  return (
    <div className="w-full">
      <div className="space-y-5 pl-12">
        <CustomUpload
          label="Upload Cover"
          onChange={handleFileChange}
          fileName={fileName}
          acceptFileType="image/*"
        />
        <CustomFormInput
          label="Title"
          placeholder="what's the title?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomFormInput
          label="Description"
          placeholder="write a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          formType="textarea"
        />
        <CustomFormInput
          label="BPM"
          placeholder="tempo?"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
        />
        <CustomFormInput
          label="Type of Tape"
          value={tapeType}
          onChange={(e) => setTapeType(e.target.value)}
          formType="select"
          options={[
            { value: "hedstape", label: "hedsTAPE" },
            { value: "collabtape", label: "collabTAPE" },
          ]}
        />
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
