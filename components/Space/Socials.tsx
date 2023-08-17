import Image from "next/image";
import Link from "next/link";

const Socials = ({
  twitter,
  instagram,
  discord,
  soundcloud,
}: {
  twitter?: string;
  instagram?: string;
  discord?: string;
  soundcloud?: string;
}) => {
  // if (!!twitter || !!instagram || !!discord || !!soundcloud) return <></>;
    return (
      <div className="mx-auto mt-10 flex max-w-4xl justify-start px-10">
        <div className="flex flex-col gap-2">
          <p className="font-inter text-sm font-semibold tracking-wide text-black/60">
            SOCIALS
          </p>
          <div className="flex items-center justify-start gap-2.5">
            {twitter && (
              <Link href={twitter} target="_blank">
                <Image
                  alt={"twitter"}
                  src={"/icons/x-twitter.svg"}
                  width={22}
                  height={22}
                />
              </Link>
            )}
            {instagram && (
              <Link href={instagram} target="_blank">
                <Image
                  alt={"instagram"}
                  src={"/icons/instagram.svg"}
                  width={22}
                  height={22}
                />
              </Link>
            )}
            {discord && (
              <Link href={discord} target="_blank">
                <Image
                  alt={"discord"}
                  src={"/icons/discord.svg"}
                  width={22}
                  height={22}
                />
              </Link>
            )}

            {soundcloud && (
              <Link href={soundcloud} target="_blank">
                <Image
                  alt={"soundcloud"}
                  src={"/icons/soundcloud.svg"}
                  width={22}
                  height={22}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
};

export default Socials;
