import Image from "next/image";

const Header = ({ src }: { src?: string }) => {
  return (
    <div className="h-[120px] lg:h-[250px]">
      <Image
        alt={"test"}
        src={src || "/ht12.png"}
        width={0}
        height={0}
        sizes="100vw"
        className="h-[120px] lg:h-[250px]"
        style={{ width: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Header;
