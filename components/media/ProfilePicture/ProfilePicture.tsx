"use client";

import { Skeleton } from "@/common";
import { SkeletonProps, useBoolean } from "@chakra-ui/react";
import Image from "next/image";

interface ProfilePictureProps extends SkeletonProps {
  src?: string;
  height?: { base: string | number; lg: string | number };
}

const ProfilePicture = (props: ProfilePictureProps) => {
  const [hasProfilePictureLoaded, setHasProfilePictureLoaded] = useBoolean(false);
  let formattedStyleProps = { ...props };
  delete formattedStyleProps.src;
  delete formattedStyleProps.height;
  return (
    <Skeleton
      opacity={1}
      startColor="black"
      endColor="heds.bg_dark"
      bg="heds.bg"
      rounded="full"
      isLoaded={hasProfilePictureLoaded}
      height={{ base: props?.height?.base || "140px", lg: props?.height?.lg || "200px" }}
      width={{ base: props?.height?.base || "140px", lg: props?.height?.lg || "200px" }}
      {...formattedStyleProps}
    >
      <Image
        priority
        onLoad={setHasProfilePictureLoaded.on}
        alt={"profile-picture"}
        src={props?.src || "/logo_md.png"}
        width={0}
        height={0}
        sizes="100vw"
        className={`max-h-[${props?.height?.base || "140px"}] min-h-[${props?.height?.base || "140px"}] min-w-[${
          props?.height?.base || "140px"
        }] max-w-[${props?.height?.base || "140px"}] lg:max-h-[${props?.height?.lg || "200px"}] lg:min-h-[${
          props?.height?.lg || "200px"
        }] lg:min-w-[${props?.height?.lg || "200px"}] lg:max-w-[${props?.height?.lg || "200px"}] rounded-full `}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Skeleton>
    // </div>
  );
};

export default ProfilePicture;
