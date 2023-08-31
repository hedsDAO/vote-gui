"use client";

import { Skeleton } from "@/common";
import { useBoolean } from "@chakra-ui/react";
import Image from "next/image";
import * as constants from "@/components/media/Banner/constants";

const Banner = ({ src, height }: { src?: string; height?: { base: string | number; lg: string | number } }) => {
  const [hasBannerLoaded, setHasBannerLoaded] = useBoolean(false);
  return (
    <Skeleton
      opacity={1}
      isLoaded={hasBannerLoaded}
      objectFit={"cover"}
      height={{ base: height?.base || "100px", lg: height?.lg || "200px" }}
      maxH={{ base: height?.base || "100px", lg: height?.lg || "200px" }}
    >
      <Image
        priority
        onLoad={setHasBannerLoaded.on}
        alt={"banner-image"}
        src={src || "/empty.webp"}
        width={0}
        height={0}
        sizes="100vw"
        className={height ? `h-[${height?.base}] lg:h-[${height?.lg}]` : `h-[100px] lg:h-[200px]`}
        style={constants.BANNER_STYLE_PROPS}
      />
    </Skeleton>
  );
};

export default Banner;
