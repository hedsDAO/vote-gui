import Image from "next/image";
import Link from "next/link";

const Header = ({ space, cover }: { space: string; cover: string }) => {
  return (
    <>
      <Link href={`/${space}`}>
        <div className="pointer-events-auto flex items-center gap-4 lg:-ml-8">
          <Image
            alt="back"
            src={"/icons/arrow-left.svg"}
            width={14}
            height={14}
          />
          <p className="-mt-[1px] font-space-grotesk text-black/70 transition-all hover:text-black">
            space
          </p>
        </div>
      </Link>
      <div className="-mb-4 mt-8 mx-auto flex items-center lg:-my-0 lg:hidden">
        <Image
          alt={"cover"}
          src={cover}
          width={0}
          height={0}
          sizes="100vw"
          className="aspect-square rounded-full border-4 border-heds-bg-red object-cover"
          style={{ height: "80%", width: "auto", objectFit: "cover" }}
        />
      </div>
    </>
  );
};

export default Header;
