import { Navigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import PromoteBar from "../components/PromoteBar";
import MarketBar from "../components/MarketBar";
import SwapInterface from "../components/SwapInterface";
import TradeInterface from "../components/TradeInterface";
import { Helmet } from "react-helmet";
import { useContext, useMemo } from "react";
import { TradesContext } from "../state/TradesProvider";

export const Trade = () => {
  const { market } = useParams();
  const { ticker, tickers } = useContext(TradesContext);

  const isTickerValid = useMemo(() => {
    if (!tickers.length) return true;

    return tickers.some((t) => t.symbol === market);
  }, [market, tickers]);

  if (!isTickerValid) {
    return <Navigate to="/trade/ETH-PERP" />;
  }

  return (
    <div className="flex h-full flex-col">
      <Helmet>
        <title>{`${
          ticker?.symbol && ticker?.markPrice
            ? ticker?.markPrice + " | " + ticker?.symbol + " | "
            : ""
        } Vest`}</title>
        <meta name="description" content="Markets Without Manipulation" />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
      </Helmet>

      <div className="flex flex-col gap-8 lg:hidden uppercase h-[100vh] text-2xl font-mono w-full justify-center items-center">
        <div className="flex gap-2 items-center">
          <img src="/logo.svg" alt="Vest" className="h-8 mr-2" />
          <img src="/vest.svg" alt="Vest" className="h-6" />
        </div>
        <div>Mobile Trading Coming soon</div>
      </div>

      <div className="hidden lg:flex items-center justify-between border-b border-border px-8 py-2.5">
        <PromoteBar />
      </div>

      <header className="hidden h-15 shrink-0 grid-cols-5 border-b border-border bg-background lg:flex">
        <NavBar />
      </header>

      <main className="h-full">
        <div className="hidden h-full lg:block">
          <div className="flex h-full flex-col">
            <div className="grid h-[56px] shrink-0 grid-cols-5 border-b border-border bg-background">
              <MarketBar market={market as string} />
            </div>
            <div className="flex flex-1">
              <div className="flex flex-1 flex-col">
                <TradeInterface market={market as string} />
              </div>
              <div className="flex w-full max-w-sm flex-col border-l border-border bg-background lg:max-w-xs">
                <SwapInterface market={market as string} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
