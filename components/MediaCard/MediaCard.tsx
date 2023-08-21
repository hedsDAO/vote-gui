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
      className="h-40 w-44 border-[1px] border-fuchsia-200/40 rounded-2xl bg-heds-bg shadow-sm shadow-black/60 lg:h-48 lg:w-52 hover:bg-heds-bg-light transition-all ease-in-out"
    >
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <Image
          className="rounded-full"
          src={image}
          alt={title}
          width={50}
          height={50}
        />
        <p className="font-space-grotesk text-sm text-black">{title}</p>
      </div>
    </div>
  );
};

export default MediaCard;
