import Image from "next/image";

const Percentage = ({
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
      className={className || ""}
      src={"/icons/percentage.svg"}
      alt="percentage"
      height={height || 9}
      width={width || 9}
    />
  );
};

export default Percentage;
