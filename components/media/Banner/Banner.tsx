"use client";

import { Skeleton } from "@/common";
import { useBoolean } from "@chakra-ui/react";
import Image from "next/image";

const Banner = ({
  src,
  height,
}: {
  src?: string;
  height?: { base: string | number; lg: string | number };
}) => {
  const [hasBannerLoaded, setHasBannerLoaded] = useBoolean(false);
  return (
    <Skeleton
      opacity={1}
      startColor="black"
      endColor="heds.bg_dark"
      bg="heds.bg"
      isLoaded={hasBannerLoaded}
      height={{ base: height?.base || "100px", lg: height?.lg || "200px" }}
    >
      <Image
        priority
        onLoad={setHasBannerLoaded.on}
        alt={"banner-image"}
        src={src || "/logo_md.png"}
        width={0}
        height={0}
        sizes="100vw"
        className={`h-[${height?.base || "100px"}] lg:h-[${
          height?.lg || "200px"
        }]`}
        style={{ width: "100%", objectFit: "cover" }}
      />
    </Skeleton>
  );
};

export default Banner;
