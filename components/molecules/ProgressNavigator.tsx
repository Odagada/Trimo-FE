import ProgressChip from "../atoms/ProgressChip";

interface ProgressNavProps {
  stepArray: number[];
}

function Line() {
  return <div className="tablet:w-30 tablet:h-1 h-[0.5px] w-14  bg-black"></div>;
}

function ProgressNavigator({ stepArray = [1, 0, 0] }: ProgressNavProps) {
  return (
    <div className="w-fit tablet:h-30 h-17 relative flex items-center">
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
