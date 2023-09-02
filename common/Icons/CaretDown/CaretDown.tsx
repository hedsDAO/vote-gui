import Image from "next/image";

const CaretDown = ({
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
      src={"/icons/caret-down.svg"}
      alt="caret-down"
      height={height || 12}
      width={width || 12}
      className={className || ""}
    />
  );
};

export default CaretDown;
