import Image from "next/image";

const TEST_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`;

const TEST_TITLE = "Daniel Allan";

const Details = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="mx-auto flex max-w-4xl justify-start px-10">
      <div className="-mt-4 flex flex-col gap-4 lg:-mt-28 lg:gap-8">
        <div className="flex items-center gap-4 lg:-ml-8">
          <Image
            alt="back"
            src={"/icons/arrow-left.svg"}
            width={15}
            height={15}
          />
          <p className="font-space-grotesk text-black">back</p>
        </div>
        <h4 className="font-space-grotesk text-4xl text-black">
          {title || TEST_TITLE}
        </h4>
        <p className="font-space-grotesk text-sm text-black lg:max-w-[75%]">
          {description || TEST_DESCRIPTION}
        </p>
      </div>
    </div>
  );
};

export default Details;
