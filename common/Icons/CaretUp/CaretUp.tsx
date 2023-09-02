import Image from "next/image";

const CaretUp = ({
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
      src={"/icons/caret-up.svg"}
      alt="caret-up"
      height={height || 12}
      width={width || 12}
      className={className || ""}
    />
  );
};

export default CaretUp;
