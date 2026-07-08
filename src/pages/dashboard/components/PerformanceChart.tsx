import { useState } from 'react';
import { motion } from 'framer-motion';
import { Investment } from '../../../data/users';

interface PerformanceChartProps {
  investments: Investment[];
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

// Portföyün gerçek yatırımlarından aylık değer serisi üretir.
// Pending (beklemede) yatırımlar henüz aktif olmadığından faiz getirmez; sadece anapara park halindedir.
function buildMonthlyData(investments: Investment[]): Array<{ month: string; value: number; profit: number }> {
  const dated = investments.filter(inv => inv.startDate && !isNaN(new Date(inv.startDate).getTime()));
  if (dated.length === 0) return [];

  const firstStart = new Date(Math.min(...dated.map(inv => new Date(inv.startDate).getTime())));
  const cursor = new Date(firstStart.getFullYear(), firstStart.getMonth(), 1);
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), 1);

  const data: Array<{ month: string; value: number; profit: number }> = [];
  while (cursor <= end) {
    let value = 0;
    let profit = 0;
    for (const inv of dated) {
      const start = new Date(inv.startDate);
      const startMonth = new Date(start.getFullYear(), start.getMonth(), 1);
      if (cursor < startMonth) continue; // yatırım henüz başlamadı
      value += inv.amount;
      if (inv.status !== 'pending') {
        const monthsElapsed = (cursor.getFullYear() - start.getFullYear()) * 12 + (cursor.getMonth() - start.getMonth());
        const monthlyInterest = (inv.amount * inv.interestRate) / 100 / 12;
        const accrued = Math.min(monthlyInterest * monthsElapsed, inv.profit);
        value += accrued;
        profit += accrued;
      }
    }
    data.push({
      month: `${MONTH_LABELS[cursor.getMonth()]} ${cursor.getFullYear()}`,
      value: Math.round(value),
      profit: Math.round(profit),
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return data;
}

export default function PerformanceChart({ investments }: PerformanceChartProps) {
  const [timeRange, setTimeRange] = useState('1Y');

  const monthlyData = buildMonthlyData(investments);

  if (monthlyData.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
        <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 p-8 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <i className="ri-bar-chart-box-line text-2xl"></i>
            </div>
            <h2 className="text-2xl font-heading font-bold">Performance-Entwicklung</h2>
          </div>
        </div>
        <div className="p-12 text-center text-neutral-600">
          Noch keine Wertentwicklung verfügbar.
        </div>
      </div>
    );
  }

  const totalAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const hasPerformance = monthlyData.some(d => d.profit > 0);

  // Portföyde henüz getiri yoksa (yatırım beklemede / ausstehend) çubuk grafik yerine
  // dürüst ve dikkat çekici bir "Ausstehend" durum ekranı gösterilir.
  if (!hasPerformance) {
    const rateLabel = investments.length === 1
      ? `${investments[0].interestRate.toLocaleString('de-DE')}% p.a.`
      : 'variabel';

    return (
      <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
        <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <i className="ri-bar-chart-box-line text-2xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold">Performance-Entwicklung</h2>
              <p className="text-white/80 text-sm mt-1">Aktivierung Ihrer Anlage ausstehend</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-orange-400/30 rounded-full animate-ping"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                <i className="ri-time-line text-5xl text-white"></i>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold border border-orange-200 mb-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Ausstehend
            </div>

            <h3 className="text-2xl font-heading font-bold text-primary mb-3">
              Ihre Anlage ist derzeit ausstehend
            </h3>
            <p className="text-neutral-600 mb-8">
              Sobald Ihre Anlage geprüft und aktiviert wurde, sehen Sie an dieser Stelle die
              monatliche Wertentwicklung Ihres Portfolios. Die Aktivierung erfolgt in der Regel
              innerhalb weniger Werktage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
              <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-5 border border-amber-100">
                <p className="text-sm text-neutral-600 mb-1 font-medium">Anlagebetrag</p>
                <p className="text-xl font-bold text-primary">{totalAmount.toLocaleString('de-DE')} €</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-100">
                <p className="text-sm text-neutral-600 mb-1 font-medium">Zinssatz</p>
                <p className="text-xl font-bold text-amber-700">{rateLabel}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
                <p className="text-sm text-neutral-600 mb-1 font-medium">Status</p>
                <p className="text-xl font-bold text-orange-600">Ausstehend</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2 font-medium">
                <span>Aktivierung</span>
                <span className="text-orange-600 font-bold">Ausstehend</span>
              </div>
              <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full w-1/3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...monthlyData.map(d => d.value));
  const minValue = Math.min(...monthlyData.map(d => d.value));
  const range = maxValue - minValue || 1;

  const timeRanges = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1J', value: '1Y' },
    { label: 'Alle', value: 'ALL' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-bar-chart-box-line text-2xl"></i>
                </div>
                <h2 className="text-2xl font-heading font-bold">Performance-Entwicklung</h2>
              </div>
              <p className="text-white/90 text-base">
                Monatliche Wertentwicklung Ihres Portfolios
              </p>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1.5 shadow-lg">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    timeRange === range.value
                      ? 'bg-accent-gold text-primary shadow-md'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-5 border border-amber-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-md">
                <i className="ri-arrow-up-line text-xl text-white"></i>
              </div>
              <p className="text-sm text-primary font-medium">Höchstwert</p>
            </div>
            <p className="text-2xl font-bold text-primary">
              {maxValue.toLocaleString('de-DE')} €
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                <i className="ri-line-chart-line text-xl text-white"></i>
              </div>
              <p className="text-sm text-amber-700 font-medium">Durchschnitt</p>
            </div>
            <p className="text-2xl font-bold text-amber-700">
              {((monthlyData.reduce((sum, d) => sum + d.value, 0)) / monthlyData.length).toLocaleString('de-DE', { maximumFractionDigits: 0 })} €
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-5 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                <i className="ri-trophy-line text-xl text-white"></i>
              </div>
              <p className="text-sm text-green-700 font-medium">Wachstum</p>
            </div>
            <p className="text-2xl font-bold text-green-700">
              +{(minValue > 0 ? (maxValue - minValue) / minValue * 100 : 0).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-80">
          <div className="absolute inset-0 flex items-end justify-between gap-2">
            {monthlyData.map((data, index) => {
              const height = maxValue === minValue ? 60 : ((data.value - minValue) / range) * 90 + 10;
              const isLast = index === monthlyData.length - 1;
              
              return (
                <motion.div
                  key={data.month}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${height}%`, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                  className="flex-1 group relative cursor-pointer"
                >
                  <div className={`h-full rounded-t-xl transition-all ${
                    isLast
                      ? 'bg-gradient-to-t from-primary to-primary-dark shadow-lg shadow-primary/30'
                      : 'bg-gradient-to-t from-neutral-200 to-neutral-300 group-hover:from-amber-400 group-hover:to-amber-500'
                  }`}>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div className="bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap">
                        <p className="text-xs font-medium text-neutral-300 mb-1">{data.month}</p>
                        <p className="text-sm font-bold mb-1">{data.value.toLocaleString('de-DE')} €</p>
                        <p className="text-xs text-amber-400 font-semibold">
                          +{data.profit.toLocaleString('de-DE')} € Gewinn
                        </p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-neutral-900 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Month Label */}
                  <p className="text-xs text-neutral-600 font-medium text-center mt-3 transform -rotate-45 origin-top-left">
                    {data.month.split(' ')[0]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded"></div>
              <span className="text-sm text-neutral-600 font-medium">Vergangene Monate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-primary to-primary-dark rounded shadow-md"></div>
              <span className="text-sm text-neutral-600 font-medium">Aktueller Monat</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-information-line text-accent-gold"></i>
              <span className="text-sm text-neutral-600">Hover für Details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}