import Image from "next/image";

const Question = ({ height, width, className }: { height?: number; width?: number; className?: string }) => {
  return <Image className={className || ""} src={"/icons/question.svg"} alt="info" height={height || 13} width={width || 13} />;
};

export default Question;
