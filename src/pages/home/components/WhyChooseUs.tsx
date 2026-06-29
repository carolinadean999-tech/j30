import { useEffect, useState } from 'react';

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('why-choose-us');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: 'ri-shield-check-line',
      title: 'Transparente Strukturen',
      description: 'Klare Governance- und Compliance-Strukturen sowie transparente Prozesse für Ihre Sicherheit.',
      image: '/images/regulation-001.jpg',
      stats: { value: '100%', label: 'Konform' }
    },
    {
      icon: 'ri-team-line',
      title: 'Erfahrenes Team',
      description: 'Über 15 Jahre kombinierte Kapitalmarkterfahrung. Unser Expertenteam verfügt über tiefgreifende Kenntnisse in allen Anlageklassen.',
      image: '/images/team-exp-001.jpg',
      stats: { value: '15+', label: 'Jahre' }
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Bewährte Strategien',
      description: 'Datengetriebene Anlageentscheidungen basierend auf fundierten Analysen. Risikomanagement und Diversifikation stehen im Mittelpunkt.',
      image: '/images/strategy-001.jpg',
      stats: { value: '2,5 Mrd.', label: 'AuM' }
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Persönliche Betreuung',
      description: 'Dedizierte Ansprechpartner für alle Ihre Anliegen. Individuelle Beratung und maßgeschneiderte Lösungen für Ihre Anlageziele.',
      image: '/images/service-001.jpg',
      stats: { value: '450+', label: 'Kunden' }
    },
    {
      icon: 'ri-lock-line',
      title: 'Höchste Sicherheit',
      description: 'Strenge Sicherheitsprotokolle und Risikomanagement-Systeme. Ihre Vermögenswerte sind durch umfassende Sicherheitsmaßnahmen geschützt.',
      image: '/images/security-001.jpg',
      stats: { value: 'AAA', label: 'Rating' }
    },
    {
      icon: 'ri-global-line',
      title: 'Globale Reichweite',
      description: 'Zugang zu internationalen Märkten und Anlageklassen. Profitieren Sie von globalen Investmentchancen mit lokaler Expertise.',
      image: '/images/global-001.jpg',
      stats: { value: '25+', label: 'Märkte' }
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent-gold/10 rounded-full px-6 py-3 mb-6">
            <i className="ri-star-line text-primary text-xl"></i>
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Warum J30</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
            Ihr Partner für <span className="gradient-text">professionelle Kapitalverwaltung</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Vertrauen Sie auf Erfahrung, Expertise und regulatorische Exzellenz
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-neutral-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={reason.image}
                  alt={reason.title}
                  className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"></div>
                
                {/* Stats Badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <p className="text-2xl font-bold text-primary">{reason.stats.value}</p>
                    <p className="text-xs text-neutral-600 font-semibold">{reason.stats.label}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent-gold rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent-gold rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <i className={`${reason.icon} text-3xl text-white`}></i>
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-gold rounded-3xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
