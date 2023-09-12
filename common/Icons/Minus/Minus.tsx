import Image from "next/image";

const Minus = ({ height, width, className }: { height?: number; width?: number; className?: string }) => {
  return (
    <Image
      className={className || "invert"}
      src={"/icons/minus.svg"}
      alt="minus"
      height={height || 10}
      width={width || 10}
    />
  );
};

export default Minus;
