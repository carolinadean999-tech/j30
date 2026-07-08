import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { motion } from 'framer-motion';
import DashboardHeader from '../components/DashboardHeader';
import CallUsModal from '../components/CallUsModal';
import NoInvestment from '../components/NoInvestment';

export default function AktienDetailPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCallModal, setShowCallModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  if (!user) return null;

  const investment = user.investments?.find(inv => inv.type === 'aktien');

  if (!investment) {
    return <NoInvestment typeName="Aktien" icon="ri-stock-line" />;
  }

  const profitPercentage = ((investment.profit / investment.amount) * 100).toFixed(2);
  const startDate = new Date(investment.startDate);
  const daysSinceStart = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentValue = investment.amount + investment.profit;
  const dailyReturn = investment.profit / daysSinceStart;
  const monthlyReturn = dailyReturn * 30;

  // Portfolio-Positionen (Beispieldaten)
  const portfolioPositions = [
    { name: 'Apple Inc.', ticker: 'AAPL', shares: 45, price: 178.50, change: 2.34, allocation: 25 },
    { name: 'Microsoft Corp.', ticker: 'MSFT', shares: 30, price: 385.20, change: 1.87, allocation: 20 },
    { name: 'NVIDIA Corp.', ticker: 'NVDA', shares: 25, price: 495.80, change: 4.21, allocation: 18 },
    { name: 'Amazon.com Inc.', ticker: 'AMZN', shares: 35, price: 178.90, change: -0.45, allocation: 15 },
    { name: 'Alphabet Inc.', ticker: 'GOOGL', shares: 40, price: 142.30, change: 1.12, allocation: 12 },
    { name: 'Tesla Inc.', ticker: 'TSLA', shares: 20, price: 248.50, change: -1.23, allocation: 10 },
  ];

  // Monatliche Performance-Historie
  const monthlyHistory = [
    { month: 'Januar 2025', value: investment.amount, change: 0, percentage: 0 },
    { month: 'Februar 2025', value: investment.amount * 1.018, change: investment.amount * 0.018, percentage: 1.8 },
    { month: 'März 2025', value: investment.amount * 1.035, change: investment.amount * 0.017, percentage: 1.7 },
    { month: 'April 2025', value: investment.amount * 1.028, change: -investment.amount * 0.007, percentage: -0.7 },
    { month: 'Mai 2025', value: investment.amount * 1.052, change: investment.amount * 0.024, percentage: 2.4 },
    { month: 'Juni 2025', value: investment.amount * 1.071, change: investment.amount * 0.019, percentage: 1.9 },
    { month: 'Juli 2025', value: investment.amount * 1.089, change: investment.amount * 0.018, percentage: 1.8 },
    { month: 'August 2025', value: investment.amount * 1.078, change: -investment.amount * 0.011, percentage: -1.1 },
    { month: 'September 2025', value: investment.amount * 1.095, change: investment.amount * 0.017, percentage: 1.7 },
    { month: 'Oktober 2025', value: investment.amount * 1.112, change: investment.amount * 0.017, percentage: 1.7 },
    { month: 'November 2025', value: investment.amount * 1.128, change: investment.amount * 0.016, percentage: 1.6 },
    { month: 'Dezember 2025', value: currentValue, change: investment.amount * 0.015, percentage: 1.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-neutral-600 mb-6"
        >
          <button onClick={() => navigate('/dashboard')} className="hover:text-accent-gold transition-colors cursor-pointer">
            Dashboard
          </button>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-accent-gold font-semibold">Aktien</span>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-40 -mb-40"></div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  <i className="ri-stock-line text-4xl"></i>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    Aktien-Portfolio
                  </h1>
                  <p className="text-white/90 text-lg">
                    {investment.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/25 backdrop-blur-sm px-4 py-2 rounded-xl mb-2 shadow-lg">
                  <p className="text-xs text-white/80 mb-1">Performance</p>
                  <p className="text-2xl font-bold">+{profitPercentage}%</p>
                </div>
                <div className="bg-amber-500/30 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <p className="text-xs text-white/80 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <p className="text-sm font-bold">Aktiv</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <p className="text-white/80 text-sm mb-2 font-medium">Investiert</p>
                <p className="text-2xl font-bold">{investment.amount.toLocaleString('de-DE')} €</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <p className="text-white/80 text-sm mb-2 font-medium">Aktueller Wert</p>
                <p className="text-2xl font-bold">{currentValue.toLocaleString('de-DE')} €</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <p className="text-white/80 text-sm mb-2 font-medium">Gewinn</p>
                <p className="text-2xl font-bold text-amber-200">+{investment.profit.toLocaleString('de-DE')} €</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <p className="text-white/80 text-sm mb-2 font-medium">Laufzeit</p>
                <p className="text-2xl font-bold">{daysSinceStart} Tage</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio-Positionen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-pie-chart-line text-2xl text-white"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary">Portfolio-Positionen</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-neutral-200">
                      <th className="text-left py-4 px-4 text-sm font-bold text-neutral-700">Aktie</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">Anteile</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">Kurs</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">Änderung</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">Anteil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioPositions.map((position, index) => (
                      <motion.tr
                        key={position.ticker}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className="border-b border-neutral-100 hover:bg-gradient-to-r hover:from-amber-50 hover:to-primary/5 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md">
                              {position.ticker.slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-semibold text-neutral-800">{position.name}</p>
                              <p className="text-xs text-neutral-500">{position.ticker}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-medium text-neutral-700">
                          {position.shares}
                        </td>
                        <td className="py-4 px-4 text-right font-bold text-neutral-800">
                          ${position.price.toFixed(2)}
                        </td>
                        <td className={`py-4 px-4 text-right font-bold ${position.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {position.change >= 0 ? '+' : ''}{position.change.toFixed(2)}%
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full"
                                style={{ width: `${position.allocation}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-neutral-700">{position.allocation}%</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Performance-Kennzahlen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-bar-chart-box-line text-2xl text-white"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary">Performance-Kennzahlen</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-5 border border-amber-100">
                  <p className="text-sm text-accent-gold700 mb-2 font-medium">Tägliche Rendite</p>
                  <p className="text-xl font-bold text-accent-gold700">
                    +{dailyReturn.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-100">
                  <p className="text-sm text-primary mb-2 font-medium">Monatliche Rendite</p>
                  <p className="text-xl font-bold text-primary">
                    +{monthlyReturn.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-5 border border-green-100">
                  <p className="text-sm text-green-700 mb-2 font-medium">Gesamtrendite</p>
                  <p className="text-xl font-bold text-green-700">
                    +{profitPercentage}%
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 border border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-information-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Marktübersicht</h3>
                    <p className="text-sm text-neutral-600">
                      Ihr Aktienportfolio zeigt eine solide Performance mit einer durchschnittlichen
                      Rendite von {profitPercentage}% seit Beginn. Die Diversifikation über verschiedene
                      Sektoren sorgt für ein ausgewogenes Risiko-Rendite-Verhältnis.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Monatliche Performance-Historie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-line-chart-line text-2xl text-white"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary">Monatliche Performance</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-neutral-200">
                      <th className="text-left py-4 px-4 text-sm font-bold text-neutral-700">Monat</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">Portfoliowert</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">Änderung</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyHistory.map((item, index) => (
                      <motion.tr
                        key={item.month}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="border-b border-neutral-100 hover:bg-gradient-to-r hover:from-amber-50 hover:to-primary/5 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md">
                              {index + 1}
                            </div>
                            <span className="font-medium text-neutral-700">{item.month}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-bold text-neutral-800">
                          {item.value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                        </td>
                        <td className={`py-4 px-4 text-right font-bold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change >= 0 ? '+' : ''}{item.change.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                        </td>
                        <td className={`py-4 px-4 text-right font-bold ${item.percentage >= 0 ? 'text-accent-gold600' : 'text-red-600'}`}>
                          {item.percentage >= 0 ? '+' : ''}{item.percentage.toFixed(1)}%
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schnellübersicht */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-6"
            >
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <i className="ri-flashlight-line text-accent-gold"></i>
                Schnellübersicht
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Investment-ID</span>
                  <span className="font-bold text-neutral-800">{investment.id}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Typ</span>
                  <span className="font-bold text-accent-gold600">Aktien</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Positionen</span>
                  <span className="font-bold text-neutral-800">{portfolioPositions.length} Aktien</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Start</span>
                  <span className="font-bold text-neutral-800">{startDate.toLocaleDateString('de-DE')}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-neutral-600">Rendite</span>
                  <span className="font-bold text-green-600">+{profitPercentage}%</span>
                </div>
              </div>
            </motion.div>

            {/* Aktionen */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-2xl border border-amber-100 p-6"
            >
              <h3 className="text-lg font-bold text-accent-gold700 mb-4 flex items-center gap-2">
                <i className="ri-settings-3-line"></i>
                Aktionen
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowCallModal(true)}
                  className="w-full bg-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark text-accent-gold700 hover:text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap border border-amber-200"
                >
                  <i className="ri-add-circle-line text-xl"></i>
                  Neue Investition
                </button>
                <button
                  onClick={() => setShowCallModal(true)}
                  className="w-full bg-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark text-accent-gold700 hover:text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap border border-amber-200"
                >
                  <i className="ri-customer-service-2-line text-xl"></i>
                  Beratung
                </button>
              </div>
            </motion.div>

            {/* Markt-News */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6"
            >
              <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                <i className="ri-newspaper-line"></i>
                Wichtige Hinweise
              </h3>
              <ul className="space-y-3 text-sm text-amber-900">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Aktien unterliegen Kursschwankungen</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Vergangene Performance ist keine Garantie für zukünftige Erträge</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Diversifikation reduziert das Risiko</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Langfristige Anlage empfohlen</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call Us Modal */}
      <CallUsModal isOpen={showCallModal} onClose={() => setShowCallModal(false)} />
    </div>
  );
}
