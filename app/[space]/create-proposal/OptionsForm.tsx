"use client";
import { useContext, useRef, ChangeEvent, useState } from "react";
import { CreateProposalContext } from "@/context/createProposal.context";
import { Disclosure, Transition } from "@headlessui/react";
import CustomFormInput from "./CustomFormInput";
import CustomUpload from "./CustomUpload";
import NextStepButton from "./NextStepButton";
import { CaretCircleUp, Trash } from "@phosphor-icons/react";
import { regex } from "@/utils/validation";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const OptionsForm = ({ setActiveStep }: OwnProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { state, dispatch } = useContext(CreateProposalContext);

  const handleClick = () => {
    console.log(state);
    setActiveStep(2);
  };

  const formValidation = (): boolean => {
    for (let i = 0; i < state.choiceOptions.length; i++) {
      if (state.choiceOptions[i].title?.length === 0) return false;
      if (!(state.choiceOptions[i].imageFile instanceof File)) return false;
    }
    return true;
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

  const handleFileDelete = (idx: number, type: "imageFile" | "audioFile") => {
    const updatedOption = { ...state.choiceOptions[idx] };
    updatedOption[type] = null;
    dispatch({
      type: "UPDATE_OPTION",
      payload: { idx, option: updatedOption },
    });
  };

  return (
    <div className="w-full">
      <div className="space-y-4 lg:pl-12">
        {state.choiceOptions.map((option, idx) => (
          <>
            <Disclosure as="div" defaultOpen={idx === 0}>
              {({ open }) => (
                <>
                  <div className="flex">
                    {idx > 1 && (
                      <button
                        className="mr-1 rounded-sm border border-white bg-white/10 px-2.5 transition-all hover:bg-white/50"
                        onClick={() =>
                          dispatch({ type: "DELETE_OPTION", payload: idx })
                        }
                      >
                        <Trash className="h-4 w-4 text-white" />
                      </button>
                    )}
                    <Disclosure.Button
                      onClick={() => setActiveTab(idx)}
                      className="flex w-full justify-between rounded-sm border border-white bg-white/10 px-4 py-2 text-left text-sm font-medium text-white"
                    >
                      <span className="font-space-grotesk">
                        {state.choiceOptions[idx].title || `Choice ${idx + 1}`}
                      </span>
                      <CaretCircleUp
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-white`}
                      />
                    </Disclosure.Button>
                  </div>
                  <Disclosure.Panel
                    className="mt-3 flex flex-col gap-5 p-1.5 transition-all duration-500 ease-linear"
                    key={idx}
                  >
                    {/* <div className="flex flex-col gap-5" key={idx}> */}
                    <div className="flex flex-col gap-10 lg:flex-row">
                      <div>
                        <CustomUpload
                          label="Upload Image"
                          existingFileName={option.imageFile?.name || ""}
                          existingFile={state.choiceOptions[idx].imageFile}
                          name="imageFile"
                          subLabel="jpeg/png"
                          acceptFileType="image/*"
                          onFileChange={(e) =>
                            handleFileChange(e.target.files, idx, "imageFile")
                          }
                          onFileDelete={() =>
                            handleFileDelete(idx, "imageFile")
                          }
                        />
                      </div>
                    </div>
                    <CustomFormInput
                      regex={regex}
                      maxChars={24}
                      label="Title"
                      placeholder="what's the title?"
                      value={option.title}
                      onChange={(e) => handleFormChange(e, idx)}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          onClick={addFields}
          className="flex h-8 cursor-pointer items-center justify-center rounded-lg bg-purple-200 px-4 py-2 text-black"
        >
          <span className="-mt-[2px]"> + </span>
        </button>
        <NextStepButton
          onClick={handleClick}
          disabled={!formValidation()}
          text="NEXT"
          includeIcon
        />
      </div>
    </div>
  );
};

export default OptionsForm;
