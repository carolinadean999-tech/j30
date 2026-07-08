import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Investment } from '../../../data/users';

interface InvestmentCardsProps {
  investments: Investment[];
}

export default function InvestmentCards({ investments }: InvestmentCardsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'festgeld':
        return 'ri-safe-2-line';
      case 'flexgeld':
        return 'ri-exchange-line';
      case 'tagesgeld':
        return 'ri-calendar-check-line';
      case 'aktien':
        return 'ri-stock-line';
      case 'anleihen':
        return 'ri-file-chart-line';
      default:
        return 'ri-money-euro-circle-line';
    }
  };

  const getGradient = (type: string) => {
    switch (type) {
      case 'festgeld':
        return 'from-primary to-primary-dark';
      case 'flexgeld':
        return 'from-primary-dark to-slate-800';
      case 'tagesgeld':
        return 'from-amber-500 to-amber-600';
      case 'aktien':
        return 'from-slate-700 to-slate-900';
      case 'anleihen':
        return 'from-amber-600 to-amber-700';
      default:
        return 'from-neutral-500 to-neutral-600';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'festgeld':
        return 'Festgeld';
      case 'flexgeld':
        return 'Flexgeld';
      case 'tagesgeld':
        return 'Tagesgeld';
      case 'aktien':
        return 'Aktien';
      case 'anleihen':
        return 'Anleihen';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: Investment['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Ausstehend',
          icon: 'ri-time-line',
          dot: 'bg-white shadow-white/50',
          box: 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/40',
        };
      case 'completed':
        return {
          label: 'Abgeschlossen',
          icon: 'ri-check-line',
          dot: 'bg-neutral-400 shadow-neutral-400/50',
          box: 'bg-neutral-100 text-neutral-600 border-neutral-200',
        };
      default:
        return {
          label: 'Aktiv & Rentabel',
          icon: '',
          dot: 'bg-amber-500 shadow-amber-500/50',
          box: 'bg-amber-50 text-primary border-amber-200',
        };
    }
  };

  const calculateProgress = (investment: Investment) => {
    const start = new Date(investment.startDate).getTime();
    const end = new Date(investment.endDate).getTime();
    const now = Date.now();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = Date.now();
    const diff = end - now;
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {investments.map((investment, index) => {
        const progress = calculateProgress(investment);
        const daysRemaining = calculateDaysRemaining(investment.endDate);
        const currentValue = investment.amount + investment.profit;
        const profitPercentage = (investment.profit / investment.amount) * 100;

        return (
          <motion.div
            key={investment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
          >
            <Link
              to={`/dashboard/${investment.type}`}
              className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-100 hover:border-amber-200"
            >
              {/* Header mit Gradient */}
              <div className={`bg-gradient-to-br ${getGradient(investment.type)} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                      <i className={`${getIcon(investment.type)} text-3xl`}></i>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full mb-2 shadow-sm">
                        {investment.interestRate}% p.a.
                      </div>
                      <div className="text-xs opacity-80 font-medium">
                        ID: {investment.id}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">
                    {getTypeName(investment.type)}
                  </h3>
                  <p className="text-white/90 text-sm font-medium">
                    {investment.name}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Wert und Gewinn */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <p className="text-xs text-neutral-500 mb-1 font-medium">Aktueller Wert</p>
                      <p className="text-2xl font-bold text-primary">
                        {currentValue.toLocaleString('de-DE')} €
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-500 mb-1 font-medium">Gewinn</p>
                      <p className="text-lg font-bold text-green-600">
                        +{investment.profit.toLocaleString('de-DE')} €
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm bg-neutral-50 rounded-lg p-3">
                    <span className="text-neutral-600">Investiert:</span>
                    <span className="font-bold text-neutral-800">
                      {investment.amount.toLocaleString('de-DE')} €
                    </span>
                    <span className="ml-auto text-green-600 font-bold bg-amber-50 px-2 py-1 rounded-md">
                      +{profitPercentage.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Fortschrittsbalken */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-neutral-600 mb-2 font-medium">
                    <span>Laufzeit-Fortschritt</span>
                    <span className="font-bold text-accent-gold">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${getGradient(investment.type)} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>

                {/* Datum und Tage */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-3 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-1.5">
                      <i className="ri-calendar-check-line text-green-600"></i>
                      <p className="text-xs text-neutral-600 font-medium">Start</p>
                    </div>
                    <p className="text-sm font-bold text-neutral-800">
                      {new Date(investment.startDate).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-3 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-1.5">
                      <i className="ri-calendar-event-line text-primary"></i>
                      <p className="text-xs text-neutral-600 font-medium">Ende</p>
                    </div>
                    <p className="text-sm font-bold text-neutral-800">
                      {new Date(investment.endDate).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>

                {/* Verbleibende Tage */}
                <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-4 mb-4 border border-amber-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md">
                        <i className="ri-time-line text-xl text-white"></i>
                      </div>
                      <div>
                        <p className="text-xs text-primary mb-0.5 font-medium">Verbleibend</p>
                        <p className="text-lg font-bold text-primary">
                          {daysRemaining} Tage
                        </p>
                      </div>
                    </div>
                    <i className="ri-arrow-right-line text-2xl text-accent-gold group-hover:translate-x-2 transition-transform"></i>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-center">
                  {(() => {
                    const badge = getStatusBadge(investment.status);
                    return (
                      <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border ${badge.box}`}>
                        {badge.icon ? (
                          <i className={`${badge.icon} text-base`}></i>
                        ) : (
                          <div className={`w-2 h-2 rounded-full animate-pulse shadow-lg ${badge.dot}`}></div>
                        )}
                        <span>{badge.label}</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}