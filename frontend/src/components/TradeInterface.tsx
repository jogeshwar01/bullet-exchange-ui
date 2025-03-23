import { Depth } from "./trade/Depth";
import { OrdersMenu } from "./trade/OrdersMenu";
import { TradeView } from "./trade/TradeView";

function TradeInterface({ market }: { market: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-1">
        <TradeView market={market as string} />
        <Depth market={market as string} />
      </div>
      <OrdersMenu />
    </div>
  );
}

export default TradeInterface;
