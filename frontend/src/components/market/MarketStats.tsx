import { useContext, useMemo } from "react";
import { TradesContext } from "../../state/TradesProvider";

function MarketStats() {
  const { ticker } = useContext(TradesContext);

  const stats = useMemo(() => {
    if (!ticker) return [];

    return [
      { label: "MARK PRICE", value: ticker.markPrice },
      { label: "INDEX PRICE", value: ticker.indexPrice },
      {
        label: "24H CHANGE",
        value:
          ticker?.priceChange && ticker?.priceChangePercent
            ? `${
                parseFloat(ticker?.priceChange) > 0
                  ? "+" + ticker.priceChange
                  : "-" + ticker.priceChange
              } / ${ticker?.priceChangePercent + "%"}`
            : "- / -",
        className:
          parseFloat(ticker.priceChangePercent) >= 0
            ? "text-green"
            : "text-red",
      },
      {
        label: "1H FUNDING",
        value: `${ticker?.oneHrFundingRate}%`, // Add the percentage sign here
        className:
          parseFloat(ticker?.oneHrFundingRate) >= 0 ? "text-green" : "text-red",
      },
      {
        label: "FUNDING APY",
        value: "10%",
        className: "text-green",
      },
      { label: "OPEN INTEREST", value: "137,625.79" }, // Assuming open interest is static
      { label: "24H VOLUME", value: "3,157,834.47" }, // Assuming volume is static
    ];
  }, [ticker]);

  return (
    <div className="flex items-center gap-4 px-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col gap-0.5 min-w-26 text-nowrap ${
            stat.className || ""
          }`}
        >
          <div className="flex flex-1 items-center justify-start font-mono text-sm capitalize text-vestgrey-100">
            {stat.label}
          </div>
          <div
            className={`flex flex-1 items-center justify-start text-xl font-semibold ${
              stat.className || "text-vestgrey-50"
            }`}
          >
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarketStats;
