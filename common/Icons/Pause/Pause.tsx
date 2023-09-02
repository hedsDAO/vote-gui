import Image from "next/image";

const Pause = ({
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
      src={"/icons/pause.svg"}
      alt="pause"
      height={height || 14}
      width={width || 14}
    />
  );
};

export default Pause;
