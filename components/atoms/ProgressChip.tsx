interface ChipProps {
  num: number;
  isOnProgress?: boolean;
}
function ProgressChip({ num, isOnProgress = false }: ChipProps) {
  return isOnProgress ? (
    <div className="flex size-17 items-center justify-center rounded-full bg-black text-10 font-bold text-white tablet:size-30 tablet:text-16">
      {num}
    </div>
  ) : (
    <div className="border-zinc-800 flex size-17 items-center justify-center  rounded-full border-[0.6px] bg-white text-10 font-bold tablet:size-30 tablet:border tablet:text-16">
      {num}
    </div>
  );
}

export default ProgressChip;
