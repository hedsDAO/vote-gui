"use client";
import { useState, ChangeEvent } from "react";
import CustomFormInput from "./CustomFormInput";
import CustomUpload from "./CustomUpload";

interface Option {
  title: string;
  imageFile: string;
  audioFile: string;
}

const OptionsForm = () => {
  const [options, setOptions] = useState<Option[]>([
    {
      title: "",
      imageFile: "",
      audioFile: "",
    },
  ]);

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    idx: number
  ) => {
    let data = [...options];
    data[idx][e.target.name as keyof Option] = e.target.value;
    setOptions(data);
  };

  const addFields = () => {
    const newField = {
      title: "",
      imageFile: "",
      audioFile: "",
    };
    console.log("clicked");

    setOptions((prev) => [...prev, newField]);
  };

  console.log("options", options);

  return (
    <div className="w-full">
      <div className="space-y-5 pl-12">
        {options.map((option, idx) => (
          <div className="flex flex-col" key={idx}>
            <CustomFormInput
              label="Title"
              placeholder="what's the title?"
              value={option.title}
              onChange={(e) => handleFormChange(e, idx)}
            />
            <div className="flex flex-row justify-around">
              <CustomUpload
                label="Upload Track"
                onChange={(e) => handleFormChange(e, idx)}
                fileName={option.audioFile}
                name="audioFile"
                acceptFileType=".mp3,audio/*"
              />
              <CustomUpload
                label="Upload Image"
                onChange={(e) => handleFormChange(e, idx)}
                fileName={option.imageFile}
                name="imageFile"
                acceptFileType="image/*"
              />
            </div>
          </div>
        ))}
        <button className="rounded-lg border px-4" onClick={addFields}>
          +
        </button>
      </div>
    </div>
  );
};

export default OptionsForm;
