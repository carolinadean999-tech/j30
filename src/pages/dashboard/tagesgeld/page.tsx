import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { motion } from 'framer-motion';
import DashboardHeader from '../components/DashboardHeader';
import CallUsModal from '../components/CallUsModal';
import NoInvestment from '../components/NoInvestment';

export default function TagesgeldDetailPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCallModal, setShowCallModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const investment = user.investments?.find(inv => inv.type === 'tagesgeld');
  
  if (!investment) {
    return <NoInvestment typeName="Tagesgeld" icon="ri-calendar-check-line" />;
  }

  const profitPercentage = ((investment.profit / investment.amount) * 100).toFixed(2);
  const daysSinceStart = Math.floor((new Date().getTime() - new Date(investment.startDate).getTime()) / (1000 * 60 * 60 * 24));
  const currentValue = investment.amount + investment.profit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-amber-100/50/30">
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
          <span className="text-accent-gold600 font-semibold">Tagesgeld</span>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-500 via-green-500 to-lime-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-40 -mb-40"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  <i className="ri-calendar-line text-4xl"></i>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    Tagesgeld-Anlage
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
                <p className="text-white/80 text-sm mb-2 font-medium">Rendite</p>
                <p className="text-2xl font-bold">+{profitPercentage}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200"
            >
              <h2 className="text-xl font-heading font-bold text-primary mb-4">Kontoinformationen</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Kontoeröffnung:</span>
                  <span className="font-semibold text-primary">{investment.startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Tage seit Eröffnung:</span>
                  <span className="font-semibold text-green-600">{daysSinceStart} Tage</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Verfügbarkeit:</span>
                  <span className="font-semibold text-green-600">Sofort</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Kündigungsfrist:</span>
                  <span className="font-semibold text-primary">Keine</span>
                </div>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line text-green-600 text-xl mt-0.5"></i>
                  <div className="text-sm">
                    <p className="font-semibold text-primary mb-1">Tagesgeld-Vorteil</p>
                    <p className="text-neutral-600">
                      Ihr Geld ist täglich verfügbar. Sie können jederzeit Ein- und Auszahlungen vornehmen, ohne Kündigungsfristen oder Gebühren.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200"
            >
              <h2 className="text-xl font-heading font-bold text-primary mb-4">Zinsdetails</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-neutral-600 mb-1">Zinssatz p.a.</p>
                  <p className="text-2xl font-bold text-green-600">{investment.interestRate}%</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-neutral-600 mb-1">Zinsertrag gesamt</p>
                  <p className="text-2xl font-bold text-blue-600">{investment.profit.toLocaleString('de-DE')} €</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-neutral-600 mb-1">Monatlicher Zins</p>
                  <p className="text-2xl font-bold text-purple-600">{(investment.profit / (daysSinceStart / 30)).toFixed(2)} €</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-neutral-600 mb-1">Täglicher Zins</p>
                  <p className="text-2xl font-bold text-orange-600">{(investment.profit / daysSinceStart).toFixed(2)} €</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border border-neutral-200 rounded-xl p-4">
                  <p className="text-sm text-neutral-600 mb-1">Zinsgutschrift</p>
                  <p className="font-semibold text-primary">Monatlich</p>
                </div>
                <div className="border border-neutral-200 rounded-xl p-4">
                  <p className="text-sm text-neutral-600 mb-1">Nächste Gutschrift</p>
                  <p className="font-semibold text-primary">01.01.2025</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200"
            >
              <h2 className="text-xl font-heading font-bold text-primary mb-4">Transaktionen</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-arrow-down-line text-green-600"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Einzahlung</p>
                      <p className="text-xs text-neutral-500">{investment.startDate}</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">+{investment.amount.toLocaleString('de-DE')} €</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-percent-line text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Zinsgutschrift</p>
                      <p className="text-xs text-neutral-500">Monatlich</p>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600">+{(investment.profit / (daysSinceStart / 30)).toFixed(2)} €</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-neutral-50 hover:bg-neutral-100 text-primary py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                <i className="ri-history-line"></i>
                <span>Alle Transaktionen anzeigen</span>
              </button>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200"
            >
              <h3 className="text-lg font-heading font-bold text-primary mb-4">Schnellübersicht</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-check-line text-green-600"></i>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Status</p>
                    <p className="font-semibold text-primary">Aktiv</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <i className="ri-percent-line text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Zinssatz</p>
                    <p className="font-semibold text-primary">{investment.interestRate}% p.a.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-purple-600"></i>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Verfügbarkeit</p>
                    <p className="font-semibold text-primary">Sofort</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200"
            >
              <h3 className="text-lg font-heading font-bold text-primary mb-4">Aktionen</h3>

              <div className="space-y-3">
                <button
                  onClick={() => setShowCallModal(true)}
                  className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-slate-800 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-add-line"></i>
                  <span>Neue Investition</span>
                </button>
                <button
                  onClick={() => setShowCallModal(true)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100 text-primary py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-customer-service-2-line"></i>
                  <span>Beratung</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200"
            >
              <div className="flex items-start gap-3">
                <i className="ri-lightbulb-line text-2xl text-green-600"></i>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Maximale Flexibilität</h3>
                  <p className="text-sm text-neutral-600">
                    Tagesgeld bietet Ihnen höchste Flexibilität bei attraktiven Zinsen. Perfekt für Ihre Liquiditätsreserve.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call Us Modal */}
      <CallUsModal isOpen={showCallModal} onClose={() => setShowCallModal(false)} />
    </div>
  );
}