"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface MediaCardProps {
  title: string;
  author?: string;
  image: string;
}

const MediaCard = ({ title, author, image }: MediaCardProps) => {
  const router = useRouter();
  return (
    <div className="h-40 w-36 rounded-xl border-[3px] border-black bg-white shadow-md lg:h-56 lg:w-52">
      <div
        className="flex h-full flex-col items-center justify-center gap-2"
        onClick={() => router.push(`/${title}`)}
      >
        <Image
          className="rounded-full border-2 border-black"
          src={image}
          alt={title}
          width={75}
          height={75}
        />
        <p className="font-space-grotesk text-sm text-black">{title}</p>
      </div>
    </div>
  );
};

export default MediaCard;
