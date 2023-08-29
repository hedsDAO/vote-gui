import Image from "next/image";

const Heds = ({
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
      src={"/logo_md.png"}
      alt="heds"
      height={height || 60}
      width={width || 60}
    />
  );
};

export default Heds;
