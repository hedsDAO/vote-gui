import { createClient } from "hedsvote";
import MediaCard from "@/components/MediaCard/MediaCard";
import Link from "next/link";
import EmptyMediaCard from "../MediaCard/EmptyMediaCard";

async function getSpaceData() {
  try {
    const spacesResult = await createClient().getAllSpaces();
    const spaces = spacesResult.data.filter((space) => space.name !== "test");
    return spaces || null;
  } catch (e) {
    console.log(e);
  }
}

const Spaces = async () => {
  const spaceData = await getSpaceData();

  return (
    <div className="">
      <div className="mx-auto flex max-w-4xl items-center">
        <p className="ml-4 rounded-md px-1 font-inter text-xl font-bold tracking-wide text-white/80 lg:ml-2">
          SPACES
        </p>
      </div>
      <div className="flex justify-center gap-3  py-6 lg:gap-4">
        {spaceData?.length &&
          spaceData.map((space) => {
            const { name, image } = space;
            return (
              <Link key={name} href={`/${name}`}>
                <MediaCard title={name} image={image} />
              </Link>
            );
          })}
        <div className="hidden gap-4 lg:flex">
          {new Array(2).fill(0).map((_, i) => (
            <EmptyMediaCard key={"space" + i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spaces;
