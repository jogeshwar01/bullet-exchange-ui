import { useMemo } from "react";
import "./swapStyles.css";
import PlaceOrderButton from "./PlaceOrderButton";

const SwapForm: React.FC<{ market: string }> = ({ market }) => {
  const infoSections = [
    { label: "Available Funds", value: "-" },
    { label: "Price", value: "1,913.382" },
  ];

  const orderInfo = useMemo(() => {
    return [
      { label: "Liquidation Price", value: "-" },
      {
        label: "Order Size",
        value: `0.000 ${market?.split("-")?.[0] || ""} (-)`,
      },
      { label: "Fee", value: "0.01% (-)" },
    ];
  }, [market]);

  const accountHealthInfo = [
    { label: "Account Health", value: "-" },
    { label: "Account Value", value: "-" },
    { label: "Maintenance Margin", value: "-" },
    { label: "Leverage", value: "-" },
    { label: "Unrealized PNL", value: "-" },
  ];

  const percentageValues = [25, 50, 75, 100];
  const checkboxes = ["Reduce Only", "TP/SL"];

  const handlePlaceOrder = () => {
    // Place order logic can go here
  };

  return (
    <form className="relative flex-1">
      <div className="h-full w-full">
        <div className="relative overflow-hidden h-full">
          <div className="h-full w-full overflow-y-auto">
            <div className="flex h-full flex-col">
              {/* Funds & Price */}
              <div className="flex flex-col px-2 py-1.5">
                {infoSections.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-9 items-center justify-between px-2.5"
                  >
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <p className="font-mono text-white text-sm">{item.value}</p>
                  </div>
                ))}

                {/* Size Input */}
                <div className="mt-1.5">
                  <div className="flex items-center justify-between px-2.5 py-1.5 text-white h-9">
                    <p className="text-gray-400 text-sm">Size</p>
                    <div className="flex items-center">
                      <input
                        className="h-9 w-full px-2.5 py-1.5 bg-vestgrey-800 text-white font-mono text-sm max-w-[12ch] outline-none"
                        placeholder="0.00"
                      />
                      <button
                        disabled
                        className="flex h-9 disabled items-center gap-1.5 bg-vestgrey-800 p-1.5 text-center font-mono text-sm"
                      >
                        <span className="text-white">USDC</span>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-400"
                        >
                          <path
                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Leverage Slider */}
                <div className="flex flex-col px-2.5 py-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      id="lever-input"
                      disabled
                      min="0"
                      max="100"
                      defaultValue="100"
                      className="w-full cursor-pointer"
                    />
                    <input
                      disabled
                      className="h-9 w-full px-2.5 py-1.5 bg-vestgrey-800 text-white font-mono text-sm max-w-[50px] outline-none"
                      placeholder="100%"
                    />
                  </div>
                </div>

                {/* Percentage Buttons */}
                <div className="grid grid-cols-4 border border-border m-3 mt-0">
                  {percentageValues.map((value) => (
                    <button
                      disabled
                      key={value}
                      className="w-full p-2 border-r border-border text-white text-sm"
                    >
                      {value}%
                    </button>
                  ))}
                </div>

                {/* Checkboxes */}
                <div className="flex gap-22 mt-3 mx-3">
                  {checkboxes.map((label, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-1.5 text-white cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        id="checkbox-input"
                        className="h-4 w-4 border border-gray-400"
                      />
                      {label}
                    </label>
                  ))}
                </div>

                {/* Slippage */}
                <div className="mt-15">
                  <div className="flex items-center justify-between px-2.5 py-1.5 text-vestgrey-100 text-sm">
                    <p>Slippage</p>
                    <div className="flex items-center gap-1.5">
                      <p>Est: - / Max</p>
                      <input
                        type="text"
                        disabled
                        className="w-14 bg-vestgrey-800 p-2 text-white text-center outline-none"
                        placeholder="5.00%"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="mt-3">
                  {orderInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-2.5 py-1.5 text-gray-400 text-sm"
                    >
                      <p>{item.label}</p>
                      <p className="font-mono text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <PlaceOrderButton onClick={handlePlaceOrder} />

              {/* Account Health */}
              <div className="px-2 py-3">
                <div className="flex flex-col">
                  {accountHealthInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-2.5 py-1.5 text-gray-400 text-sm"
                    >
                      <p>{item.label}</p>
                      <p className="font-mono text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SwapForm;
