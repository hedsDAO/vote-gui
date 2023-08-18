import { createClient } from "hedsvote";
import MediaCard from "@/components/MediaCard/MediaCard";
import Link from "next/link";

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
    <div className="px-10 py-6 lg:px-[15vw]">
      <div className="my-4 pb-2 flex items-center">
        <p className="font-inter text-xl font-semibold tracking-tight text-heds-bg">
          SPACES
        </p>
      </div>
      <div className="flex gap-3 lg:gap-4">
        {spaceData?.length &&
          spaceData.map((space) => {
            const { name, image } = space;
            return (
              <Link key={name} href={`/${name}`}>
                <MediaCard title={name} image={image} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Spaces;
