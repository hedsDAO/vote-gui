import Image from "next/image";
import Link from "next/link";
import * as constants from "@/components/Footer/constants";

const Footer = () => {
  return (
    <div className="flex max-h-[12vh] min-h-[12vh] w-full items-center justify-between px-6 py-2 lg:w-[100vw] lg:px-10 bg-black">
      <div className="-ml-3 flex flex-row items-center lg:-ml-2">
        <Image
          className="invert"
          alt={"heds"}
          src={"/logo_md.png"}
          width={60}
          height={60}
        />
        <div className="flex flex-col text-white">
          <p className="text-[0.65rem]">{constants.COPYRIGHT_TEXT}</p>
          <p className="text-[0.65rem]">{constants.COPYRIGHT_DESC}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-3.5">
          <Link href={constants.TWITTER_LINK} target="_blank">
            <Image
              className="invert"
              alt={"twitter"}
              src={"/icons/x-twitter.svg"}
              width={18}
              height={18}
            />
          </Link>
          <Link href={constants.DISCORD_LINK} target="_blank">
            <Image
              className="invert"
              alt={"discord"}
              src={"/icons/discord.svg"}
              width={18}
              height={18}
            />
          </Link>
          <Link href={constants.INSTAGRAM_LINK} target="_blank">
            <Image
              className="invert"
              alt={"instagram"}
              src={"/icons/instagram.svg"}
              width={18}
              height={18}
            />
          </Link>
          <Link href={constants.SOUNDCLOUD_LINK} target="_blank">
            <Image
              className="invert"
              alt={"soundcloud"}
              src={"/icons/soundcloud.svg"}
              width={18}
              height={18}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
