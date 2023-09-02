import Image from "next/image";

const Grids = ({
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
      src={"/icons/grid.svg"}
      alt="grid"
      height={height || 12}
      width={width || 12}
    />
  );
};

export default Grids;
