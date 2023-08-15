import Link from "next/link";
import Image from "next/image";

export default function ProposalCard({
  id,
  link,
  name,
  image,
  author,
  timeline,
  $light = false,
}: {
  id?: number;
  link: string;
  name: string;
  image: string;
  author: string;
  timeline: string;
  $light?: boolean;
}) {
  return (
    <Link key={id} href={link}>
      <div
        className={`w-52 rounded-xl border-2 ${
          $light ? "border-white" : "border-black"
        } p-4`}>
        <div
          className={`mb-2 w-fit self-start rounded-2xl border-2 px-3 text-center text-xs ${
            $light ? "border-white text-white" : "border-black text-black"
          }`}>
          {timeline}
        </div>
        <Image
          className="mx-auto rounded-full border"
          src={image}
          alt="Picture of the author"
          width={100}
          height={100}
        />
        <div
          className={`flex flex-col pt-4 text-center font-thin ${
            $light ? "text-white" : "text-black"
          }`}>
          <p>{name}</p>
          <p className="text-xs font-semibold">CREATED BY</p>
          <p className="text-xs">{author}</p>
        </div>
      </div>
    </Link>
  );
}
