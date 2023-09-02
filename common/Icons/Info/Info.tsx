import Image from "next/image";

const Info = ({
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
      src={"/icons/info.svg"}
      alt="info"
      height={height || 12}
      width={width || 12}
    />
  );
};

export default Info;
