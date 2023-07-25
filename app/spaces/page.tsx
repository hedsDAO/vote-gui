import Link from "next/link";

export default function Page() {
  const spaces = [
    { name: "heds" },
    { name: "test" },
    { name: "noise" },
    { name: "nicole" },
  ];
  return (
    <div className="mt-12">
      <h1 className="mx-auto w-1/2 py-8 text-4xl font-bold">Spaces</h1>
      <div className="mx-auto flex w-1/2 flex-wrap justify-between">
        {spaces.map((space) => (
          <div
            className="w-1/5 rounded-lg border border-white p-8"
            key={space.name}>
            <Link href={`/spaces/${space.name}`}>{space.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
