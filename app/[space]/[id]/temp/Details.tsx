import { DateTime } from "luxon";
import Image from "next/image";
import { Proposal } from "hedsvote";

const formatTime = (time: string) => {
  const dateObj = DateTime.fromISO(time);
  const date = dateObj.toLocaleString({
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return date;
};

const Details = ({
  proposal,
  displayName,
  voterUserData,
  description,
}: {
  proposal: Proposal;
  displayName: string;
  description: string;
  voterUserData: any;
}) => {
  return (
    <>
      <p className="mb-10 text-center font-space-grotesk text-4xl font-light text-black lg:text-left">{proposal?.title}</p>
      <div className="flex flex-col">
        <p className="font-inter text-xs font-semibold tracking-wide text-black/80">CREATED BY</p>
        <p className="font-space-grotesk text-sm text-black/80">{displayName}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-inter text-xs font-semibold text-black/80">DESCRIPTION</p>
        <p className="font-space-grotesk text-sm text-black/80">{description}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-inter text-xs font-semibold text-black/80">VOTE REQUIREMENTS</p>
        <p className="font-space-grotesk text-sm text-black/80">
          {`Participants in this vote must hold at least one token from whitelisted contracts.`}
        </p>
      </div>
      <div className="my-3 flex -space-x-8">
        {voterUserData
          ? Object.values(voterUserData)
              ?.slice(0, 7)
              ?.map((user: any, idx) => {
                return (
                  <div
                    key={user?.displayName + idx + "voterData"}
                    className="aspect-square max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px] rounded-full border-4 border-white lg:max-h-[75px]  lg:min-h-[75px] lg:min-w-[75px] lg:max-w-[75px]"
                  >
                    <Image
                      src={user?.profilePicture}
                      alt={"cover"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="aspect-square rounded-full object-cover"
                      style={{
                        height: "100%",
                        width: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                );
              })
          : null}
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col">
          <p className="font-inter text-xs font-semibold text-black/80">START TIME</p>
          <p className="mt-1 font-space-grotesk text-sm text-black/80">{formatTime(proposal?.start_time.toString())}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-inter text-xs font-semibold text-black/80">END TIME</p>
          <p className="mt-1 font-space-grotesk text-sm text-black/80">{formatTime(proposal?.end_time.toString())}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
