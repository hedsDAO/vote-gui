import Link from "next/link";

export default function Page() {
  const spaces = [
    { name: "heds" },
    { name: "test" },
    { name: "noise" },
    { name: "nicole" },
  ];
  return (
    <div className="mx-auto mt-12 w-1/2">
      <Link href={"/"}>
        <div className="flex flex-row items-center py-2">
          <svg
            className="h-5 w-5 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
            />
          </svg>
          <p className="text-sm">Back</p>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-between py-2">
        <h1 className="text-4xl font-bold">Spaces</h1>
        <Link href={"/spaces/create-space"}>
          <button className="rounded-xl border border-white p-3 text-sm">
            CREATE A SPACE
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-between">
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
