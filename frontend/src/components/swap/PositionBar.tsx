// swap/PositionBar.tsx
import { Position } from "../../utils/types";

interface PositionBarProps {
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}

const PositionBar: React.FC<PositionBarProps> = ({ position, setPosition }) => {
  return (
    <div className="inline-flex h-[38px] w-full justify-center text-muted-foreground border-b border-border">
      <button
        type="button"
        className={`inline-flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap px-4 py-2 font-mono text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
          position === Position.LONG ? "shadow bg-green/5 text-green" : ""
        }`}
        onClick={() => setPosition(Position.LONG)}
      >
        LONG
      </button>
      <button
        type="button"
        className={`inline-flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap px-4 py-2 font-mono text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-l border-border ${
          position === Position.SHORT ? "shadow bg-red/5 text-red" : ""
        }`}
        onClick={() => setPosition(Position.SHORT)}
      >
        SHORT
      </button>
    </div>
  );
};

export default PositionBar;
