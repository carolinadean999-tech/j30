import { useEffect, useState } from 'react';

export default function TeamHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/team-hero-001.jpg"
          alt="J30 Team"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-dark/90 to-primary/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
            <i className="ri-team-line text-accent-gold text-xl"></i>
            <span className="text-sm font-semibold text-white">Erfahrung trifft Expertise</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Unser <span className="text-accent-gold">Team</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Erfahrene Kapitalmarktexperten mit über 15 Jahren kombinierter Expertise in der professionellen Vermögensverwaltung
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <p className="text-4xl font-bold text-accent-gold mb-2">15+</p>
              <p className="text-sm text-white/80">Jahre Erfahrung</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <p className="text-4xl font-bold text-accent-gold mb-2">25+</p>
              <p className="text-sm text-white/80">Teammitglieder</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <p className="text-4xl font-bold text-accent-gold mb-2">8</p>
              <p className="text-sm text-white/80">Führungskräfte</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <p className="text-4xl font-bold text-accent-gold mb-2">100%</p>
              <p className="text-sm text-white/80">Engagement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
