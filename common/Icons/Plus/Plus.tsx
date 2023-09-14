import Image from "next/image";

const Plus = ({ height, width, className }: { height?: number; width?: number; className?: string }) => {
  return (
    <Image
      className={className || "invert"}
      src={"/icons/plus.svg"}
      alt="plus"
      height={height || 10}
      width={width || 10}
    />
  );
};

export default Plus;
