import { useState } from "react";
import { Position, OrderType } from "../utils/types";
import PositionBar from "./swap/PositionBar";
import OrderTypeBar from "./swap/OrderTypeBar";
import SwapForm from "./swap/SwapForm";

const SwapInterface: React.FC<{ market: string }> = ({ market }) => {
  const [position, setPosition] = useState<Position>(Position.LONG);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.MARKET);

  return (
    <div className="flex h-full flex-col">
      <div className="w-full">
        <PositionBar position={position} setPosition={setPosition} />
      </div>
      <div className="w-full">
        <OrderTypeBar orderType={orderType} setOrderType={setOrderType} />
      </div>
      <SwapForm market={market} />
    </div>
  );
};

export default SwapInterface;
