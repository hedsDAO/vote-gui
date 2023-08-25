export interface TypographyProps {
  fontSize?: string | { sm?: string, md?: string, lg?: string, xl?: string };
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

const Typography = ({
  fontSize = "text-base",
  fontFamily = "font-space-grotesk",
  fontWeight = "font-normal",
  color = "text-black",
  margin = "m-0",
  padding = "p-0",
  whitespace = "whitespace-normal",
  className = "",
  truncate = false,
  maxWidth = "max-w-none",
  children,
}: TypographyProps) => {
    const resolveResponsiveProp = (propValue: any) => {
        if (typeof propValue === 'string') {
          return propValue;
        }
        return Object.entries(propValue).map(([key, value]) => `${key}:${value}`).join(' ');
      };
  const truncateStyles = truncate ? "truncate" : "";
  const combinedClasses = `${fontSize} ${fontFamily} ${fontWeight} ${color} ${margin} ${padding} ${whitespace} ${truncateStyles} ${maxWidth} ${className}`;
  return <p className={combinedClasses}>{children}</p>;
};

export default Typography;
