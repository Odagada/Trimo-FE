interface ChipProps {
  num: number;
  isOnProgress?: boolean;
}
function ProgressChip({ num, isOnProgress = false }: ChipProps) {
  return isOnProgress ? (
    <div className="w-[30px] h-[30px]  bg-black rounded-full text-center text-white py-3 text-16 text-bold">{num}</div>
  ) : (
    <div className="w-[30px] h-[30px]  bg-white rounded-full border border-zinc-800 text-center py-2 text-16 text-bold">
      {num}
    </div>
  );
}

export default ProgressChip;
