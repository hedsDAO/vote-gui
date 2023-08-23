"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface MediaCardProps {
  title: string;
  author?: string;
  image: string;
}

const MediaCard = ({ title, image }: MediaCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/${title}`)}
      className="h-40 w-44 rounded-xl border-[1px] border-fuchsia-200/30 bg-black/30 shadow-sm shadow-black/60 transition-all ease-in-out hover:bg-heds-bg-light lg:h-48 lg:w-52 "
    >
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <Image
          className="rounded-full border-[3px] border-heds-bg-light"
          src={image}
          alt={title}
          width={55}
          height={55}
        />
        <p className="mt-2 font-space-grotesk text-lg text-white/80">{title}</p>
      </div>
    </div>
  );
};

export default MediaCard;
