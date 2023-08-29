import Image from "next/image";

const Discord = ({
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
      src={"/icons/discord.svg"}
      alt="discord"
      height={height || 18}
      width={width || 18}
    />
  );
};

export default Discord;
