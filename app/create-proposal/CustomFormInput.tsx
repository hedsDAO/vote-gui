"use client";

import { ChangeEvent } from "react";

interface OwnProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  inputType?: string;
  formType?: string;
  options?: Array<Record<string, string>>;
}

const CustomFormInput = ({
  label,
  placeholder,
  value,
  onChange,
  inputType = "text",
  formType = "text",
  options,
}: OwnProps) => {
  const renderInput = (formType: string) => {
    switch (formType) {
      case "textarea":
        return (
          <textarea
            className="block w-full border-b-2 border-gray-400 bg-transparent text-gray-200 placeholder-gray-200"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        );
      case "select":
        return (
          <select
            className="block w-full rounded-xl bg-white text-gray-800"
            value={value}
            onChange={onChange}>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            placeholder={placeholder}
            className="block w-full border-b-2 border-gray-400 bg-transparent text-gray-200 placeholder-gray-200"
            value={value}
            onChange={onChange}
            type={inputType}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block font-mono text-sm font-semibold tracking-tight text-gray-200">
        {label}
      </label>
      {renderInput(formType)}
    </div>
  );
};

export default CustomFormInput;
