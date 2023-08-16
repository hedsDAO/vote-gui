import Image from "next/image";
import Link from "next/link";
import * as constants from "@/components/Footer/constants";

const Footer = () => {
  return (
    <div className="flex w-full  max-h-[10vh] min-h-[10vh] items-center justify-between bg-heds-bg px-6 py-2 lg:w-[100vw] lg:px-10">
      <div className="-ml-3 flex flex-row items-center lg:-ml-2">
        <Image
          className="invert"
          alt={"heds"}
          src={"/logo_md.png"}
          width={60}
          height={60}
        />
        <div className="flex flex-col">
          <p className="text-[0.65rem]">{constants.COPYRIGHT_TEXT}</p>
          <p className="text-[0.65rem]">{constants.COPYRIGHT_DESC}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-3.5">
          <Link href={constants.TWITTER_LINK} target="_blank">
            <i className="fa-brands fa-x-twitter lg:text-lg"></i>
          </Link>
          <Link href={constants.DISCORD_LINK} target="_blank">
            <i className="fa-brands fa-discord lg:text-lg"></i>
          </Link>
          <Link href={constants.INSTAGRAM_LINK} target="_blank">
            <i className="fa-brands fa-instagram lg:text-lg"></i>
          </Link>
          <Link href={constants.SOUNDCLOUD_LINK} target="_blank">
            <i className="fa-brands fa-soundcloud lg:text-lg"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
