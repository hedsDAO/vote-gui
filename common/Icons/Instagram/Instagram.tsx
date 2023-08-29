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
      height={height || 18}
      width={width || 18}
    />
  );
};

export default Instagram;
