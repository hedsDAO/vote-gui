"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Trash } from "@phosphor-icons/react";

interface OwnProps {
  label: string;
  subLabel?: string;
  name?: string;
  acceptFileType: string;
  existingFileName?: string;
  existingFile?: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: () => void;
  inputRef?: (instance: HTMLInputElement | null) => void;
}

const CustomUpload = ({
  label,
  subLabel,
  name,
  acceptFileType,
  existingFileName = "",
  existingFile = null,
  onFileChange,
  onFileDelete,
  inputRef,
}: OwnProps) => {
  const [fileName, setFileName] = useState(existingFileName);
  const localInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef) {
      inputRef(localInputRef.current);
    }
  }, [inputRef]);

  useEffect(() => {
    setFileName(existingFileName);
  }, [existingFileName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name); // Set the local fileName state
      onFileChange(e); // Call the passed-in handler
    }
  };

  const handleFileDelete = () => {
    setFileName(""); // Clear the file name
    if (localInputRef.current) {
      localInputRef.current.value = ""; // Reset the file input
    }
    onFileDelete();
  };

  return (
    <div className="mb-4">
      <label className="mb-4 block font-space-grotesk text-sm font-semibold text-gray-200">
        {label}
      </label>

      <div
        className="flex h-44 w-44 flex-col items-center justify-center rounded-2xl border-[4px] border-dashed border-gray-200 p-4 text-center"
        onClick={
          existingFile && existingFileName
            ? () => {}
            : () => localInputRef.current?.click()
        }
      >
        <>
          {fileName && !!existingFile && (
            <div className="absolute h-44 w-44 ">
              <Image
                width={176}
                height={176}
                className="min-h-[176px] min-w-[176px] rounded-2xl object-cover p-1.5"
                alt="cover image"
                src={URL.createObjectURL(existingFile)}
              />
              <div className="absolute bottom-3 left-3">
                <Trash
                  className="h-7 w-7 rounded-md bg-black p-[3.5px] text-white"
                  onClick={() => handleFileDelete()}
                />
              </div>
            </div>
          )}
          <input
            type="file"
            id="upload"
            accept={acceptFileType}
            onChange={handleFileChange}
            hidden
            ref={localInputRef}
            name={name}
          />
          <button className="flex w-full cursor-pointer justify-center py-3 text-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="3em"
              fill="white"
              viewBox="0 0 448 512"
            >
              <path d="M232 72c0-4.4-3.6-8-8-8s-8 3.6-8 8V248H40c-4.4 0-8 3.6-8 8s3.6 8 8 8H216V440c0 4.4 3.6 8 8 8s8-3.6 8-8V264H408c4.4 0 8-3.6 8-8s-3.6-8-8-8H232V72z" />
            </svg>
          </button>
          <p className="mt-4 w-full overflow-hidden overflow-ellipsis font-space-grotesk text-sm tracking-wide text-gray-400">
            {fileName || subLabel}
          </p>
        </>
      </div>
    </div>
  );
};

export default CustomUpload;
