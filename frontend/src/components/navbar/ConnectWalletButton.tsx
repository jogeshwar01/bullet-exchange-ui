import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function ConnectWalletButton() {
  const { publicKey, disconnect } = useWallet();

  const handleClick = () => {
    // Trigger the WalletMultiButton click
    const walletButton = document.querySelector(
      ".wallet-adapter-button.wallet-adapter-button-trigger"
    );
    if (walletButton instanceof HTMLElement) walletButton.click();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="relative flex gap-4 border-l border-border pr-8 font-mono text-sm w-[80%] max-w-xs">
      <div className="grid w-full">
        <div className="flex w-full items-center justify-between">
          {publicKey ? (
            <div className="flex items-center">
              <button
                onClick={handleDisconnect}
                className="cursor-pointer text-md min-w-[90%] inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-background shadow hover:bg-primary/90 px-4 py-0 ml-6 h-11 w-full rounded-none font-mono font-normal uppercase tracking-wider text-base"
              >
                <img src="/favicon.svg" alt="Wallet" className="w-4 h-4 mr-2" />
                {publicKey.toBase58().substring(0, 24) + "..."}
              </button>
            </div>
          ) : (
            <button
              onClick={handleClick}
              className="cursor-pointer text-md inline-flex min-w-[90%] items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-background shadow hover:bg-primary/90 px-4 py-0 ml-6 h-11 w-full rounded-none font-mono font-normal uppercase tracking-wider text-base"
            >
              CONNECT YOUR WALLET
            </button>
          )}
        </div>
      </div>
      <div className="hidden">
        <WalletMultiButton />
      </div>
    </div>
  );
}

export default ConnectWalletButton;
