// "use client";

import Header from "@/components/Landing/Header";
import Spaces from "@/components/Landing/Spaces";
import YourSpaces from "@/components/Landing/YourSpaces";
import YourVotes from "@/components/Landing/YourVotes";

export default function Home() {
  return (
    <div className="flex w-full min-h-[82vh] flex-col">
      <Header />
      <Spaces />
      <YourVotes />
      <YourSpaces />
    </div>
  );
}
