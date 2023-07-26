"use client";

import { useRef, ChangeEvent } from "react";

interface OwnProps {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
  name?: string;
  acceptFileType: string;
}

const CustomUpload = ({
  label,
  onChange,
  fileName,
  name,
  acceptFileType,
}: OwnProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
          onChange={onChange}
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
          {fileName ? fileName : "no file selected"}
        </p>
      </div>
    </div>
  );
};

export default CustomUpload;
