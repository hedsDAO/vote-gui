import Image from "next/image";

const Plus = ({
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
      className={className || "invert"}
      src={"/icons/plus.svg"}
      alt="plus"
      height={height || 18}
      width={width || 18}
    />
  );
};

export default Plus;
