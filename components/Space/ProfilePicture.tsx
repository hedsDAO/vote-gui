import Image from "next/image";

const ProfilePicture = ({ src }: { src?: string }) => {
  return (
    <div className="mx-auto -mt-10 flex max-w-5xl justify-end px-8 lg:px-0">
      <div className="max-h-[120px] rounded-full lg:max-h-[200px]">
        <Image
          alt={"test"}
          src={src || "/ht12.png"}
          width={0}
          height={0}
          sizes="100vw"
          className="max-h-[120px] min-h-[120px] min-w-[120px] max-w-[120px] rounded-full border-2 border-black shadow-md shadow-black/30 lg:max-h-[200px] lg:min-h-[200px] lg:min-w-[200px] lg:max-w-[200px]"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} // optional
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
