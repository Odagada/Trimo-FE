interface ChipProps {
  num: number;
  isOnProgress?: boolean;
}
function ProgressChip({ num, isOnProgress = false }: ChipProps) {
  return isOnProgress ? (
    <div className="text-bold h-[30px]  w-[30px] rounded-full bg-black py-3 text-center text-16 text-white">{num}</div>
  ) : (
    <div className="border-zinc-800 text-bold  h-[30px] w-[30px] rounded-full border bg-white py-2 text-center text-16">
      {num}
    </div>
  );
}

export default ProgressChip;
