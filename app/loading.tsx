import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex min-h-[81vh] items-center bg-heds-bg justify-center">
      <Image
        alt={"loading"}
        src={"/icons/spinner.svg"}
        width={50}
        height={50}
        className="animate-spin invert"
      />
    </div>
  );
};

export default Loading;
