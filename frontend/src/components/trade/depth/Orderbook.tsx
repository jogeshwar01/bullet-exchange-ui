import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { TradesContext } from "../../../state/TradesProvider";

interface OrderBookProps {
  valueSymbol: string;
}

export const OrderBook = ({ valueSymbol }: OrderBookProps) => {
  const { ticker, bids, asks, totalBidSize, totalAskSize } =
    useContext(TradesContext);

  const bidsRef = useRef<HTMLDivElement | null>(null);
  const asksRef = useRef<HTMLDivElement | null>(null);

  const [spread, setSpread] = useState<number>(0);
  const [spreadPercentage, setSpreadPercentage] = useState<number>(0);
  const [flashBidsAsk, setFlashBidsAsks] = useState<boolean>(false);

  const calculateCumulativeWidth = (
    cumulativeSize: number,
    totalSize: number
  ): string => {
    return totalSize ? `${(cumulativeSize * 100) / totalSize}%` : "0%";
  };

  // Calculate the highest bid and lowest ask, and then calculate the spread
  const { highestBid, lowestAsk } = useMemo(() => {
    const highestBid = bids && bids[0] ? parseFloat(bids[0][0]) : 0;
    const lowestAsk = asks && asks[0] ? parseFloat(asks[0][0]) : 0;
    return { highestBid, lowestAsk };
  }, [bids, asks]);

  // Update spread whenever highestBid or lowestAsk changes
  useEffect(() => {
    if (highestBid && lowestAsk) {
      const newSpread = lowestAsk - highestBid;
      setSpread(newSpread);
      setSpreadPercentage(
        newSpread && highestBid ? (newSpread / highestBid) * 100 : 0
      );
    } else {
      setSpread(0);
      setSpreadPercentage(0);
    }
  }, [highestBid, lowestAsk]);

  // Detect changes in bids or asks to trigger flash effect
  useEffect(() => {
    setFlashBidsAsks(true);
    const timeout = setTimeout(() => setFlashBidsAsks(false), 100); // Flash for 200ms
    return () => clearTimeout(timeout);
  }, [asks, bids]);

  // Cumulative calculation for bids and asks
  let cumulativeBidSize = 0;
  let cumulativeAskSize = 0;

  return (
    <div className="h-full">
      {/* Order Book */}
      <div className="relative h-full bg-background">
        <div className="flex flex-col h-full text-white fadein-floating-element bg-background xs:min-h-[25vh] md:min-h-0">
          <div className="flex justify-between text-xs px-2 py-1 text-vestgrey-100">
            <div className="font-[300] text-[12px] text-center">Price</div>
            <div className="font-[300] text-[12px] ml-8">
              Size ({ticker?.symbol?.split("-")?.[0]})
            </div>
            <div className="font-[300] text-[12px] text-left">
              Total ({ticker?.symbol?.split("-")?.[0]})
            </div>
          </div>

          <div className="flex-1 flex flex-col relative overflow-hidden">
            {/* Asks Scrollable Area (now at top and green) */}
            <div
              ref={asksRef}
              className="flex-1 overflow-y-auto flex flex-col-reverse"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {asks?.slice(0, 10)?.map((order, index) => {
                const size = parseFloat(order[1]);
                cumulativeAskSize += size; // Keep track of cumulative size

                return (
                  <div key={index} className="relative w-full my-[2px]">
                    <div className="w-full h-5 flex items-center relative box-border text-xs leading-7 justify-between font-display mr-0">
                      <div className="flex flex-row mx-2 justify-between font-mono w-full">
                        <div className="z-10 text-xs leading-6 text-green">
                          {parseFloat(order[0]).toFixed(3)}
                        </div>
                        <div className="z-10 text-xs leading-6 text-white">
                          {valueSymbol !== "USDC"
                            ? order[1]
                            : (
                                parseFloat(order[1]) * parseFloat(order[0])
                              ).toFixed(3)}
                        </div>
                        <div className="z-10 text-xs leading-6 text-white">
                          {cumulativeAskSize.toFixed(3)}
                        </div>
                      </div>
                      {/* Cumulative background */}
                      <div className="absolute opacity-10 w-full h-full flex justify-start">
                        <div
                          className={`h-full brightness-80 ${
                            flashBidsAsk ? "bg-green-200" : "bg-green"
                          }`}
                          style={{
                            width: calculateCumulativeWidth(
                              cumulativeAskSize,
                              totalAskSize
                            ),
                            transition: "width 0.3s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Orderbook Spread */}
            <div className="relative w-full px-2 inline-flex font-mono justify-center gap-4 items-center py-1 min-h-[26px] bg-vestgrey-800 text-white z-20">
              <div className="font-[300] text-[13px] leading-[16px] text-white">
                Spread
              </div>
              <div className="text-xs">
                {spread > 0 ? `${spread.toFixed(4)}` : "-"}
              </div>
              <div className="text-xs">
                {spread > 0 && `${spreadPercentage.toFixed(1)}%`}
              </div>
            </div>

            {/* Bids Scrollable Area (now at bottom and red) */}
            <div
              ref={bidsRef}
              className="flex-1 overflow-y-auto flex flex-col"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {bids?.slice(0, 10)?.map((order, index) => {
                const size = parseFloat(order[1]);
                cumulativeBidSize += size; // Keep track of cumulative size

                return (
                  <div key={index} className="relative w-full my-[2px]">
                    <div className="w-full h-5 flex items-center relative box-border text-xs leading-7 justify-between font-display ml-0">
                      <div className="flex flex-row mx-2 justify-between font-mono w-full">
                        <div className="z-10 text-xs leading-6 text-red">
                          {parseFloat(order[0]).toFixed(3)}
                        </div>
                        <div className="z-10 text-xs leading-6 text-white">
                          {valueSymbol !== "USDC"
                            ? order[1]
                            : (
                                parseFloat(order[1]) * parseFloat(order[0])
                              ).toFixed(3)}
                        </div>
                        <div className="z-10 text-xs leading-6 text-white">
                          {cumulativeBidSize.toFixed(3)}
                        </div>
                      </div>
                      {/* Cumulative background */}
                      <div className="absolute opacity-10 w-full h-full flex justify-start">
                        <div
                          className={`h-full brightness-80 ${
                            flashBidsAsk ? "bg-red-300" : "bg-red"
                          }`}
                          style={{
                            width: calculateCumulativeWidth(
                              cumulativeBidSize,
                              totalBidSize
                            ),
                            transition: "width 0.3s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
