import Image from "next/image";

const imageLinks = ["/ht11.png", "/ht14.png", "/ht15.png", "/ht12.png"];

const Header = () => {
  return (
    <div className="flex w-[100vw] flex-col items-center justify-center gap-5 pb-20 pt-16 lg:gap-5 lg:pb-20 lg:pt-16">
      <div className="flex items-center gap-4 lg:gap-6">
        <h1 className="font-inter text-5xl font-bold text-white lg:text-8xl">
          VOTING FOR
        </h1>
        <div className="hidden rounded-full border border-white px-5 py-1.5 text-xs text-white shadow-md shadow-gray-800 lg:inline-block">
          alpha v1.0
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <div className="hidden items-center -space-x-5 lg:flex">
          {imageLinks.map((image) => (
            <Image
              key={image}
              src={image}
              alt={image}
              width={75}
              height={75}
              className="rounded-full border-[3px] border-white"
            />
          ))}
        </div>
        <div className="flex items-center -space-x-3 lg:hidden">
          {imageLinks.map((image) => (
            <Image
              key={image}
              src={image}
              alt={image}
              width={65}
              height={65}
              className="rounded-full border-[3px] border-white"
            />
          ))}
        </div>
        <h1 className="font-inter text-5xl font-bold text-white lg:text-8xl">
          THE MASSES
        </h1>
      </div>
      <div className="self-end lg:pr-[30%]">
        <p className="max-w-md overflow-auto px-14 text-center font-space-grotesk text-xs text-white/80 lg:px-2 lg:text-right lg:text-sm">
          Enhance Your Experience: Vote and Influence Your Favorite Tunes with
          Our Cutting-Edge Media Voting Protocol
        </p>
      </div>
    </div>
  );
};

export default Header;
