"use client";

import { Avatar as ChakraAvatar, AvatarProps } from "@chakra-ui/react";
import Image from "next/image";

const Avatar = (props: AvatarProps) => {
  return (
    <ChakraAvatar
      icon={
        <Image
          className="animate-pulse invert"
          alt="loading"
          src="/logo_md.png"
          height={60}
          width={60}
        />
      }
      {...props}
    />
  );
};

export default Avatar;
