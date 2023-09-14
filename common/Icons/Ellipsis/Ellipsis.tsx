import Image from "next/image";

const Ellipsis = ({
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
      src={"/icons/ellipsis.svg"}
      alt="ellipsis"
      height={height || 12}
      width={width || 12}
    />
  );
};

export default Ellipsis;
