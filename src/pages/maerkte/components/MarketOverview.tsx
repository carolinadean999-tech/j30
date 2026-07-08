import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  market: string;
  sparkline: number[];
}

// Sparkline Mini Chart Component
const SparklineChart = ({ data, positive }: { data: number[]; positive: boolean }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  const gradientId = `gradient-${positive ? 'up' : 'down'}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={positive ? '#10b981' : '#ef4444'} stopOpacity="0.4" />
          <stop offset="100%" stopColor={positive ? '#10b981' : '#ef4444'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#${gradientId})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#10b981' : '#ef4444'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Generate random sparkline data
const generateSparkline = (baseValue: number, volatility: number = 0.02): number[] => {
  const points: number[] = [];
  let current = baseValue;
  for (let i = 0; i < 20; i++) {
    current = current * (1 + (Math.random() - 0.5) * volatility);
    points.push(current);
  }
  return points;
};

const MarketOverview = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.34, changePercent: 1.33, market: 'NASDAQ', sparkline: generateSparkline(178) },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.78, change: -1.23, changePercent: -0.30, market: 'NASDAQ', sparkline: generateSparkline(412) },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: 3.12, changePercent: 2.24, market: 'NASDAQ', sparkline: generateSparkline(142) },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.92, change: 5.67, changePercent: 2.33, market: 'NASDAQ', sparkline: generateSparkline(248) },
    { symbol: 'SAP', name: 'SAP SE', price: 168.34, change: 1.89, changePercent: 1.13, market: 'XETRA', sparkline: generateSparkline(168) },
    { symbol: 'SIE', name: 'Siemens AG', price: 182.56, change: -0.78, changePercent: -0.43, market: 'XETRA', sparkline: generateSparkline(182) },
    { symbol: 'VOW3', name: 'Volkswagen AG', price: 124.45, change: 2.12, changePercent: 1.73, market: 'XETRA', sparkline: generateSparkline(124) },
    { symbol: 'BAYN', name: 'Bayer AG', price: 34.67, change: -0.45, changePercent: -1.28, market: 'XETRA', sparkline: generateSparkline(34) },
    { symbol: 'HSBA', name: 'HSBC Holdings', price: 6.78, change: 0.12, changePercent: 1.80, market: 'LSE', sparkline: generateSparkline(6.78) },
    { symbol: 'BP', name: 'BP plc', price: 5.23, change: -0.08, changePercent: -1.51, market: 'LSE', sparkline: generateSparkline(5.23) },
    { symbol: '7203', name: 'Toyota Motor', price: 2456.00, change: 34.00, changePercent: 1.40, market: 'TSE', sparkline: generateSparkline(2456) },
    { symbol: '9984', name: 'SoftBank Group', price: 6234.00, change: -89.00, changePercent: -1.41, market: 'TSE', sparkline: generateSparkline(6234) },
  ]);

  const [priceFlash, setPriceFlash] = useState<Record<string, 'up' | 'down' | null>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const oldPrice = stock.price;
          const randomChange = (Math.random() - 0.5) * 2;
          const newPrice = stock.price + randomChange;
          const newChange = stock.change + randomChange;
          const newChangePercent = (newChange / stock.price) * 100;
          const newSparkline = [...stock.sparkline.slice(1), newPrice];

          // Set flash effect
          setPriceFlash(prev => ({
            ...prev,
            [stock.symbol]: newPrice > oldPrice ? 'up' : newPrice < oldPrice ? 'down' : null
          }));

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(newChange.toFixed(2)),
            changePercent: parseFloat(newChangePercent.toFixed(2)),
            sparkline: newSparkline
          };
        })
      );

      // Clear flash effect after animation
      setTimeout(() => setPriceFlash({}), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const markets = ['Alle', 'NASDAQ', 'XETRA', 'LSE', 'TSE'];
  const [selectedMarket, setSelectedMarket] = useState('Alle');

  const filteredStocks = selectedMarket === 'Alle'
    ? stocks
    : stocks.filter(stock => stock.market === selectedMarket);

  const getMarketColor = (market: string) => {
    switch(market) {
      case 'NASDAQ': return 'from-blue-500 to-indigo-600';
      case 'XETRA': return 'from-primary to-primary-dark';
      case 'LSE': return 'from-red-500 to-rose-600';
      case 'TSE': return 'from-rose-500 to-pink-600';
      default: return 'from-accent-gold to-accent-gold-dark';
    }
  };

  const getCurrencySymbol = (market: string) => {
    switch(market) {
      case 'TSE': return '¥';
      case 'LSE': return '£';
      case 'XETRA': return '€';
      default: return '$';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring' as const, bounce: 0.3, duration: 0.6 }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-dark to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-gold rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-light rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-green-500 rounded-full relative" />
            </div>
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Live Trading</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Internationale Aktien
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Live-Kurse führender Unternehmen weltweit mit Echtzeit-Updates
          </p>
        </motion.div>

        {/* Market Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          {markets.map((market) => (
            <motion.button
              key={market}
              onClick={() => setSelectedMarket(market)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedMarket === market
                  ? 'bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary shadow-lg shadow-accent-gold/30'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              {market}
            </motion.button>
          ))}
        </motion.div>

        {/* Stocks Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMarket}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredStocks.map((stock) => (
              <motion.div
                key={stock.symbol}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 overflow-hidden cursor-pointer ${
                  priceFlash[stock.symbol] === 'up'
                    ? 'border-green-500/50 shadow-lg shadow-green-500/20'
                    : priceFlash[stock.symbol] === 'down'
                    ? 'border-red-500/50 shadow-lg shadow-red-500/20'
                    : 'border-white/10 hover:border-accent-gold/30'
                }`}
              >
                {/* Card Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getMarketColor(stock.market)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Market Badge & Live Indicator */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${getMarketColor(stock.market)}`}>
                    <span className="text-xs font-bold text-white">{stock.market}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-500">LIVE</span>
                  </div>
                </div>

                {/* Stock Info */}
                <div className="mb-3 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stock.symbol}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium">{stock.name}</p>
                </div>

                {/* Sparkline Chart */}
                <div className="relative mb-4 -mx-2">
                  <SparklineChart data={stock.sparkline} positive={stock.changePercent >= 0} />
                </div>

                {/* Price */}
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <motion.div
                      key={stock.price}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className={`text-2xl font-bold mb-1 ${
                        priceFlash[stock.symbol] === 'up'
                          ? 'text-green-400'
                          : priceFlash[stock.symbol] === 'down'
                          ? 'text-red-400'
                          : 'text-white'
                      }`}
                    >
                      {getCurrencySymbol(stock.market)}{stock.price.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${
                      stock.changePercent >= 0
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    <span>{stock.changePercent >= 0 ? '↑' : '↓'}</span>
                    <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Aktien gesamt', value: stocks.length, icon: '📊' },
            { label: 'Märkte', value: markets.length - 1, icon: '🌍' },
            { label: 'Gewinner', value: filteredStocks.filter(s => s.changePercent > 0).length, icon: '📈' },
            { label: 'Verlierer', value: filteredStocks.filter(s => s.changePercent < 0).length, icon: '📉' },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarketOverview;
