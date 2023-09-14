"use client";

import { Avatar as ChakraAvatar, AvatarProps, useBoolean } from "@chakra-ui/react";
import { Skeleton } from "@/common";
import Image from "next/image";

const Avatar = (props: AvatarProps) => {
  const [hasAvatarLoaded, setHasAvatarLoaded] = useBoolean();
  const newProps = { ...props };
  delete newProps.key;
  delete newProps.showBorder;
  return (
    <Skeleton fitContent rounded="full" {...newProps} isLoaded={hasAvatarLoaded}>
      <ChakraAvatar
        onLoad={setHasAvatarLoaded.on}
        icon={
          <Image
            className="w-full animate-pulse invert"
            alt="loading"
            src="/empty.webp"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              height: "auto",
              objectFit: "cover",
              borderRadius: 1000,
            }}
          />
        }
        {...props}
      />
    </Skeleton>
  );
};

export default Avatar;
