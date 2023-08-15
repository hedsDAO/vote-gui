import Link from "next/link";
import Image from "next/image";

export default function SpaceCard({
  id,
  name,
  image,
  author,
}: {
  id?: number;
  name: string;
  image: string;
  author: string;
}) {
  return (
    <Link key={name} href={`/spaces/${name}`}>
      <div className="w-56 rounded-xl border-2 border-black p-4">
        <Image
          className="mx-auto rounded-full border"
          src={image}
          alt="Picture of the author"
          width={100}
          height={100}
        />
        <div className="flex flex-col pt-4 text-center font-thin text-black">
          <p>{name}</p>
          <p className="text-xs font-semibold">CREATED BY</p>
          <p className="text-xs">{author}</p>
        </div>
      </div>
    </Link>
  );
}
