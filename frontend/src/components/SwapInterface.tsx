import { useState } from "react";
import { OrderType } from "../utils/types";
import OrderTypeBar from "./swap/OrderTypeBar";
import SwapForm from "./swap/SwapForm";
import SwapMarket from "./swap/SwapMarket";

const SwapInterface: React.FC<{ market: string }> = ({ market }) => {
  const [orderType, setOrderType] = useState<OrderType>(OrderType.BUY);

  return (
    <div className="flex h-full flex-col border-r border-border">
      <div className="mx-2">
        <SwapMarket />
        <OrderTypeBar orderType={orderType} setOrderType={setOrderType} />
        <SwapForm market={market} />
      </div>
    </div>
  );
};

export default SwapInterface;
