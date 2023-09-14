import Image from "next/image";

const ArrowLeft = ({
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
      src={"/icons/arrow-left.svg"}
      alt="arrow-left"
      height={height || 15}
      width={width || 15}
    />
  );
};

export default ArrowLeft;
