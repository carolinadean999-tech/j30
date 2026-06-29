import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function TrustHighlights() {
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

    const element = document.getElementById('trust-highlights');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: 'ri-building-line',
      title: 'Sitz in Oberhaching',
      description: 'Grünwalder Weg 28d, 82041 Oberhaching',
      detail: 'Traditionsreicher Finanzstandort',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'ri-building-2-line',
      title: 'Rechtsform',
      description: 'GmbH',
      detail: 'Gesellschaft mit beschränkter Haftung',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: 'ri-building-line',
      title: 'Handelsregister',
      description: 'HRB 293622',
      detail: 'Amtsgericht München',
      color: 'from-violet-500 to-violet-600',
      link: 'https://www.northdata.de/J30%20Verm%C3%B6gensverwaltung%20GmbH,%20Oberhaching/Amtsgericht%20M%C3%BCnchen%20HRB%20293622'
    },
    {
      icon: 'ri-briefcase-line',
      title: 'Geschäftszweck',
      description: 'Vermögensverwaltung',
      detail: 'Verwaltung eigenen Vermögens',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: 'ri-user-star-line',
      title: 'Inhabergeführt',
      description: 'Eigenständig',
      detail: 'Persönliche Betreuung',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: 'ri-shield-star-line',
      title: 'Compliance',
      description: 'Höchste Standards',
      detail: 'Transparenz & Governance',
      color: 'from-rose-500 to-rose-600'
    }
  ];

  return (
    <section id="trust-highlights" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="/images/hamburg-bg-001.jpg"
          alt="Finanzdistrikt"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-dark/90 to-primary/95"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6">
            <i className="ri-award-line text-accent-gold text-xl"></i>
            <span className="text-sm font-bold text-white uppercase tracking-wider">Vertrauen & Sicherheit</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Transparent, unabhängig, <span className="text-accent-gold">vertrauenswürdig</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Ihre Sicherheit steht an erster Stelle – transparent und nachvollziehbar
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => {
            const content = (
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-accent-gold/50 transition-all duration-300">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${highlight.color} rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <i className={`${highlight.icon} text-3xl text-white`}></i>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent-gold transition-colors duration-300">
                  {highlight.title}
                </h3>
                <p className="text-white/90 font-semibold mb-2">
                  {highlight.description}
                </p>
                <p className="text-sm text-white/70">
                  {highlight.detail}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="ri-arrow-right-up-line text-2xl text-accent-gold"></i>
                </div>
              </div>
            );

            return (
              <div
                key={index}
                className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {'link' in highlight && highlight.link ? (
                  <a href={highlight.link} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <div className="inline-flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-gold-light rounded-2xl flex items-center justify-center shadow-xl">
                <i className="ri-customer-service-line text-3xl text-white"></i>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/70 mb-1">Haben Sie Fragen?</p>
                <p className="text-xl font-bold text-white">Wir beraten Sie gerne</p>
              </div>
            </div>
            <Link
              to="/kontakt"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-gold-light rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-gold-light text-white text-base font-bold rounded-xl shadow-xl transform group-hover:scale-105 transition-all duration-300 whitespace-nowrap flex items-center space-x-2">
                <span>Kontakt aufnehmen</span>
                <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
