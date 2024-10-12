import ProgressChip from "../atoms/ProgressChip";

interface ProgressNavProps {
  stepArray: number[];
}

function Line() {
  return <div className="h-[0.5px] w-14 bg-black tablet:h-1  tablet:w-30"></div>;
}

function ProgressNavigator({ stepArray = [0, 0, 0] }: ProgressNavProps) {
  if (stepArray[0] === 0) return;
  return (
    <div className="relative flex h-17 w-fit items-center tablet:h-30">
      {stepArray.map((isOnstep, index) => (
        <>
          {isOnstep ? <ProgressChip isOnProgress num={index + 1} /> : <ProgressChip num={index + 1} />}
          {index + 1 < stepArray.length && <Line />}
        </>
      ))}
    </div>
  );
}

export default ProgressNavigator;
