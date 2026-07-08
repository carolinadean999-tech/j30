import { useState } from 'react';
import ServiceHero from '../components/ServiceHero';
import ServiceBenefits from '../components/ServiceBenefits';
import ServiceTarget from '../components/ServiceTarget';
import ServiceRisks from '../components/ServiceRisks';
import ServiceCTA from '../components/ServiceCTA';

export default function AktienPage() {
  const [investmentAmount, setInvestmentAmount] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [volatility, setVolatility] = useState(15);
  const [selectedStrategy, setSelectedStrategy] = useState('balanced');
  const [selectedSector, setSelectedSector] = useState<string[]>(['technology']);

  // Hesaplamalar
  const totalMonthlyContributions = monthlyContribution * investmentPeriod * 12;
  const totalInvested = investmentAmount + totalMonthlyContributions;
  const averageReturn = expectedReturn / 100;
  const futureValue = investmentAmount * Math.pow(1 + averageReturn, investmentPeriod) +
    monthlyContribution * ((Math.pow(1 + averageReturn / 12, investmentPeriod * 12) - 1) / (averageReturn / 12));
  const totalReturn = futureValue - totalInvested;
  const returnPercentage = ((futureValue - totalInvested) / totalInvested) * 100;

  const strategies = [
    {
      id: 'conservative',
      name: 'Konservativ',
      icon: 'ri-shield-check-line',
      color: 'from-emerald-500 to-teal-600',
      risk: 'Niedrig',
      expectedReturn: '4-6%',
      description: 'Blue-Chip Aktien, Dividendenfokus',
      allocation: { stocks: 60, bonds: 30, cash: 10 }
    },
    {
      id: 'balanced',
      name: 'Ausgewogen',
      icon: 'ri-scales-line',
      color: 'from-blue-500 to-indigo-600',
      risk: 'Mittel',
      expectedReturn: '6-9%',
      description: 'Diversifiziertes Portfolio',
      allocation: { stocks: 70, bonds: 20, cash: 10 }
    },
    {
      id: 'growth',
      name: 'Wachstum',
      icon: 'ri-rocket-line',
      color: 'from-violet-500 to-purple-600',
      risk: 'Mittel-Hoch',
      expectedReturn: '8-12%',
      description: 'Wachstumsaktien, Innovation',
      allocation: { stocks: 85, bonds: 10, cash: 5 }
    },
    {
      id: 'aggressive',
      name: 'Aggressiv',
      icon: 'ri-fire-line',
      color: 'from-orange-500 to-red-600',
      risk: 'Hoch',
      expectedReturn: '10-15%',
      description: 'Small-Caps, Emerging Markets',
      allocation: { stocks: 95, bonds: 0, cash: 5 }
    }
  ];

  const sectors = [
    { id: 'technology', name: 'Technologie', icon: 'ri-computer-line', color: 'bg-blue-500' },
    { id: 'healthcare', name: 'Gesundheit', icon: 'ri-heart-pulse-line', color: 'bg-red-500' },
    { id: 'finance', name: 'Finanzen', icon: 'ri-bank-line', color: 'bg-emerald-500' },
    { id: 'consumer', name: 'Konsum', icon: 'ri-shopping-cart-line', color: 'bg-violet-500' },
    { id: 'industry', name: 'Industrie', icon: 'ri-factory-line', color: 'bg-orange-500' },
    { id: 'energy', name: 'Energie', icon: 'ri-flashlight-line', color: 'bg-yellow-500' },
    { id: 'realestate', name: 'Immobilien', icon: 'ri-building-line', color: 'bg-teal-500' },
    { id: 'materials', name: 'Rohstoffe', icon: 'ri-oil-line', color: 'bg-amber-600' }
  ];

  const marketData = [
    { index: 'DAX', value: '17.845,32', change: '+1.24%', positive: true },
    { index: 'S&P 500', value: '5.123,41', change: '+0.87%', positive: true },
    { index: 'NASDAQ', value: '16.274,94', change: '+1.45%', positive: true },
    { index: 'EURO STOXX 50', value: '4.892,15', change: '-0.32%', positive: false }
  ];

  const topStocks = [
    { name: 'SAP SE', price: '142,85 €', change: '+2.1%', sector: 'Tech', positive: true },
    { name: 'Siemens AG', price: '178,42 €', change: '+1.8%', sector: 'Industrie', positive: true },
    { name: 'Allianz SE', price: '245,30 €', change: '-0.5%', sector: 'Finanzen', positive: false },
    { name: 'BASF SE', price: '48,92 €', change: '+0.9%', sector: 'Chemie', positive: true },
    { name: 'Deutsche Telekom', price: '22,15 €', change: '+1.2%', sector: 'Telekom', positive: true },
    { name: 'Volkswagen AG', price: '112,68 €', change: '-1.1%', sector: 'Auto', positive: false }
  ];

  const toggleSector = (sectorId: string) => {
    setSelectedSector(prev =>
      prev.includes(sectorId)
        ? prev.filter(id => id !== sectorId)
        : [...prev, sectorId]
    );
  };

  const selectedStrategyData = strategies.find(s => s.id === selectedStrategy);

  return (
    <div className="min-h-screen">
      <main>
        <ServiceHero
          title="Aktieninvestments"
          subtitle="Langfristiger Vermögensaufbau durch strategische Aktienanlagen"
          description="Profitieren Sie von den Wachstumschancen der globalen Aktienmärkte mit professionellem Portfolio-Management und individueller Risikokontrolle."
          icon="ri-line-chart-line"
        />

        {/* Live Market Data */}
        <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-accent-gold/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-accent-gold rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-heading font-bold text-white">Live Marktdaten</h3>
              </div>
              <div className="text-white/80 text-sm">Aktualisiert: {new Date().toLocaleTimeString('de-DE')}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {marketData.map((market, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-white/70 text-sm mb-2">{market.index}</div>
                  <div className="text-3xl font-bold text-white mb-2">{market.value}</div>
                  <div className={`flex items-center space-x-2 ${market.positive ? 'text-green-400' : 'text-red-400'}`}>
                    <i className={`${market.positive ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} text-xl`}></i>
                    <span className="font-semibold">{market.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h4 className="text-xl font-heading font-bold text-white mb-6">Top Aktien</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topStocks.map((stock, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{stock.name}</span>
                      <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">{stock.sector}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">{stock.price}</span>
                      <span className={`flex items-center space-x-1 ${stock.positive ? 'text-green-400' : 'text-red-400'}`}>
                        <i className={`${stock.positive ? 'ri-arrow-up-line' : 'ri-arrow-down-line'}`}></i>
                        <span className="text-sm font-semibold">{stock.change}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Investment Strategy Selector */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-40 left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-40 w-96 h-96 bg-accent-gold/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent-gold/10 rounded-full px-6 py-3 mb-6">
                <i className="ri-compass-line text-primary text-xl"></i>
                <span className="text-sm font-bold text-primary uppercase tracking-wider">Anlagestrategie</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
                Wählen Sie Ihre <span className="gradient-text">Strategie</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Individuelle Anlagestrategien für jeden Risikotyp und jedes Anlageziel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {strategies.map((strategy) => (
                <div
                  key={strategy.id}
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className={`relative cursor-pointer group ${
                    selectedStrategy === strategy.id ? 'ring-4 ring-accent-gold' : ''
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${strategy.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${strategy.icon} text-3xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">{strategy.name}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-neutral-600">Risiko:</span>
                      <span className="text-sm font-semibold text-primary">{strategy.risk}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-neutral-600">Rendite:</span>
                      <span className="text-sm font-semibold text-accent-gold">{strategy.expectedReturn}</span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">{strategy.description}</p>
                    
                    {selectedStrategy === strategy.id && (
                      <div className="mt-4 pt-4 border-t border-neutral-200">
                        <div className="text-xs font-semibold text-neutral-700 mb-2">Asset Allocation:</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-600">Aktien</span>
                            <span className="font-semibold text-primary">{strategy.allocation.stocks}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-primary to-accent-gold h-2 rounded-full" style={{ width: `${strategy.allocation.stocks}%` }}></div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-600">Anleihen</span>
                            <span className="font-semibold text-primary">{strategy.allocation.bonds}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full" style={{ width: `${strategy.allocation.bonds}%` }}></div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-600">Cash</span>
                            <span className="font-semibold text-primary">{strategy.allocation.cash}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-neutral-400 to-neutral-600 h-2 rounded-full" style={{ width: `${strategy.allocation.cash}%` }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedStrategy === strategy.id && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center shadow-lg">
                      <i className="ri-check-line text-white text-lg"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sector Selection */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-6">Branchenfokus wählen</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sectors.map((sector) => (
                  <div
                    key={sector.id}
                    onClick={() => toggleSector(sector.id)}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                      selectedSector.includes(sector.id)
                        ? 'border-accent-gold bg-accent-gold/10'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className={`w-12 h-12 ${sector.color} rounded-xl flex items-center justify-center mb-3`}>
                      <i className={`${sector.icon} text-2xl text-white`}></i>
                    </div>
                    <div className="font-semibold text-neutral-900 text-sm">{sector.name}</div>
                    {selectedSector.includes(sector.id) && (
                      <div className="mt-2">
                        <i className="ri-check-line text-accent-gold text-lg"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Calculator */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-accent-gold/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-accent-gold rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                Investitionsrechner
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Berechnen Sie Ihre potenzielle Rendite mit unserem erweiterten Aktien-Rechner
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-heading font-bold text-white mb-8">Parameter einstellen</h3>
                
                <div className="space-y-8">
                  {/* Initial Investment */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-white font-semibold flex items-center space-x-2">
                        <i className="ri-money-euro-circle-line text-accent-gold text-xl"></i>
                        <span>Anfangsinvestition</span>
                      </label>
                      <span className="text-2xl font-bold text-accent-gold">{investmentAmount.toLocaleString('de-DE')} €</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider-thumb-gold"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>10.000 €</span>
                      <span>1.000.000 €</span>
                    </div>
                  </div>

                  {/* Monthly Contribution */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-white font-semibold flex items-center space-x-2">
                        <i className="ri-calendar-line text-accent-gold text-xl"></i>
                        <span>Monatliche Sparrate</span>
                      </label>
                      <span className="text-2xl font-bold text-accent-gold">{monthlyContribution.toLocaleString('de-DE')} €</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider-thumb-gold"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>0 €</span>
                      <span>10.000 €</span>
                    </div>
                  </div>

                  {/* Investment Period */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-white font-semibold flex items-center space-x-2">
                        <i className="ri-time-line text-accent-gold text-xl"></i>
                        <span>Anlagedauer</span>
                      </label>
                      <span className="text-2xl font-bold text-accent-gold">{investmentPeriod} Jahre</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider-thumb-gold"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>1 Jahr</span>
                      <span>30 Jahre</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-white font-semibold flex items-center space-x-2">
                        <i className="ri-line-chart-line text-accent-gold text-xl"></i>
                        <span>Erwartete Rendite p.a.</span>
                      </label>
                      <span className="text-2xl font-bold text-accent-gold">{expectedReturn}%</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="15"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider-thumb-gold"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>3%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* Volatility */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-white font-semibold flex items-center space-x-2">
                        <i className="ri-pulse-line text-accent-gold text-xl"></i>
                        <span>Volatilität</span>
                      </label>
                      <span className="text-2xl font-bold text-accent-gold">{volatility}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={volatility}
                      onChange={(e) => setVolatility(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider-thumb-gold"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>5% (Niedrig)</span>
                      <span>30% (Hoch)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                {/* Main Result Card */}
                <div className="bg-gradient-to-br from-accent-gold via-accent-gold/90 to-yellow-600 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <i className="ri-trophy-line text-3xl text-white"></i>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white">Prognostizierter Endwert</h3>
                  </div>
                  <div className="text-6xl font-bold text-white mb-4">
                    {futureValue.toLocaleString('de-DE', { maximumFractionDigits: 0 })} €
                  </div>
                  <div className="flex items-center space-x-2 text-white/90">
                    <i className="ri-arrow-up-line text-2xl"></i>
                    <span className="text-xl font-semibold">+{returnPercentage.toFixed(1)}% Gesamtrendite</span>
                  </div>
                </div>

                {/* Breakdown Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <i className="ri-wallet-line text-accent-gold text-xl"></i>
                      <span className="text-white/80 text-sm">Gesamtinvestition</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{totalInvested.toLocaleString('de-DE')} €</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <i className="ri-funds-line text-accent-gold text-xl"></i>
                      <span className="text-white/80 text-sm">Kapitalgewinn</span>
                    </div>
                    <div className="text-3xl font-bold text-green-400">+{totalReturn.toLocaleString('de-DE', { maximumFractionDigits: 0 })} €</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <i className="ri-hand-coin-line text-accent-gold text-xl"></i>
                      <span className="text-white/80 text-sm">Anfangsinvestition</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{investmentAmount.toLocaleString('de-DE')} €</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <i className="ri-repeat-line text-accent-gold text-xl"></i>
                      <span className="text-white/80 text-sm">Sparraten gesamt</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{totalMonthlyContributions.toLocaleString('de-DE')} €</div>
                  </div>
                </div>

                {/* Strategy Info */}
                {selectedStrategyData && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${selectedStrategyData.color} rounded-xl flex items-center justify-center`}>
                        <i className={`${selectedStrategyData.icon} text-xl text-white`}></i>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Gewählte Strategie</div>
                        <div className="text-accent-gold text-sm">{selectedStrategyData.name}</div>
                      </div>
                    </div>
                    <div className="text-white/80 text-sm mb-3">{selectedStrategyData.description}</div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Risiko: <span className="text-white font-semibold">{selectedStrategyData.risk}</span></span>
                      <span className="text-white/70">Erwartete Rendite: <span className="text-accent-gold font-semibold">{selectedStrategyData.expectedReturn}</span></span>
                    </div>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
                  <div className="flex items-start space-x-3">
                    <i className="ri-information-line text-blue-300 text-2xl mt-1"></i>
                    <div className="text-white/90 text-sm leading-relaxed">
                      <strong className="text-white">Cost-Average-Effekt:</strong> Durch regelmäßige monatliche Investitionen kaufen Sie bei niedrigen Kursen mehr Anteile und bei hohen Kursen weniger, was langfristig zu einem günstigeren Durchschnittspreis führt.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceBenefits
          benefits={[
            {
              icon: 'ri-global-line',
              title: 'Globale Diversifikation',
              description: 'Zugang zu internationalen Aktienmärkten und führenden Unternehmen weltweit'
            },
            {
              icon: 'ri-line-chart-line',
              title: 'Langfristiges Wachstum',
              description: 'Historisch höchste Renditen unter allen Anlageklassen über lange Zeiträume'
            },
            {
              icon: 'ri-shield-check-line',
              title: 'Professionelles Management',
              description: 'Aktives Portfolio-Management durch erfahrene Investmentexperten'
            },
            {
              icon: 'ri-pie-chart-line',
              title: 'Flexible Strategien',
              description: 'Von konservativ bis aggressiv - passend zu Ihrem Risikoprofil'
            },
            {
              icon: 'ri-funds-line',
              title: 'Dividendenerträge',
              description: 'Zusätzliche Einnahmen durch regelmäßige Dividendenzahlungen'
            },
            {
              icon: 'ri-refresh-line',
              title: 'Liquidität',
              description: 'Börsentägliche Handelbarkeit für maximale Flexibilität'
            }
          ]}
        />

        <ServiceTarget
          targetGroups={[
            {
              icon: 'ri-time-line',
              title: 'Langfristige Anleger',
              description: 'Investoren mit einem Anlagehorizont von mindestens 5-10 Jahren'
            },
            {
              icon: 'ri-rocket-line',
              title: 'Wachstumsorientierte',
              description: 'Anleger, die höhere Renditen als bei festverzinslichen Anlagen anstreben'
            },
            {
              icon: 'ri-pulse-line',
              title: 'Risikobereite Investoren',
              description: 'Bereitschaft, kurzfristige Schwankungen für langfristiges Wachstum zu akzeptieren'
            },
            {
              icon: 'ri-building-line',
              title: 'Institutionelle Anleger',
              description: 'Pensionsfonds, Stiftungen und Versorgungswerke mit Wachstumszielen'
            }
          ]}
        />

        <ServiceRisks
          risks={[
            {
              icon: 'ri-arrow-up-down-line',
              title: 'Kursschwankungen',
              description: 'Aktienkurse unterliegen täglichen Schwankungen und können auch längerfristig fallen',
              level: 'Hoch'
            },
            {
              icon: 'ri-global-line',
              title: 'Marktrisiko',
              description: 'Gesamtmarktentwicklungen können alle Aktien negativ beeinflussen',
              level: 'Mittel-Hoch'
            },
            {
              icon: 'ri-building-line',
              title: 'Unternehmensrisiko',
              description: 'Einzelne Unternehmen können in Schwierigkeiten geraten oder insolvent werden',
              level: 'Mittel'
            },
            {
              icon: 'ri-exchange-line',
              title: 'Währungsrisiko',
              description: 'Bei internationalen Investments können Wechselkursschwankungen die Rendite beeinflussen',
              level: 'Mittel'
            }
          ]}
        />

        <ServiceCTA
          title="Bereit für Ihr Aktieninvestment?"
          description="Unsere Experten beraten Sie gerne zu den optimalen Aktienstrategien für Ihre Anlageziele."
        />
      </main>
    </div>
  );
}
