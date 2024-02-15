import ProgressChip from "../atoms/ProgressChip";

interface ProgressNavProps {
  stepArray: number[];
}

function Line() {
  return <div className="w-30 h-1 bg-black"></div>;
}

function ProgressNavigator({ stepArray = [1, 0, 0] }: ProgressNavProps) {
  return (
    <div className="w-fit h-[30px] relative flex items-center">
      {stepArray.map((isOnstep, index) => (
        <>
          {isOnstep ? (
            <ProgressChip isOnProgress num={index + 1} key={index} />
          ) : (
            <ProgressChip num={index + 1} key={index} />
          )}
          {index + 1 < stepArray.length && <Line />}
        </>
      ))}
    </div>
  );
}

export default ProgressNavigator;
