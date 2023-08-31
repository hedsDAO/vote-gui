import Image from "next/image";

const Instagram = ({
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
      src={"/icons/instagram.svg"}
      alt="instagram"
      height={height || 15}
      width={width || 15}
    />
  );
};

export default Instagram;
