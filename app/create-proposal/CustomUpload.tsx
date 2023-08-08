"use client";

import { useContext, useRef, useState, ChangeEvent, useEffect } from "react";
import { pinFileToIpfs } from '../_actions';
import { CreateProposalContext } from "@/context/createProposal.context";

interface OwnProps {
  label: string;
  name?: string;
  acceptFileType: string;
  existingFileName?: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomUpload = ({
  label,
  name,
  acceptFileType,
  existingFileName = "",
  onFileChange
}: OwnProps) => {
  const [fileName, setFileName] = useState(existingFileName);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name); // Set the local fileName state
      onFileChange(e); // Call the passed-in handler
    }
  };

  // const uploadFile = async () => {
  //   const data = new FormData();
    
  //   // Metadata for pinata can be customized as needed
  //   const pinataMetadata = {
  //     name: "test next upload",
  //     keyvalues: {
  //       fieldName: name,
  //     },
  //   };
  
  //   data.append('pinataMetadata', JSON.stringify(pinataMetadata));
  //   data.append('file', files ? files[0] : "");
  //   // const pinnedFile = pinFileToIpfs(data);
  //   // console.log(pinnedFile);
  // }
  return (
    <div className="mb-4">
      <label className="mb-2 block font-mono text-sm font-semibold tracking-tight text-gray-200">
        {label}
      </label>
      <div
        className="flex h-48 w-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-4 text-center"
        onClick={() => inputRef.current?.click()}>
        <input
          type="file"
          id="upload"
          accept={acceptFileType}
          onChange={handleFileChange}
          hidden
          ref={inputRef}
          name={name}
        />
        <button className="w-full cursor-pointer py-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-6 w-6 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        <p className="mt-4 w-full overflow-hidden overflow-ellipsis text-sm text-gray-400">
          {fileName ? fileName: "no file selected"}
        </p>
      </div>
    </div>
  );
};

export default CustomUpload;
