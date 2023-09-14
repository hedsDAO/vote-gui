import Image from "next/image";

const List = ({
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
      src={"/icons/list.svg"}
      alt="list"
      height={height || 12}
      width={width || 12}
    />
  );
};

export default List;
