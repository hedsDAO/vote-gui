"use client";

import { createClient, SpaceData } from "hedsvote";
import MediaCard from "@/components/MediaCard/MediaCard";
import { useEffect, useState } from "react";

const Spaces = () => {
  const [spaceData, setSpaceData] = useState<SpaceData[] | null>(null);

  async function getSpaceData() {
    try {
      const spacesResult = await createClient().getAllSpaces();
      const spaces = spacesResult.data.filter((space) => space.name !== "test");
      setSpaceData(spaces || null);
    } catch (e) {
      setSpaceData(null);
      console.log(e);
    }
  }

  useEffect(() => {
    if (!spaceData) getSpaceData();
  }, []);

  return (
    <div className="px-10 py-6 lg:px-[15vw]">
      <div className="my-4 flex items-center">
        <p className="font-inter text-2xl font-semibold tracking-wider text-black">
          SPACES
        </p>
      </div>
      <div className="flex gap-3 lg:gap-4">
        {spaceData?.length &&
          spaceData.map((space) => {
            const { name, image } = space;
            return <MediaCard key={name} title={name} image={image} />;
          })}
      </div>
    </div>
  );
};

export default Spaces;
