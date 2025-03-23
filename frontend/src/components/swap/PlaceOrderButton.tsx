// PlaceOrderButton.tsx
import React, { useState } from "react";
import useSound from "use-sound";
import pingSound from "./Ping.wav";
import ConfettiWithTriangles from "./TriangleConfetti";

interface PlaceOrderButtonProps {
  onClick: () => void;
}

const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({ onClick }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [play] = useSound(pingSound);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    play();

    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    onClick();
  };

  return (
    <div>
      {showConfetti && <ConfettiWithTriangles />}

      <button
        onClick={handleClick}
        className="w-full h-12 bg-primary disabled:opacity-50 text-black font-mono text-md uppercase cursor-pointer hover:opacity-80"
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrderButton;
