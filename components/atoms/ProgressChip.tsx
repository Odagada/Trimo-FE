interface ChipProps {
  num: number;
  isOnProgress?: boolean;
}
function ProgressChip({ num, isOnProgress = false }: ChipProps) {
  return isOnProgress ? (
    <div className="flex justify-center items-center tablet:w-30 tablet:h-30 w-17 h-17 bg-black rounded-full text-white tablet:text-16 text-10 font-bold">
      {num}
    </div>
  ) : (
    <div className="flex justify-center items-center tablet:w-30 tablet:h-30  w-17 h-17 border-[0.6px] bg-white rounded-full tablet:border border-zinc-800 tablet:text-16 text-10 font-bold">
      {num}
    </div>
  );
}

export default ProgressChip;
