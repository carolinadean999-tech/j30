import { useEffect, useState } from 'react';

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/about-hero-001.jpg"
          alt="J30 Oberhaching"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-dark/90 to-primary/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
            <i className="ri-building-line text-accent-gold text-xl"></i>
            <span className="text-sm font-semibold text-white">Seit über 15 Jahren in Oberhaching</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Über <span className="text-accent-gold">J30</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Unabhängige Vermögensverwaltung mit Fokus auf professionelle Anlagelösungen für institutionelle und qualifizierte Anleger
          </p>

          {/* Key Facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-3xl text-accent-gold"></i>
              </div>
              <p className="text-sm text-white/70 mb-2">Standort</p>
              <p className="text-xl font-bold text-white">Oberhaching</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-3xl text-accent-gold"></i>
              </div>
              <p className="text-sm text-white/70 mb-2">Register</p>
              <p className="text-xl font-bold text-white">HRB 293622</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-funds-line text-3xl text-accent-gold"></i>
              </div>
              <p className="text-sm text-white/70 mb-2">Fokus</p>
              <p className="text-xl font-bold text-white">Vermögensverwaltung</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
