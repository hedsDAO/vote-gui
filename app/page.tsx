import Header from "@/components/Landing/Header";
import Spaces from "@/components/Landing/Spaces";
import YourSpaces from "@/components/Landing/YourSpaces";
import YourVotes from "@/components/Landing/YourVotes";

export default function Home() {
  return (
    <div className="flex max-h-[81vh] min-h-[81vh] w-full flex-col bg-gradient-to-b from-heds-bg to-black">
      <Header />
      <Spaces />
      <YourVotes />
      <YourSpaces />
    </div>
  );
}
