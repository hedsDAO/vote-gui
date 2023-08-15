"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

interface OwnProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    idx?: number
  ) => void;
  name?: string;
  maxChars: number;
  regex: RegExp;
  inputType?: string;
  formType?: string;
  options?: Array<Record<string, string>>;
}

const CustomFormInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  maxChars,
  regex,
  inputType = "text",
  formType = "text",
  options,
}: OwnProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaError, setTextAreaError] = useState<string>("");
  const [selectError, setSelectError] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  useEffect(() => {
    return () => {
      setTextAreaError("");
      setSelectError("");
      setInputError("");
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTextAreaError("");
      setSelectError("");
      setInputError("");
    }, 3000);
  }, [textAreaError, selectError, inputError]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const renderInput = (formType: string) => {
    switch (formType) {
      case "textarea":
        return (
          <>
            <textarea
              ref={textareaRef}
              rows={1}
              className={`block w-full resize border-b-2 border-gray-400 
            bg-transparent pb-2 font-space-grotesk
            text-gray-200 placeholder-gray-500 transition-colors
            duration-500
            ease-in-out
            focus:outline-none
            disabled:text-sm disabled:text-red-500 disabled:opacity-75`}
              placeholder={placeholder}
              value={textAreaError?.length ? textAreaError : value}
              disabled={textAreaError.length > 0}
              onChange={(e) => {
                if (!regex.test(e.target.value))
                  return setTextAreaError(
                    `Invalid input, text blocks can only contain valid characters (a-z, A-Z, 0-9, !, ?, ., ,)`
                  );
                if (e.target.value.length > maxChars)
                  return setTextAreaError("Max characters reached");
                else {
                  setTextAreaError("");
                  onChange(e);
                  return;
                }
              }}
              name={name}
            />
          </>
        );
      case "select":
        return (
          <div className="flex items-center">
            <select
              className={`block h-8 w-32 appearance-none rounded-xl bg-white px-5 font-space-grotesk text-gray-800 focus:outline-none`}
              value={value}
              onChange={onChange}
            >
              {options?.map((option) => (
                <>
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                </>
              ))}
            </select>
            <div className="relative -ml-8">
              <svg
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                height="0.9em"
                viewBox="0 0 384 512"
              >
                <path d="M214.6 454.6L192 477.3l-22.6-22.6-144-144L2.7 288 48 242.8l22.6 22.6L160 354.8 160 64l0-32 64 0 0 32 0 290.7 89.4-89.4L336 242.8 381.3 288l-22.6 22.6-144 144z" />
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <>
            <input
              placeholder={placeholder}
              className={`block w-full rounded-none border-x-0 border-b-2 border-t-0 
            border-gray-400 bg-transparent px-0 font-space-grotesk text-gray-200 placeholder-gray-500 
            transition-colors
            duration-500
            ease-in-out
            focus:shadow-none
            focus:outline-none disabled:text-sm disabled:text-red-500
            disabled:opacity-75`}
              value={inputError?.length ? inputError : value}
              disabled={inputError.length > 0}
              onChange={(e) => {
                if (!regex.test(e.target.value))
                  return setInputError(
                    `Invalid input, text can only contain valid characters (a-z, A-Z, 0-9, !, ?, ., ,)`
                  );
                if (e.target.value.length > maxChars)
                  return setInputError("Max characters reached");
                else {
                  setInputError("");
                  onChange(e);
                  return;
                }
              }}
              type={inputType}
              name={name}
            />
          </>
        );
    }
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block font-space-grotesk text-sm font-semibold text-gray-200">
        {label}
      </label>
      {renderInput(formType)}
    </div>
  );
};

export default CustomFormInput;
