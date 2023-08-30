"use client";

import { Avatar as ChakraAvatar, AvatarProps } from "@chakra-ui/react";
import Image from "next/image";

const Avatar = (props: AvatarProps) => {
  return (
    <ChakraAvatar
      icon={
        <Image
          className="w-full animate-pulse invert"
          alt="loading"
          src="/logo_md.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            height: "auto",
            objectFit: "cover",
          }}
        />
      }
      {...props}
    />
  );
};

export default Avatar;
