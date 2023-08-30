"use client";

import { Skeleton as ChakraSkeleton, SkeletonProps } from "@chakra-ui/react";

const Skeleton = (props: SkeletonProps) => {
  return <ChakraSkeleton {...props} />;
};

export default Skeleton;
