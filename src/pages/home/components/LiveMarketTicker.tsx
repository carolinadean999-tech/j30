import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Types
interface MarketItem {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: number;
  icon: string;
  color: string;
  sparkline: number[];
}

interface CryptoData {
  [key: string]: {
    eur: number;
    eur_24h_change: number;
  };
}

interface ForexRates {
  rates: {
    [key: string]: number;
  };
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

  return (
    <svg viewBox="0 0 100 100" className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${positive ? 'up' : 'down'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={positive ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
          <stop offset="100%" stopColor={positive ? '#10b981' : '#ef4444'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${positive ? 'up' : 'down'})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#10b981' : '#ef4444'}
        strokeWidth="2"
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

// Initial data for stocks and indices (simulated with realistic values)
const stocksData: MarketItem[] = [
  { id: 'aapl', name: 'Apple', symbol: 'AAPL', value: 185.92, change: 1.24, icon: '', color: 'from-gray-600 to-gray-800', sparkline: generateSparkline(185) },
  { id: 'msft', name: 'Microsoft', symbol: 'MSFT', value: 378.45, change: 0.87, icon: '󰍲', color: 'from-blue-500 to-blue-700', sparkline: generateSparkline(378) },
  { id: 'googl', name: 'Google', symbol: 'GOOGL', value: 141.23, change: -0.32, icon: '󰊭', color: 'from-red-500 to-yellow-500', sparkline: generateSparkline(141) },
  { id: 'amzn', name: 'Amazon', symbol: 'AMZN', value: 178.56, change: 2.15, icon: '󰸏', color: 'from-orange-500 to-orange-700', sparkline: generateSparkline(178) },
  { id: 'tsla', name: 'Tesla', symbol: 'TSLA', value: 248.34, change: -1.45, icon: '󰔐', color: 'from-red-600 to-red-800', sparkline: generateSparkline(248) },
  { id: 'nvda', name: 'NVIDIA', symbol: 'NVDA', value: 495.22, change: 3.67, icon: '󰢮', color: 'from-green-500 to-green-700', sparkline: generateSparkline(495) },
];

const indicesData: MarketItem[] = [
  { id: 'dax', name: 'DAX 40', symbol: 'DE40', value: 16845.32, change: 0.85, icon: '🇩🇪', color: 'from-yellow-500 to-red-600', sparkline: generateSparkline(16845) },
  { id: 'sp500', name: 'S&P 500', symbol: 'US500', value: 4783.45, change: 1.24, icon: '🇺🇸', color: 'from-blue-600 to-red-600', sparkline: generateSparkline(4783) },
  { id: 'nasdaq', name: 'Nasdaq 100', symbol: 'US100', value: 16892.35, change: 1.56, icon: '🇺🇸', color: 'from-cyan-500 to-blue-600', sparkline: generateSparkline(16892) },
  { id: 'ftse', name: 'FTSE 100', symbol: 'UK100', value: 7689.12, change: -0.32, icon: '🇬🇧', color: 'from-blue-700 to-red-700', sparkline: generateSparkline(7689) },
  { id: 'nikkei', name: 'Nikkei 225', symbol: 'JP225', value: 33464.17, change: 0.67, icon: '🇯🇵', color: 'from-red-600 to-white', sparkline: generateSparkline(33464) },
  { id: 'cac', name: 'CAC 40', symbol: 'FR40', value: 7543.28, change: 0.43, icon: '🇫🇷', color: 'from-blue-600 to-red-500', sparkline: generateSparkline(7543) },
];

// Crypto icons mapping
const cryptoIcons: { [key: string]: string } = {
  bitcoin: '₿',
  ethereum: 'Ξ',
  solana: '◎',
  cardano: '₳',
  ripple: '✕',
  dogecoin: 'Ð',
};

const cryptoColors: { [key: string]: string } = {
  bitcoin: 'from-orange-400 to-orange-600',
  ethereum: 'from-purple-400 to-blue-600',
  solana: 'from-purple-500 to-cyan-400',
  cardano: 'from-blue-400 to-blue-600',
  ripple: 'from-gray-600 to-blue-500',
  dogecoin: 'from-yellow-400 to-yellow-600',
};

// Currency info
const currencyInfo: { [key: string]: { name: string; icon: string; color: string } } = {
  USD: { name: 'US Dollar', icon: '$', color: 'from-green-500 to-green-700' },
  GBP: { name: 'British Pound', icon: '£', color: 'from-purple-500 to-purple-700' },
  JPY: { name: 'Japanese Yen', icon: '¥', color: 'from-red-500 to-pink-600' },
  CHF: { name: 'Swiss Franc', icon: '₣', color: 'from-red-600 to-white' },
  TRY: { name: 'Turkish Lira', icon: '₺', color: 'from-red-600 to-red-800' },
  CNY: { name: 'Chinese Yuan', icon: '¥', color: 'from-red-600 to-yellow-500' },
};

const LiveMarketTicker = () => {
  const [activeTab, setActiveTab] = useState('indizes');
  const [stocks, setStocks] = useState<MarketItem[]>(stocksData);
  const [indices, setIndices] = useState<MarketItem[]>(indicesData);
  const [cryptos, setCryptos] = useState<MarketItem[]>([]);
  const [currencies, setCurrencies] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch crypto data from CoinGecko
  const fetchCryptoData = useCallback(async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,dogecoin&vs_currencies=eur&include_24hr_change=true'
      );
      const data: CryptoData = await response.json();

      const cryptoItems: MarketItem[] = Object.entries(data).map(([id, values]) => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        symbol: id.toUpperCase().slice(0, 3),
        value: values.eur,
        change: values.eur_24h_change || 0,
        icon: cryptoIcons[id] || '●',
        color: cryptoColors[id] || 'from-gray-500 to-gray-700',
        sparkline: generateSparkline(values.eur, 0.03),
      }));

      setCryptos(cryptoItems);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      // Fallback data
      setCryptos([
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', value: 42850.00, change: 2.34, icon: '₿', color: 'from-orange-400 to-orange-600', sparkline: generateSparkline(42850, 0.03) },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', value: 2285.50, change: 1.87, icon: 'Ξ', color: 'from-purple-400 to-blue-600', sparkline: generateSparkline(2285, 0.03) },
        { id: 'solana', name: 'Solana', symbol: 'SOL', value: 98.45, change: 5.23, icon: '◎', color: 'from-purple-500 to-cyan-400', sparkline: generateSparkline(98, 0.04) },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', value: 0.62, change: -1.45, icon: '₳', color: 'from-blue-400 to-blue-600', sparkline: generateSparkline(0.62, 0.03) },
        { id: 'ripple', name: 'XRP', symbol: 'XRP', value: 0.58, change: 0.89, icon: '✕', color: 'from-gray-600 to-blue-500', sparkline: generateSparkline(0.58, 0.02) },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', value: 0.089, change: 3.21, icon: 'Ð', color: 'from-yellow-400 to-yellow-600', sparkline: generateSparkline(0.089, 0.04) },
      ]);
    }
  }, []);

  // Fetch forex data from Frankfurter
  const fetchForexData = useCallback(async () => {
    try {
      const response = await fetch(
        'https://api.frankfurter.app/latest?from=EUR&to=USD,GBP,JPY,CHF,TRY,CNY'
      );
      const data: ForexRates = await response.json();

      const forexItems: MarketItem[] = Object.entries(data.rates).map(([currency, rate]) => ({
        id: currency.toLowerCase(),
        name: currencyInfo[currency]?.name || currency,
        symbol: `EUR/${currency}`,
        value: rate,
        change: (Math.random() - 0.5) * 2, // Simulated change since API doesn't provide it
        icon: currencyInfo[currency]?.icon || currency,
        color: currencyInfo[currency]?.color || 'from-gray-500 to-gray-700',
        sparkline: generateSparkline(rate, 0.01),
      }));

      setCurrencies(forexItems);
    } catch (error) {
      console.error('Error fetching forex data:', error);
      // Fallback data
      setCurrencies([
        { id: 'usd', name: 'US Dollar', symbol: 'EUR/USD', value: 1.0892, change: 0.15, icon: '$', color: 'from-green-500 to-green-700', sparkline: generateSparkline(1.089, 0.01) },
        { id: 'gbp', name: 'British Pound', symbol: 'EUR/GBP', value: 0.8567, change: -0.08, icon: '£', color: 'from-purple-500 to-purple-700', sparkline: generateSparkline(0.856, 0.01) },
        { id: 'jpy', name: 'Japanese Yen', symbol: 'EUR/JPY', value: 158.45, change: 0.32, icon: '¥', color: 'from-red-500 to-pink-600', sparkline: generateSparkline(158, 0.01) },
        { id: 'chf', name: 'Swiss Franc', symbol: 'EUR/CHF', value: 0.9456, change: -0.12, icon: '₣', color: 'from-red-600 to-red-800', sparkline: generateSparkline(0.945, 0.01) },
        { id: 'try', name: 'Turkish Lira', symbol: 'EUR/TRY', value: 32.45, change: 1.24, icon: '₺', color: 'from-red-600 to-red-800', sparkline: generateSparkline(32.45, 0.02) },
        { id: 'cny', name: 'Chinese Yuan', symbol: 'EUR/CNY', value: 7.82, change: 0.05, icon: '¥', color: 'from-red-600 to-yellow-500', sparkline: generateSparkline(7.82, 0.01) },
      ]);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCryptoData(), fetchForexData()]);
      setIsLoading(false);
      setLastUpdate(new Date());
    };

    fetchAllData();
  }, [fetchCryptoData, fetchForexData]);

  // Real-time simulation updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stocks
      setStocks(prev => prev.map(stock => {
        const newSparkline = [...stock.sparkline.slice(1), stock.value * (1 + (Math.random() - 0.5) * 0.01)];
        return {
          ...stock,
          value: stock.value * (1 + (Math.random() - 0.5) * 0.005),
          change: stock.change + (Math.random() - 0.5) * 0.1,
          sparkline: newSparkline,
        };
      }));

      // Update indices
      setIndices(prev => prev.map(index => {
        const newSparkline = [...index.sparkline.slice(1), index.value * (1 + (Math.random() - 0.5) * 0.005)];
        return {
          ...index,
          value: index.value * (1 + (Math.random() - 0.5) * 0.002),
          change: index.change + (Math.random() - 0.5) * 0.05,
          sparkline: newSparkline,
        };
      }));

      // Update cryptos
      setCryptos(prev => prev.map(crypto => {
        const newSparkline = [...crypto.sparkline.slice(1), crypto.value * (1 + (Math.random() - 0.5) * 0.02)];
        return {
          ...crypto,
          value: crypto.value * (1 + (Math.random() - 0.5) * 0.01),
          change: crypto.change + (Math.random() - 0.5) * 0.2,
          sparkline: newSparkline,
        };
      }));

      // Update currencies
      setCurrencies(prev => prev.map(currency => {
        const newSparkline = [...currency.sparkline.slice(1), currency.value * (1 + (Math.random() - 0.5) * 0.005)];
        return {
          ...currency,
          value: currency.value * (1 + (Math.random() - 0.5) * 0.001),
          change: currency.change + (Math.random() - 0.5) * 0.05,
          sparkline: newSparkline,
        };
      }));

      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'indizes', label: 'Indizes', icon: '📊', count: indices.length },
    { id: 'aktien', label: 'Aktien', icon: '📈', count: stocks.length },
    { id: 'waehrungen', label: 'Währungen', icon: '💱', count: currencies.length },
    { id: 'coins', label: 'Krypto', icon: '🪙', count: cryptos.length },
  ];

  const getActiveData = (): MarketItem[] => {
    switch (activeTab) {
      case 'aktien': return stocks;
      case 'indizes': return indices;
      case 'waehrungen': return currencies;
      case 'coins': return cryptos;
      default: return indices;
    }
  };

  const formatValue = (value: number, category: string): string => {
    if (category === 'coins' && value < 1) {
      return value.toFixed(4);
    } else if (category === 'waehrungen') {
      return value.toFixed(4);
    } else if (value >= 1000) {
      return value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return value.toFixed(2);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-green-500 rounded-full relative" />
              </div>
              <span className="text-green-400 text-sm font-medium uppercase tracking-wider">Live</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
              Live-Marktdaten
            </h2>
            <p className="text-lg text-slate-400">Echtzeit-Übersicht der wichtigsten Märkte</p>
            <p className="text-sm text-slate-500 mt-2">
              Letzte Aktualisierung: {lastUpdate.toLocaleTimeString('de-DE')}
            </p>
          </motion.div>

          <Link
            to="/maerkte"
            className="mt-6 lg:mt-0 group flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/10"
          >
            <span>Alle Märkte ansehen</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              →
            </motion.span>
          </Link>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : 'bg-white/5 backdrop-blur-sm text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-white">
              <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-lg">Marktdaten werden geladen...</span>
            </div>
          </div>
        )}

        {/* Market Cards */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getActiveData().map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Card Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Header */}
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <span className="text-sm text-slate-400">{item.symbol}</span>
                      </div>
                    </div>

                    {/* Live Indicator */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-slate-500">LIVE</span>
                    </div>
                  </div>

                  {/* Sparkline Chart */}
                  <div className="relative mb-4 -mx-2">
                    <SparklineChart data={item.sparkline} positive={item.change >= 0} />
                  </div>

                  {/* Value & Change */}
                  <div className="relative flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-heading font-bold text-white">
                        {activeTab === 'waehrungen' ? '' : '€'}{formatValue(item.value, activeTab)}
                      </p>
                    </div>
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${
                        item.change >= 0
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      <span>{item.change >= 0 ? '↑' : '↓'}</span>
                      <span>{Math.abs(item.change).toFixed(2)}%</span>
                    </motion.div>
                  </div>

                  {/* Hover Border Gradient */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-amber-500/50 group-hover:to-orange-500/50 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Gehandelte Märkte', value: '50+', icon: '🌍' },
            { label: 'Echtzeit-Updates', value: '< 3s', icon: '⚡' },
            { label: 'Verfügbare Kryptos', value: '100+', icon: '🪙' },
            { label: 'Währungspaare', value: '30+', icon: '💱' },
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

export default LiveMarketTicker;
