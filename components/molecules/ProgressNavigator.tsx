import ProgressChip from "../atoms/ProgressChip";

interface ProgressNavProps {
  stepArray: number[];
}

function Line() {
  return <div className="h-1 w-30 bg-black"></div>;
}

function ProgressNavigator({ stepArray = [1, 0, 0] }: ProgressNavProps) {
  return (
    <div className="relative flex h-30 w-fit items-center">
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
