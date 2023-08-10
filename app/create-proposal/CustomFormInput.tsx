"use client";

import { ChangeEvent, useEffect, useRef } from "react";

interface OwnProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    idx?: number
  ) => void;
  name?: string;
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
  inputType = "text",
  formType = "text",
  options,
}: OwnProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
          <textarea
            ref={textareaRef}
            rows={1}
            className={`block w-full resize border-b-2 border-gray-400 
            bg-transparent pb-2 font-space-grotesk
            text-gray-200 placeholder-gray-500 focus:outline-none`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
          />
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
          <input
            placeholder={placeholder}
            className={`block w-full rounded-none border-x-0 border-b-2 border-t-0 
            border-gray-400 bg-transparent px-0 font-space-grotesk text-gray-200 placeholder-gray-500 
            focus:shadow-none
            focus:outline-none`}
            value={value}
            onChange={onChange}
            type={inputType}
            name={name}
          />
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
