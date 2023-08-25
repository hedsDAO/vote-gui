export interface BadgeProps {
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  margin?: string;
  padding?: string;
  whitespace?: string;
  className?: string;
  truncate?: boolean;
  maxWidth?: string;
  textAlign?: string;
  children?: React.ReactNode | string;
}

const Badge = ({
  fontSize = "text-base",
  fontFamily = "font-space-grotesk",
  fontWeight = "font-normal",
  color = "text-black",
  margin = "m-0",
  padding = "px-5",
  whitespace = "whitespace-normal",
  className = "",
  truncate = false,
  maxWidth = "max-w-none",
  children,
}: BadgeProps) => {
  return (
    <div className="hidden rounded-full border border-white py-1.5 text-xs text-white shadow-md shadow-gray-800 lg:inline-block">
      alpha v1.0
    </div>
  );
};
