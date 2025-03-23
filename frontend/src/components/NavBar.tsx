import ConnectWalletButton from "./navbar/ConnectWalletButton";

function NavBar() {
  return (
    <>
      <div className="relative col-span-4 grid flex-1 grid-cols-[1fr_max-content_max-content] font-mono">
        <div className="flex gap-1 px-8">
          <a
            href="https://vest.exchange/"
            target="_blank"
            rel="noreferrer"
            className="mr-12 flex items-center gap-2"
          >
            <img src="/logo.svg" alt="Vest" className="h-4" />
            <img src="/vest.svg" alt="Vest" className="h-4" />
          </a>
          <a
            className="flex items-center gap-0.5 px-6 text-center text-sm"
            href="/trade/ETH-PERP"
          >
            TRADE
          </a>
          <a
            className="flex items-center gap-0.5 px-6 text-center text-sm text-vestgrey-100"
            href="/markets"
          >
            MARKETS
          </a>
          <a
            className="flex items-center gap-0.5 px-6 text-center text-sm text-vestgrey-100"
            href="/portfolio"
          >
            PORTFOLIO
          </a>
          <a
            className="flex items-center gap-0.5 px-6 text-center text-sm uppercase text-vestgrey-100"
            href="/liquidity-providing"
          >
            Liquidity Providing
          </a>
          <a
            className="flex items-center gap-0.5 px-6 text-center text-sm uppercase text-vestgrey-100"
            href="/referrals"
          >
            Referrals
          </a>
          <a
            className="flex items-center gap-0.5 px-6 text-center text-sm uppercase text-vestgrey-100"
            href="/points"
          >
            Points
          </a>
        </div>
      </div>
      <ConnectWalletButton />
    </>
  );
}

export default NavBar;
