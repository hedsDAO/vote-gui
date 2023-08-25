"use client";
import Image from "next/image";
import { FC } from "react";

interface OwnProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
  includeIcon?: boolean;
  isLoading?: boolean;
}

const NextStepButton: FC<OwnProps> = ({
  onClick,
  disabled,
  text,
  includeIcon,
  isLoading,
}) => {
  return (
    <button
      className={`h-8 rounded-lg bg-purple-200 px-4 font-space-grotesk text-sm font-medium tracking-wider text-black disabled:opacity-50 ${
        includeIcon ? "flex items-center justify-between" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <Image
          alt={"loading"}
          src={"/icons/spinner.svg"}
          width={15}
          height={15}
          className="animate-spin"
        />
      ) : (
        text
      )}
      {/* {includeIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-1.707L13.586 6H3a1 1 0 110-2h10.586l-4.293 4.293a1 1 0 010 1.414l4.293 4.293a1 1 0 01-1.414 1.414L10 12z"
            clipRule="evenodd"
          />
        </svg>
      )} */}
    </button>
  );
};

export default NextStepButton;
