import { useState, useEffect } from 'react';
import ServiceHero from '../components/ServiceHero';
import ServiceBenefits from '../components/ServiceBenefits';
import ServiceTarget from '../components/ServiceTarget';
import ServiceRisks from '../components/ServiceRisks';
import ServiceCTA from '../components/ServiceCTA';
import Testimonials from '../../../components/feature/Testimonials';

export default function TagesgeldPage() {
  const [calculatorData, setCalculatorData] = useState({
    amount: 50000,
    days: 90,
    interestRate: 2.3,
    monthlyDeposit: 0,
    monthlyWithdrawal: 0
  });

  const [dailyBalance, setDailyBalance] = useState<number[]>([]);

  useEffect(() => {
    calculateDailyBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatorData]);

  const calculateDailyBalance = () => {
    const balances: number[] = [];
    let currentBalance = calculatorData.amount;
    const dailyRate = calculatorData.interestRate / 100 / 365;
    
    for (let day = 0; day <= calculatorData.days; day++) {
      // Add monthly deposit
      if (day > 0 && day % 30 === 0) {
        currentBalance += calculatorData.monthlyDeposit;
        currentBalance -= calculatorData.monthlyWithdrawal;
      }
      
      // Add daily interest
      currentBalance += currentBalance * dailyRate;
      balances.push(currentBalance);
    }
    
    setDailyBalance(balances);
  };

  const finalBalance = dailyBalance[dailyBalance.length - 1] || calculatorData.amount;
  const totalProfit = finalBalance - calculatorData.amount - 
    (Math.floor(calculatorData.days / 30) * (calculatorData.monthlyDeposit - calculatorData.monthlyWithdrawal));

  const heroData = {
    title: 'Tagesgeld',
    subtitle: 'Maximale Liquidität bei transparenter Verzinsung',
    description: 'Tägliche Verfügbarkeit Ihres Kapitals bei attraktiver Verzinsung. Die ideale Lösung für kurzfristige Liquiditätsreserven und flexible Finanzplanung.',
    icon: 'ri-wallet-3-line',
    color: 'from-amber-500 to-amber-600'
  };

  const benefits = [
    {
      icon: 'ri-time-line',
      title: 'Tägliche Verfügbarkeit',
      description: 'Greifen Sie jederzeit auf Ihr Kapital zu – ohne Kündigungsfristen, ohne Einschränkungen. Maximale Flexibilität für Ihre Liquiditätsplanung.'
    },
    {
      icon: 'ri-calendar-close-line',
      title: 'Keine Kündigungsfrist',
      description: 'Im Gegensatz zu Festgeld oder Flexgeld können Sie Ihr Geld jederzeit ohne Vorankündigung abheben. Volle Kontrolle über Ihre Mittel.'
    },
    {
      icon: 'ri-percent-line',
      title: 'Transparente Zinsen',
      description: 'Klare und nachvollziehbare Verzinsung, die täglich auf Ihr Guthaben angerechnet wird. Keine versteckten Bedingungen oder Überraschungen.'
    },
    {
      icon: 'ri-refresh-line',
      title: 'Variable Verzinsung',
      description: 'Die Zinssätze passen sich den aktuellen Marktbedingungen an. Profitieren Sie von steigenden Zinsen ohne Wartezeit.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Einlagensicherung',
      description: 'Ihr Tagesgeld ist durch die gesetzliche Einlagensicherung geschützt. Zusätzliche Sicherheit durch institutionelle Sicherungssysteme.'
    },
    {
      icon: 'ri-money-euro-circle-line',
      title: 'Keine Mindestanlage',
      description: 'Flexible Einstiegsmöglichkeiten ohne hohe Mindestbeträge. Ideal für die Verwaltung von Liquiditätsreserven jeder Größe.'
    }
  ];

  const targetGroups = [
    {
      icon: 'ri-building-line',
      title: 'Unternehmen',
      description: 'Firmen, die Betriebsmittel oder Liquiditätsreserven sicher und rentabel parken möchten, aber jederzeit Zugriff benötigen.'
    },
    {
      icon: 'ri-funds-line',
      title: 'Treasury-Abteilungen',
      description: 'Professionelles Cash-Management für Konzerne und größere Unternehmen mit täglichen Liquiditätsbewegungen.'
    },
    {
      icon: 'ri-hospital-line',
      title: 'Gemeinnützige Organisationen',
      description: 'Stiftungen, Vereine und NGOs, die Spendengelder oder Rücklagen kurzfristig anlegen möchten.'
    },
    {
      icon: 'ri-user-line',
      title: 'Flexible Anleger',
      description: 'Investoren, die maximale Flexibilität benötigen und nicht auf Liquidität verzichten möchten.'
    }
  ];

  const risks = [
    {
      title: 'Zinsänderungsrisiko',
      description: 'Die Zinssätze können sich jederzeit ändern und sind nicht für einen bestimmten Zeitraum garantiert. Bei sinkenden Marktzinsen sinkt auch Ihre Verzinsung.',
      level: 'Mittel'
    },
    {
      title: 'Inflationsrisiko',
      description: 'Bei niedriger Verzinsung kann die Inflation die reale Kaufkraft Ihres Guthabens reduzieren. Besonders relevant in Hochinflationsphasen.',
      level: 'Mittel'
    },
    {
      title: 'Opportunitätsrisiko',
      description: 'Die Rendite ist in der Regel niedriger als bei Festgeld oder Flexgeld. Sie verzichten auf höhere Zinsen zugunsten maximaler Flexibilität.',
      level: 'Niedrig'
    },
    {
      title: 'Emittentenrisiko',
      description: 'Das Risiko der Zahlungsunfähigkeit der Bank. Durch Einlagensicherung jedoch stark minimiert.',
      level: 'Sehr Niedrig'
    }
  ];

  return (
    <div className="min-h-screen">
      <main>
        <ServiceHero {...heroData} />
        
        {/* Interactive Calculator */}
        <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-6">
                <i className="ri-calculator-line text-3xl text-white"></i>
              </div>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Tagesgeld-Rechner
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Berechnen Sie Ihre täglichen Zinserträge mit flexiblen Ein- und Auszahlungen
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Inputs */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-amber-100">
                <h3 className="text-2xl font-heading font-bold text-primary mb-8">Ihre Anlage</h3>
                
                <div className="space-y-8">
                  {/* Initial Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-semibold text-neutral-700">Startbetrag</label>
                      <span className="text-2xl font-bold text-amber-600">{calculatorData.amount.toLocaleString('de-DE')} €</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="500000"
                      step="1000"
                      value={calculatorData.amount}
                      onChange={(e) => setCalculatorData({ ...calculatorData, amount: Number(e.target.value) })}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((calculatorData.amount - 1000) / 499000) * 100}%, #fef3c7 ${((calculatorData.amount - 1000) / 499000) * 100}%, #fef3c7 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 mt-2">
                      <span>1.000 €</span>
                      <span>500.000 €</span>
                    </div>
                  </div>

                  {/* Duration in Days */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-semibold text-neutral-700">Anlagedauer</label>
                      <span className="text-2xl font-bold text-amber-600">{calculatorData.days} Tage</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="365"
                      step="30"
                      value={calculatorData.days}
                      onChange={(e) => setCalculatorData({ ...calculatorData, days: Number(e.target.value) })}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((calculatorData.days - 30) / 335) * 100}%, #fef3c7 ${((calculatorData.days - 30) / 335) * 100}%, #fef3c7 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 mt-2">
                      <span>1 Monat</span>
                      <span>1 Jahr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-semibold text-neutral-700">Zinssatz p.a.</label>
                      <span className="text-2xl font-bold text-amber-600">{calculatorData.interestRate.toFixed(2)} %</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="4"
                      step="0.1"
                      value={calculatorData.interestRate}
                      onChange={(e) => setCalculatorData({ ...calculatorData, interestRate: Number(e.target.value) })}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((calculatorData.interestRate - 0.5) / 3.5) * 100}%, #fef3c7 ${((calculatorData.interestRate - 0.5) / 3.5) * 100}%, #fef3c7 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 mt-2">
                      <span>0,5 %</span>
                      <span>4,0 %</span>
                    </div>
                  </div>

                  {/* Monthly Deposit */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-semibold text-neutral-700">Monatliche Einzahlung</label>
                      <span className="text-2xl font-bold text-green-600">{calculatorData.monthlyDeposit.toLocaleString('de-DE')} €</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={calculatorData.monthlyDeposit}
                      onChange={(e) => setCalculatorData({ ...calculatorData, monthlyDeposit: Number(e.target.value) })}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${(calculatorData.monthlyDeposit / 10000) * 100}%, #d1fae5 ${(calculatorData.monthlyDeposit / 10000) * 100}%, #d1fae5 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 mt-2">
                      <span>0 €</span>
                      <span>10.000 €</span>
                    </div>
                  </div>

                  {/* Monthly Withdrawal */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-semibold text-neutral-700">Monatliche Auszahlung</label>
                      <span className="text-2xl font-bold text-red-600">{calculatorData.monthlyWithdrawal.toLocaleString('de-DE')} €</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={calculatorData.monthlyWithdrawal}
                      onChange={(e) => setCalculatorData({ ...calculatorData, monthlyWithdrawal: Number(e.target.value) })}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(calculatorData.monthlyWithdrawal / 10000) * 100}%, #fee2e2 ${(calculatorData.monthlyWithdrawal / 10000) * 100}%, #fee2e2 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 mt-2">
                      <span>0 €</span>
                      <span>10.000 €</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <i className="ri-money-euro-circle-line text-3xl"></i>
                      <h3 className="text-2xl font-heading font-bold">Ihr Guthaben</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-amber-100 text-sm mb-2">Endguthaben nach {calculatorData.days} Tagen</p>
                        <p className="text-5xl font-bold">{finalBalance.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
                      </div>
                      
                      <div className="h-px bg-white/20"></div>
                      
                      <div>
                        <p className="text-amber-100 text-sm mb-2">Zinsertrag</p>
                        <p className="text-3xl font-bold text-green-300">+ {totalProfit.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
                      </div>

                      <div className="h-px bg-white/20"></div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-amber-100 text-xs mb-1">Täglicher Zins</p>
                          <p className="text-lg font-bold">{(totalProfit / calculatorData.days).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
                        </div>
                        <div>
                          <p className="text-amber-100 text-xs mb-1">Monatlicher Zins</p>
                          <p className="text-lg font-bold">{((totalProfit / calculatorData.days) * 30).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                      <i className="ri-calendar-line text-xl text-amber-600"></i>
                    </div>
                    <p className="text-xs text-neutral-600 mb-1">Laufzeit</p>
                    <p className="text-lg font-bold text-primary">{calculatorData.days} Tage</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                      <i className="ri-arrow-up-line text-xl text-green-600"></i>
                    </div>
                    <p className="text-xs text-neutral-600 mb-1">Einzahlungen</p>
                    <p className="text-lg font-bold text-primary">{(Math.floor(calculatorData.days / 30) * calculatorData.monthlyDeposit).toLocaleString('de-DE')} €</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                      <i className="ri-arrow-down-line text-xl text-red-600"></i>
                    </div>
                    <p className="text-xs text-neutral-600 mb-1">Auszahlungen</p>
                    <p className="text-lg font-bold text-primary">{(Math.floor(calculatorData.days / 30) * calculatorData.monthlyWithdrawal).toLocaleString('de-DE')} €</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-flashlight-line text-xl text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">Maximale Flexibilität</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        Ihr Geld ist jederzeit verfügbar. Zinsen werden täglich gutgeschrieben und Sie können beliebig ein- und auszahlen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-line-chart-line text-xl text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">Zinseszins-Effekt</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        Durch die tägliche Zinsgutschrift profitieren Sie vom Zinseszins-Effekt. Ihre Zinsen werden automatisch mitverzinst.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Warum Tagesgeld?
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Die flexible Lösung für Ihre Liquiditätsreserven
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-flashlight-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">Sofortige Verfügbarkeit</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Ihr Geld ist jederzeit verfügbar. Keine Wartezeiten, keine Kündigungsfristen – maximale Flexibilität für Ihre Finanzplanung.
                </p>
                <div className="text-amber-600 font-semibold">24/7 Zugriff</div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-percent-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">Aktuelle Zinssätze</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Profitieren Sie von marktgerechten Zinssätzen, die sich an den aktuellen Konditionen orientieren.
                </p>
                <div className="text-amber-600 font-semibold">Bis zu 2,5% p.a.</div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-money-euro-circle-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">Flexible Beträge</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Keine Mindestanlage erforderlich. Verwalten Sie Liquiditätsreserven jeder Größenordnung.
                </p>
                <div className="text-amber-600 font-semibold">Ab 1.000 €</div>
              </div>
            </div>
          </div>
        </section>

        <ServiceBenefits benefits={benefits} />
        <ServiceTarget targetGroups={targetGroups} />
        <ServiceRisks risks={risks} />
        
        {/* Use Cases */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Typische Anwendungsfälle
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                So nutzen unsere Mandanten Tagesgeld optimal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-building-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-primary mb-2">Betriebsmittelreserve</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Unternehmen parken kurzfristig nicht benötigte Betriebsmittel auf Tagesgeldkonten. So bleiben die Mittel verfügbar für unvorhergesehene Ausgaben, erwirtschaften aber dennoch Zinsen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-exchange-dollar-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-primary mb-2">Cash-Management</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Treasury-Abteilungen nutzen Tagesgeld für professionelles Cash-Management. Überschüssige Liquidität wird verzinst angelegt, bleibt aber jederzeit verfügbar für Zahlungsverpflichtungen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-primary mb-2">Übergangsanlage</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Investoren nutzen Tagesgeld als Zwischenanlage, während sie auf günstige Einstiegszeitpunkte für langfristige Investments warten. Das Kapital bleibt verfügbar und wird verzinst.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-primary mb-2">Sicherheitsreserve</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Organisationen halten Notfallreserven auf Tagesgeldkonten. Im Krisenfall ist das Kapital sofort verfügbar, in ruhigen Zeiten wird es verzinst.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceCTA 
          title="Interessiert an Tagesgeld?"
          description="Erfahren Sie mehr über unsere Tagesgeld-Lösungen und wie Sie Ihre Liquiditätsreserven optimal verwalten können."
        />
        <Testimonials />
      </main>
    </div>
  );
}