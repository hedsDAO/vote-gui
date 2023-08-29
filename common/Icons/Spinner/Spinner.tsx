import Image from "next/image";

const Spinner = ({
  height,
  width,
  className,
}: {
  height?: number;
  width?: number;
  className?: string;
}) => {
  return (
    <Image
      className={className || "animate-spin py-[1px] invert"}
      src={"/icons/spinner.svg"}
      alt="loading"
      height={height || 14}
      width={width || 14}
    />
  );
};

export default Spinner;