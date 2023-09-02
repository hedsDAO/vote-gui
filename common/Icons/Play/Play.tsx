import Image from "next/image";

const Play = ({
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
      src={"/icons/play.svg"}
      alt="play"
      height={height || 14}
      width={width || 14}
    />
  );
};

export default Play;
