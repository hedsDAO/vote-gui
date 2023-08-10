"use client";
import { useContext, useRef, ChangeEvent } from "react";
import { CreateProposalContext } from "@/context/createProposal.context";
import CustomFormInput from "./CustomFormInput";
import CustomUpload from "./CustomUpload";
import NextStepButton from "./NextStepButton";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const OptionsForm = ({ setActiveStep }: OwnProps) => {
  const { state, dispatch } = useContext(CreateProposalContext);

  const handleClick = () => {
    console.log(state);
    setActiveStep(2);
  };

  const formValidation = () => {
    for (let option of state.choiceOptions) {
      if (!option.title || !option.audioFile || !option.imageFile) {
        return true;
      }
    }

    return false;
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    idx: number
  ) => {
    const updatedOption = { ...state.choiceOptions[idx] };
    updatedOption.title = e.target.value;
    dispatch({
      type: "UPDATE_OPTION",
      payload: { idx, option: updatedOption },
    });
  };

  const addFields = () => {
    const newField = {
      title: "",
      imageFile: null,
      audioFile: null,
    };

    dispatch({ type: "ADD_OPTION", payload: newField });
  };

  const fileInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange = (
    files: FileList | null,
    idx: number,
    type: "imageFile" | "audioFile"
  ) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (
      state.choiceOptions.some((option) => option.audioFile?.name === file.name)
    ) {
      alert(
        "This audio file has already been selected. Please choose a different one."
      );

      // Reset the input
      const fileInput = fileInputs.current[idx];
      if (fileInput) {
        fileInput.value = "";
      }

      const updatedOption = { ...state.choiceOptions[idx] };
      updatedOption[type] = null; // Set the file to null since it was a duplicate
      dispatch({
        type: "UPDATE_OPTION",
        payload: { idx, option: updatedOption },
      });
      return; // Early return to prevent adding duplicate
    }

    const updatedOption = { ...state.choiceOptions[idx] };
    updatedOption[type] = file;
    dispatch({
      type: "UPDATE_OPTION",
      payload: { idx, option: updatedOption },
    });
    //TODO: Clear filename so that duplicate fileName doesn't render or show red outline
    return;
  };

  return (
    <div className="w-full">
      <div className="space-y-5 lg:pl-12">
        {state.choiceOptions.map((option, idx) => (
          <div className="flex flex-col gap-5" key={idx}>
            <div className="flex flex-col lg:flex-row gap-10">
              <CustomUpload
                label="Upload Track"
                existingFileName={option.audioFile?.name || ""}
                name="audioFile"
                subLabel="mp3/wav"
                acceptFileType=".mp3,audio/*"
                onFileChange={(e) =>
                  handleFileChange(e.target.files, idx, "audioFile")
                }
                inputRef={(input) => {
                  fileInputs.current[idx] = input;
                }} // Reference input
              />
              <CustomUpload
                label="Upload Image"
                existingFileName={option.imageFile?.name || ""}
                name="imageFile"
                subLabel="jpeg/png"
                acceptFileType="image/*"
                onFileChange={(e) =>
                  handleFileChange(e.target.files, idx, "imageFile")
                }
              />
            </div>
            <CustomFormInput
              label="Title"
              placeholder="what's the title?"
              value={option.title}
              onChange={(e) => handleFormChange(e, idx)}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={addFields}
          className="flex h-8 cursor-pointer items-center justify-center rounded-lg bg-purple-200 px-4 py-2 text-black"
        >
         <span className="-mt-[2px]"> + </span>
        </button>
        <NextStepButton
          onClick={handleClick}
          disabled={formValidation()}
          text="NEXT"
          includeIcon
        />
      </div>
    </div>
  );
};

export default OptionsForm;
