import Image from "next/image";

const Twitter = ({
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
      src={"/icons/x-twitter.svg"}
      alt="twitter"
      height={height || 18}
      width={width || 18}
    />
  );
};

export default Twitter;
