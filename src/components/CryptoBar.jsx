import React, { useEffect, useState } from 'react';

const CryptoBar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch live data from CoinGecko API (Free tier)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,matic-network&vs_currencies=usd&include_24hr_change=true')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null; // Don't show if loading/error

  const coins = [
    { name: "BTC", id: "bitcoin", symbol: "₿" },
    { name: "ETH", id: "ethereum", symbol: "Ξ" },
    { name: "SOL", id: "solana", symbol: "◎" },
    { name: "MATIC", id: "matic-network", symbol: "∞" },
  ];

  return (
    <div className="bg-black border-b border-white/10 py-2 overflow-hidden flex justify-center relative z-50">
      <div className="flex gap-8 text-xs font-mono font-bold tracking-widest">
        {coins.map(coin => {
          const price = data[coin.id]?.usd;
          const change = data[coin.id]?.usd_24h_change;
          const isPositive = change >= 0;

          return (
            <div key={coin.id} className="flex items-center gap-2">
              <span className="text-gray-400">{coin.name}</span>
              <span className="text-white">${price?.toLocaleString()}</span>
              <span className={isPositive ? "text-green-400" : "text-red-400"}>
                {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoBar;