import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import CallUsModal from '../components/CallUsModal';
import NoInvestment from '../components/NoInvestment';
import { motion } from 'framer-motion';

export default function FlexgeldPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawType, setWithdrawType] = useState<'instant' | 'planned'>('planned');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const investment = user.investments.find(inv => inv.type === 'flexgeld');
  if (!investment) {
    return <NoInvestment typeName="Flexgeld" icon="ri-exchange-line" />;
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

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > currentValue) {
      alert('Bitte geben Sie einen gültigen Betrag ein.');
      return;
    }

    if (withdrawType === 'instant') {
      const penalty = amount * 0.02;
      const netAmount = amount - penalty;
      alert(`Sofortauszahlung: ${netAmount.toLocaleString('de-DE')} € (nach 2% Abschlag)\nAbschlag: ${penalty.toLocaleString('de-DE')} €`);
    } else {
      alert(`Planmäßige Auszahlung: ${amount.toLocaleString('de-DE')} € wird am ${endDate.toLocaleDateString('de-DE')} ausgezahlt.`);
    }
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

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
          <span className="text-accent-gold600 font-semibold">Flexgeld</span>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary via-slate-800 to-amber-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-40 -mb-40"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  <i className="ri-exchange-line text-4xl"></i>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    Flexgeld-Anlage
                  </h1>
                  <div className="flex items-center gap-3">
                    <p className="text-white/90 text-lg">
                      {investment.name}
                    </p>
                    {investment.status === 'pending' && (
                      <span className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/40 ring-2 ring-orange-300/50">
                        <i className="ri-time-line text-base"></i>
                        Ausstehend
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/25 backdrop-blur-sm px-4 py-2 rounded-xl mb-2 shadow-lg">
                  <p className="text-xs text-white/80 mb-1">Zinssatz</p>
                  <p className="text-2xl font-bold">{investment.interestRate}% p.a.</p>
                </div>
                <div className="bg-amber-500/30 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <p className="text-xs text-white/80 mb-1">Flexibilität</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <p className="text-sm font-bold">Täglich verfügbar</p>
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
                <p className="text-white/80 text-sm mb-2 font-medium">Verfügbar</p>
                <p className="text-2xl font-bold">{investment.status === 'pending' ? 'Ausstehend' : 'Sofort'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flexibilität & Verfügbarkeit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-flashlight-line text-2xl text-white"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary">Flexibilität & Verfügbarkeit</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-6 border border-amber-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md">
                      <i className="ri-time-line text-2xl text-white"></i>
                    </div>
                    <h3 className="text-lg font-bold text-accent-gold700">Tägliche Verfügbarkeit</h3>
                  </div>
                  <p className="text-sm text-accent-gold700 mb-3">
                    Ihr Geld ist täglich verfügbar. Sie können jederzeit über Ihr Kapital verfügen.
                  </p>
                  <div className="bg-white/80 rounded-lg p-3 text-xs text-accent-gold700 space-y-1">
                    <p>✓ Keine Kündigungsfrist</p>
                    <p>✓ Flexible Teilauszahlungen</p>
                    <p>✓ Sofortige Verfügbarkeit</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 border border-amber-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                      <i className="ri-percent-line text-2xl text-white"></i>
                    </div>
                    <h3 className="text-lg font-bold text-primary">Attraktive Verzinsung</h3>
                  </div>
                  <p className="text-sm text-primary mb-3">
                    Trotz täglicher Verfügbarkeit erhalten Sie {investment.interestRate}% Zinsen pro Jahr.
                  </p>
                  <div className="bg-white/80 rounded-lg p-3 text-xs text-primary space-y-1">
                    <p>✓ Tägliche Zinsgutschrift</p>
                    <p>✓ Zinseszinseffekt</p>
                    <p>✓ Garantierter Zinssatz</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 border border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-information-line text-2xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary mb-2">Laufzeit & Fortschritt</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Startdatum</p>
                        <p className="text-sm font-bold text-neutral-800">{startDate.toLocaleDateString('de-DE')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Planmäßiges Ende</p>
                        <p className="text-sm font-bold text-neutral-800">{endDate.toLocaleDateString('de-DE')}</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs text-neutral-600 mb-2">
                        <span>Fortschritt</span>
                        <span className="font-bold text-accent-gold600">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1.5 }}
                          className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600">
                      {remainingDays} Tage bis zum planmäßigen Ende (vorzeitige Auszahlung jederzeit möglich)
                    </p>
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
                  <i className="ri-money-euro-circle-line text-2xl text-white"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary">Zinsdetails</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-5 border border-amber-100">
                  <p className="text-sm text-accent-gold700 mb-2 font-medium">Täglicher Zins</p>
                  <p className="text-xl font-bold text-accent-gold700">
                    {dailyInterest.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-100">
                  <p className="text-sm text-primary mb-2 font-medium">Monatlicher Zins</p>
                  <p className="text-xl font-bold text-primary">
                    {monthlyInterest.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-xl p-5 border border-green-100">
                  <p className="text-sm text-green-700 mb-2 font-medium">Bisheriger Gewinn</p>
                  <p className="text-xl font-bold text-green-700">
                    {investment.profit.toLocaleString('de-DE')} €
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 border border-neutral-200">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <i className="ri-calculator-line text-accent-gold600"></i>
                  Zinsberechnung
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Kapital:</span>
                    <span className="font-bold text-neutral-800">{investment.amount.toLocaleString('de-DE')} €</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Zinssatz:</span>
                    <span className="font-bold text-accent-gold600">{investment.interestRate}% p.a.</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Bisherige Zinsen:</span>
                    <span className="font-bold text-green-600">+{investment.profit.toLocaleString('de-DE')} €</span>
                  </div>
                  <div className="flex items-center justify-between py-2 pt-3">
                    <span className="text-neutral-700 font-semibold">Aktueller Gesamtwert:</span>
                    <span className="text-xl font-bold text-primary">{currentValue.toLocaleString('de-DE')} €</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Auszahlungsoptionen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-hand-coin-line text-2xl text-white"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary">Auszahlungsoptionen</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                      <i className="ri-flashlight-fill text-2xl text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-orange-700">Sofortauszahlung</h3>
                      <p className="text-xs text-orange-600">Mit 2% Abschlag</p>
                    </div>
                  </div>
                  <p className="text-sm text-orange-700 mb-4">
                    Erhalten Sie Ihr Geld sofort, jedoch mit einem Abschlag von 2% auf den Auszahlungsbetrag.
                  </p>
                  <div className="bg-white/80 rounded-lg p-4 mb-4">
                    <p className="text-xs text-orange-700 mb-2 font-semibold">Beispielrechnung:</p>
                    <div className="space-y-1 text-xs text-orange-700">
                      <div className="flex justify-between">
                        <span>Auszahlungsbetrag:</span>
                        <span className="font-bold">10.000 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Abschlag (2%):</span>
                        <span className="font-bold text-red-600">-200 €</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-orange-200">
                        <span className="font-bold">Sie erhalten:</span>
                        <span className="font-bold">9.800 €</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-orange-700">
                    <i className="ri-time-line"></i>
                    <span>Verfügbar: Sofort (1-2 Werktage)</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-6 border-2 border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md">
                      <i className="ri-calendar-check-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-accent-gold700">Planmäßige Auszahlung</h3>
                      <p className="text-xs text-accent-gold600">Ohne Abschlag</p>
                    </div>
                  </div>
                  <p className="text-sm text-accent-gold700 mb-4">
                    Warten Sie bis zum Laufzeitende und erhalten Sie den vollen Betrag ohne Abschläge.
                  </p>
                  <div className="bg-white/80 rounded-lg p-4 mb-4">
                    <p className="text-xs text-accent-gold700 mb-2 font-semibold">Beispielrechnung:</p>
                    <div className="space-y-1 text-xs text-accent-gold700">
                      <div className="flex justify-between">
                        <span>Auszahlungsbetrag:</span>
                        <span className="font-bold">10.000 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Abschlag:</span>
                        <span className="font-bold text-green-600">0 €</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-amber-200">
                        <span className="font-bold">Sie erhalten:</span>
                        <span className="font-bold">10.000 €</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-accent-gold700">
                    <i className="ri-calendar-line"></i>
                    <span>Verfügbar: {endDate.toLocaleDateString('de-DE')}</span>
                  </div>
                </div>
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
                <i className="ri-dashboard-line text-accent-gold600"></i>
                Schnellübersicht
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Investment-ID</span>
                  <span className="font-bold text-neutral-800">{investment.id}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Typ</span>
                  <span className="font-bold text-accent-gold600">Flexgeld</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Verfügbarkeit</span>
                  <span className="font-bold text-green-600">Täglich</span>
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
                  onClick={() => setShowWithdrawModal(true)}
                  className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-slate-800 text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-hand-coin-line text-xl"></i>
                  Auszahlung beantragen
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
                  <span>Täglich verfügbar ohne Kündigungsfrist</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Sofortauszahlung mit 2% Abschlag möglich</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Planmäßige Auszahlung ohne Abschlag</span>
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

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-hand-coin-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-primary">Auszahlung beantragen</h3>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Auszahlungsbetrag
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
                  placeholder="Betrag eingeben"
                  max={currentValue}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-semibold">€</span>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Verfügbar: {currentValue.toLocaleString('de-DE')} €
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Auszahlungsart wählen
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setWithdrawType('instant')}
                  className={`p-5 rounded-xl border-2 transition-all text-left cursor-pointer ${
                    withdrawType === 'instant'
                      ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50'
                      : 'border-neutral-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      withdrawType === 'instant' ? 'border-orange-500' : 'border-neutral-300'
                    }`}>
                      {withdrawType === 'instant' && (
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-bold text-orange-700">Sofortauszahlung</span>
                  </div>
                  <p className="text-xs text-orange-600 mb-2">Mit 2% Abschlag</p>
                  <p className="text-xs text-neutral-600">Verfügbar in 1-2 Werktagen</p>
                </button>

                <button
                  onClick={() => setWithdrawType('planned')}
                  className={`p-5 rounded-xl border-2 transition-all text-left cursor-pointer ${
                    withdrawType === 'planned'
                      ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-primary/5'
                      : 'border-neutral-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      withdrawType === 'planned' ? 'border-amber-500' : 'border-neutral-300'
                    }`}>
                      {withdrawType === 'planned' && (
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <span className="font-bold text-accent-gold700">Planmäßig</span>
                  </div>
                  <p className="text-xs text-accent-gold600 mb-2">Ohne Abschlag</p>
                  <p className="text-xs text-neutral-600">Am {endDate.toLocaleDateString('de-DE')}</p>
                </button>
              </div>
            </div>

            {withdrawAmount && (
              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-5 mb-6 border border-neutral-200">
                <h4 className="font-bold text-neutral-700 mb-3">Zusammenfassung</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Auszahlungsbetrag:</span>
                    <span className="font-bold">{parseFloat(withdrawAmount).toLocaleString('de-DE')} €</span>
                  </div>
                  {withdrawType === 'instant' && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Abschlag (2%):</span>
                      <span className="font-bold text-red-600">-{(parseFloat(withdrawAmount) * 0.02).toLocaleString('de-DE')} €</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-neutral-300">
                    <span className="font-bold text-neutral-700">Sie erhalten:</span>
                    <span className="text-lg font-bold text-primary">
                      {withdrawType === 'instant'
                        ? (parseFloat(withdrawAmount) * 0.98).toLocaleString('de-DE')
                        : parseFloat(withdrawAmount).toLocaleString('de-DE')} €
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  setWithdrawAmount('');
                }}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap"
              >
                Abbrechen
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-slate-800 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
              >
                Auszahlung beantragen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}