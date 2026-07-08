import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import CallUsModal from '../components/CallUsModal';
import NoInvestment from '../components/NoInvestment';
import { motion } from 'framer-motion';

export default function FestgeldPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const investment = user.investments.find(inv => inv.type === 'festgeld');
  if (!investment) {
    return <NoInvestment typeName="Festgeld" icon="ri-safe-2-line" />;
  }

  const startDate = new Date(investment.startDate);
  const endDate = new Date(investment.endDate);
  const today = new Date();
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  const progress = Math.min((elapsedDays / totalDays) * 100, 100);

  const currentValue = investment.amount + investment.profit;
  const dailyInterest = (investment.amount * investment.interestRate / 100) / 365;
  const monthlyInterest = (investment.amount * investment.interestRate / 100) / 12;

  // Monatliche Zinshistorie
  const monthlyHistory = [];
  for (let i = 0; i < 12; i++) {
    const month = new Date(2025, i, 1);
    const monthName = month.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
    const monthlyProfit = monthlyInterest * (i + 1);
    monthlyHistory.push({
      month: monthName,
      interest: monthlyInterest,
      cumulative: monthlyProfit
    });
  }

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
          <button onClick={() => navigate('/dashboard')} className="hover:text-accent-gold600 transition-colors cursor-pointer">
            Dashboard
          </button>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-accent-gold600 font-semibold">Festgeld</span>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary via-primary-dark to-primary-dark rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-40 -mb-40"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  <i className="ri-safe-2-line text-4xl"></i>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    Festgeld-Anlage
                  </h1>
                  <p className="text-white/90 text-lg">
                    {investment.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/25 backdrop-blur-sm px-4 py-2 rounded-xl mb-2 shadow-lg">
                  <p className="text-xs text-white/80 mb-1">Zinssatz</p>
                  <p className="text-2xl font-bold">{investment.interestRate}% p.a.</p>
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
                <p className="text-white/80 text-sm mb-2 font-medium">Investierter Betrag</p>
                <p className="text-2xl font-bold">{investment.amount.toLocaleString('de-DE')} €</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <p className="text-white/80 text-sm mb-2 font-medium">Aktueller Wert</p>
                <p className="text-2xl font-bold">{currentValue.toLocaleString('de-DE')} €</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <p className="text-white/80 text-sm mb-2 font-medium">Erzielter Gewinn</p>
                <p className="text-2xl font-bold text-amber-200">+{investment.profit.toLocaleString('de-DE')} €</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
                <p className="text-white/80 text-sm mb-2 font-medium">Verbleibende Tage</p>
                <p className="text-2xl font-bold">{remainingDays} Tage</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Laufzeit & Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-time-line text-2xl text-white"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary">Laufzeit & Status</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-cyan-50 to-primary/5 rounded-xl p-5 border border-amber-100">
                    <p className="text-sm text-accent-gold700 mb-2 font-medium flex items-center gap-2">
                      <i className="ri-calendar-check-line"></i>
                      Startdatum
                    </p>
                    <p className="text-xl font-bold text-accent-gold700">
                      {startDate.toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-100">
                    <p className="text-sm text-primary mb-2 font-medium flex items-center gap-2">
                      <i className="ri-calendar-event-line"></i>
                      Enddatum
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {endDate.toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-neutral-700">Fortschritt</span>
                    <span className="text-sm font-bold text-accent-gold600">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-4 bg-neutral-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary via-primary-dark to-primary-dark rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-neutral-600">
                    <span>{elapsedDays} Tage vergangen</span>
                    <span>{remainingDays} Tage verbleibend</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1 font-medium">Gesamtlaufzeit</p>
                      <p className="text-2xl font-bold text-primary">{totalDays} Tage</p>
                      <p className="text-sm text-neutral-500 mt-1">≈ 12 Monate</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                      <i className="ri-calendar-2-line text-3xl text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Zinsdetails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-percent-line text-2xl text-white"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary">Zinsdetails</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-cyan-50 to-primary/5 rounded-xl p-5 border border-amber-100">
                  <p className="text-sm text-accent-gold700 mb-2 font-medium">Täglicher Zins</p>
                  <p className="text-xl font-bold text-accent-gold700">
                    {dailyInterest.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-5 border border-amber-100">
                  <p className="text-sm text-primary mb-2 font-medium">Monatlicher Zins</p>
                  <p className="text-xl font-bold text-primary">
                    {monthlyInterest.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-green-100">
                  <p className="text-sm text-green-700 mb-2 font-medium">Gesamtzins (12M)</p>
                  <p className="text-xl font-bold text-green-700">
                    {investment.profit.toLocaleString('de-DE')} €
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 border border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-information-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Auszahlung bei Fälligkeit</h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Am {endDate.toLocaleDateString('de-DE')} erhalten Sie Ihr Kapital plus Zinsen zurück.
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-neutral-600">Kapital:</span>
                        <span className="font-bold text-neutral-800">{investment.amount.toLocaleString('de-DE')} €</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-neutral-600">Zinsen:</span>
                        <span className="font-bold text-green-600">+{investment.profit.toLocaleString('de-DE')} €</span>
                      </div>
                      <div className="border-t border-neutral-200 pt-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-neutral-700">Auszahlung gesamt:</span>
                          <span className="text-xl font-bold text-primary">{currentValue.toLocaleString('de-DE')} €</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Monatliche Zinshistorie */}
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
                <h2 className="text-2xl font-heading font-bold text-primary">Monatliche Zinsentwicklung</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-neutral-200">
                      <th className="text-left py-4 px-4 text-sm font-bold text-neutral-700">Monat</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">Monatszins</th>
                      <th className="text-right py-4 px-4 text-sm font-bold text-neutral-700">Kumuliert</th>
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
                        <td className="py-4 px-4 text-right font-bold text-green-600">
                          +{item.interest.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                        </td>
                        <td className="py-4 px-4 text-right font-bold text-accent-gold600">
                          {item.cumulative.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
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
                <i className="ri-flashlight-line text-accent-gold600"></i>
                Schnellübersicht
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Investment-ID</span>
                  <span className="font-bold text-neutral-800">{investment.id}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Typ</span>
                  <span className="font-bold text-accent-gold600">Festgeld</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Laufzeit</span>
                  <span className="font-bold text-neutral-800">12 Monate</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-neutral-600">Rendite</span>
                  <span className="font-bold text-green-600">+{((investment.profit / investment.amount) * 100).toFixed(2)}%</span>
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
                  onClick={() => setShowDownloadModal(true)}
                  className="w-full bg-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark text-accent-gold700 hover:text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap border border-amber-200"
                >
                  <i className="ri-download-line text-xl"></i>
                  Kontoauszug
                </button>
                <button
                  onClick={() => setShowCallModal(true)}
                  className="w-full bg-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark text-accent-gold700 hover:text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap border border-amber-200"
                >
                  <i className="ri-customer-service-2-line text-xl"></i>
                  Beratung
                </button>
                <button
                  onClick={() => setShowCallModal(true)}
                  className="w-full bg-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark text-accent-gold700 hover:text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap border border-amber-200"
                >
                  <i className="ri-add-circle-line text-xl"></i>
                  Neue Investition
                </button>
              </div>
            </motion.div>

            {/* Wichtige Hinweise */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6"
            >
              <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                <i className="ri-information-line"></i>
                Wichtige Hinweise
              </h3>
              <ul className="space-y-3 text-sm text-amber-900">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Festgeld ist bis zum Laufzeitende gebunden</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Zinsen werden am Ende der Laufzeit ausgezahlt</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Einlagensicherung bis 100.000 € pro Kunde</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call Us Modal */}
      <CallUsModal isOpen={showCallModal} onClose={() => setShowCallModal(false)} />

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-download-cloud-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-primary">Kontoauszug herunterladen</h3>
            </div>
            
            <p className="text-neutral-600 mb-6">
              Ihr Kontoauszug wird als PDF-Datei heruntergeladen und enthält alle Details zu Ihrer Festgeld-Anlage.
            </p>

            <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-4 mb-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-file-text-line text-2xl text-accent-gold600"></i>
                <div>
                  <p className="font-bold text-accent-gold700">Festgeld_Kontoauszug_2025.pdf</p>
                  <p className="text-xs text-accent-gold600">Erstellt am {new Date().toLocaleDateString('de-DE')}</p>
                </div>
              </div>
              <div className="text-xs text-accent-gold700 space-y-1">
                <p>✓ Investitionsdetails</p>
                <p>✓ Zinsentwicklung</p>
                <p>✓ Auszahlungsinformationen</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap"
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  alert('Download wird vorbereitet...');
                  setShowDownloadModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-slate-800 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
              >
                Herunterladen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}