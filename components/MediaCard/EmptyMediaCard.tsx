const EmptyMediaCard = () => {
  return (
    <div className="h-40 w-36 rounded-xl bg-heds-bg-dark shadow-sm shadow-black/50 lg:h-48 lg:w-52">
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div className="h-[50px] w-[50px] rounded-full bg-gray-200/10" />
        <p className="font-space-grotesk text-sm text-black">{""}</p>
      </div>
    </div>
  );
};

export default EmptyMediaCard;
