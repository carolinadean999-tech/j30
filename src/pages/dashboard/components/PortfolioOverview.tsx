import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Investment } from '../../../data/users';

const MotionLink = motion(Link);

interface PortfolioOverviewProps {
  investments: Investment[];
}

export default function PortfolioOverview({ investments }: PortfolioOverviewProps) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const investmentsByType = investments.reduce((acc, inv) => {
    const existing = acc.find(item => item.type === inv.type);
    if (existing) {
      existing.amount += inv.amount;
      existing.profit += inv.profit;
      existing.count += 1;
    } else {
      acc.push({
        type: inv.type,
        amount: inv.amount,
        profit: inv.profit,
        count: 1
      });
    }
    return acc;
  }, [] as Array<{ type: string; amount: number; profit: number; count: number }>);

  const getTypeName = (type: string) => {
    const names: Record<string, string> = {
      festgeld: 'Festgeld',
      flexgeld: 'Flexgeld',
      tagesgeld: 'Tagesgeld',
      aktien: 'Aktien',
      anleihen: 'Anleihen'
    };
    return names[type] || type;
  };

  const getIcon = (type: string) => {
    const icons: Record<string, string> = {
      festgeld: 'ri-safe-2-line',
      flexgeld: 'ri-exchange-line',
      tagesgeld: 'ri-calendar-check-line',
      aktien: 'ri-stock-line',
      anleihen: 'ri-file-chart-line'
    };
    return icons[type] || 'ri-money-euro-circle-line';
  };

  const getGradient = (type: string) => {
    const gradients: Record<string, string> = {
      festgeld: 'from-primary to-primary-dark',
      flexgeld: 'from-primary-dark to-slate-800',
      tagesgeld: 'from-amber-500 to-amber-600',
      aktien: 'from-slate-700 to-slate-900',
      anleihen: 'from-amber-600 to-amber-700'
    };
    return gradients[type] || 'from-neutral-500 to-neutral-600';
  };

  const getBgColor = (type: string) => {
    const colors: Record<string, string> = {
      festgeld: 'from-amber-50 to-primary/5',
      flexgeld: 'from-slate-50 to-slate-100',
      tagesgeld: 'from-amber-50 to-amber-100/50',
      aktien: 'from-slate-50 to-slate-100',
      anleihen: 'from-amber-50 to-amber-100/50'
    };
    return colors[type] || 'from-neutral-50 to-neutral-100';
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <i className="ri-pie-chart-line text-2xl"></i>
            </div>
            <h2 className="text-2xl font-heading font-bold">Portfolio-Übersicht</h2>
          </div>
          <p className="text-white/90 text-base">
            Diversifizierung nach Anlageklassen
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Investment Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {investmentsByType.map((item, index) => {
            const percentage = (item.amount / totalInvested) * 100;
            const profitPercentage = (item.profit / item.amount) * 100;

            return (
              <MotionLink
                key={item.type}
                to={`/dashboard/${item.type}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${getBgColor(item.type)} rounded-2xl p-6 border-2 border-transparent hover:border-amber-200 transition-all shadow-md hover:shadow-xl`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${getGradient(item.type)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                      <i className={`${getIcon(item.type)} text-2xl text-white`}></i>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-neutral-700 shadow-sm mb-1">
                        {item.count} Position{item.count > 1 ? 'en' : ''}
                      </div>
                      <div className="text-accent-gold text-sm font-bold">
                        +{profitPercentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-primary mb-3">
                    {getTypeName(item.type)}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-neutral-600 font-medium">Investiert</span>
                        <span className="font-bold text-neutral-800">
                          {item.amount.toLocaleString('de-DE')} €
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600 font-medium">Gewinn</span>
                        <span className="font-bold text-green-600">
                          +{item.profit.toLocaleString('de-DE')} €
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-600 mb-2 font-medium">
                        <span>Portfolio-Anteil</span>
                        <span className="font-bold text-accent-gold">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2.5 bg-white/80 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${getGradient(item.type)} rounded-full`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-200/50 flex items-center justify-between">
                    <span className="text-xs text-neutral-600 font-medium">Details ansehen</span>
                    <i className="ri-arrow-right-line text-lg text-accent-gold group-hover:translate-x-2 transition-transform"></i>
                  </div>
                </div>
              </MotionLink>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-funds-line text-2xl text-white"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-600 font-medium mb-1">Gesamtes Portfolio</p>
                <p className="text-2xl font-bold text-primary">
                  {totalInvested.toLocaleString('de-DE')} €
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-neutral-200">
                <p className="text-xs text-neutral-600 mb-1 font-medium">Anlageklassen</p>
                <p className="text-lg font-bold text-primary">{investmentsByType.length}</p>
              </div>
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-neutral-200">
                <p className="text-xs text-neutral-600 mb-1 font-medium">Positionen</p>
                <p className="text-lg font-bold text-primary">{investments.length}</p>
              </div>
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-neutral-200">
                <p className="text-xs text-neutral-600 mb-1 font-medium">Diversifikation</p>
                <p className="text-lg font-bold text-accent-gold">
                  {investmentsByType.length >= 3 ? 'Optimal' : investmentsByType.length === 2 ? 'Gut' : 'Einzelanlage'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}