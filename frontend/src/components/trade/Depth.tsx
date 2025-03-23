import { useContext, useEffect, useState } from "react";
import { OrderBook } from "./depth/Orderbook";
import { RecentTrades } from "./depth/RecentTrades";
import { TradesContext } from "../../state/TradesProvider";
import { getTrades } from "../../services/api";
import { WsManager } from "../../utils/ws_manager";
import { Trade } from "../../utils/types";
import { DepthData } from "../../utils/ws_types";

export const Depth = ({ market }: { market: string }) => {
  const [activeTab, setActiveTab] = useState("orderbook"); // 'orderbook' or 'recentTrades'
  const [valueSymbol, setValueSymbol] = useState(market?.split("-")[0]);
  const { setTrades, setAsks, setBids, setTotalAskSize, setTotalBidSize } =
    useContext(TradesContext);

  useEffect(() => {
    getTrades(market).then((trades) => {
      trades = trades.filter((trade) => parseFloat(trade.qty) !== 0);
      trades = trades.slice(0, 50);
      setTrades(trades);
    });

    WsManager.getInstance().registerCallback<DepthData>(
      "depth",
      (data: DepthData) => {
        setBids(data.bids);
        setAsks(data.asks);
        setTotalBidSize(
          data.bids.reduce(
            (acc: number, bid: [string, string]) => acc + parseFloat(bid[1]),
            0
          )
        );

        setTotalAskSize(
          data.asks.reduce(
            (acc: number, ask: [string, string]) => acc + parseFloat(ask[1]),
            0
          )
        );
      },
      `${market}@depth`
    );

    WsManager.getInstance().registerCallback<Trade>(
      "trades",
      (data: Trade) => {
        const newTrade: Trade = {
          id: data.id,
          price: data.price,
          qty: data.qty,
          quoteQty: data.quoteQty,
          time: data.time,
        };

        setTrades((oldTrades) => {
          const newTrades = [...oldTrades];
          newTrades.unshift(newTrade);
          newTrades.pop();
          return newTrades;
        });
      },
      `${market}@trades`
    );

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market}@depth`],
    });

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market}@trades`],
    });

    return () => {
      WsManager.getInstance().deRegisterCallback("depth", `${market}@depth`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market}@depth`],
      });

      WsManager.getInstance().deRegisterCallback("trades", `${market}@trades`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market}@trades`],
      });
    };
  }, [market, setAsks, setBids, setTotalAskSize, setTotalBidSize, setTrades]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSymbol(e.target.value);
  };

  return (
    <div className="flex w-full max-w-[300px] flex-col border-l border-border">
      <div className="flex flex-col">
        {/* Tabs Section */}
        <div className="relative">
          <div className="flex border-b border-border">
            <div
              onClick={() => setActiveTab("orderbook")}
              className={`py-2 px-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover justify-center leading-[16px] flex-1 ${
                activeTab === "orderbook"
                  ? "text-text-emphasis bg-container-bg-selected"
                  : "text-text-label"
              }`}
            >
              <span
                className={`flex items-center justify-center overflow-hidden whitespace-nowrap px-8 py-1 font-mono text-sm font-normal uppercase transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none" ${
                  activeTab === "orderbook" &&
                  "[text-shadow:_0_0_30px_rgb(255,90,68)] border-primary text-primary"
                }`}
              >
                DEPTH
              </span>
              {activeTab === "orderbook" && (
                <div className="absolute left-0 bottom-0 w-full z-10 h-[1px] bg-primary"></div>
              )}
            </div>

            <div
              onClick={() => setActiveTab("recentTrades")}
              className={`py-2 px-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover justify-center leading-[16px] flex-1 ${
                activeTab === "recentTrades"
                  ? "text-text-emphasis bg-container-bg-selected"
                  : "text-text-label"
              }`}
            >
              <span
                className={`flex items-center justify-center overflow-hidden whitespace-nowrap px-8 py-1 font-mono text-sm font-normal uppercase transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none" ${
                  activeTab === "recentTrades" &&
                  "[text-shadow:_0_0_30px_rgb(255,90,68)] border-primary text-primary"
                }`}
              >
                TRADES
              </span>
              {activeTab === "recentTrades" && (
                <div className="absolute left-0 bottom-0 w-full z-10 h-[1px] bg-primary"></div>
              )}
            </div>
            <div className="flex items-center justify-center mr-2 focus:outline-none">
              <select
                className="bg-background text-sm focus:outline-none"
                value={valueSymbol}
                onChange={handleSelectChange}
              >
                <option
                  className="hover:bg-vestgrey-900 focus:bg-vestgrey-900"
                  value={market?.split("-")[0]}
                >
                  {market?.split("-")[0]}
                </option>
                <option value="USDC">USDC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Custom style for WebKit-based browsers to hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}</style>

        {/* Tab Content */}
        {activeTab === "orderbook" ? (
          <OrderBook valueSymbol={valueSymbol} />
        ) : (
          <RecentTrades />
        )}
      </div>
    </div>
  );
};
