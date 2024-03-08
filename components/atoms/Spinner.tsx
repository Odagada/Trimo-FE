function Spinner() {
  return (
    <div className="flex h-560 flex-col items-center justify-center gap-15 bg-white tablet:gap-25">
      <span className="text-18 font-medium text-black tablet:text-[28px]">Loading...</span>
      <div className="flex gap-15 tablet:gap-25">
        <div className="size-20 animate-bounce rounded-full bg-black [animation-delay:-0.3s] tablet:size-30">di</div>
        <div className="size-20 animate-bounce rounded-full bg-black [animation-delay:-0.15s] tablet:size-30"></div>
        <div className="size-20 animate-bounce rounded-full bg-black tablet:size-30"></div>
      </div>
    </div>
  );
}

export default Spinner;
