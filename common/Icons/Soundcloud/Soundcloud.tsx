import Image from "next/image";

const Soundcloud = ({
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
      src={"/icons/soundcloud.svg"}
      alt="soundcloud"
      height={height || 18}
      width={width || 18}
    />
  );
};

export default Soundcloud;
