import { useEffect, useState } from 'react';

export default function TeamGrid() {
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

    const element = document.getElementById('team-grid');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const team = [
    {
      name: 'Fabian Dippner',
      position: 'Geschäftsführer & CEO',
      experience: '20+ Jahre Kapitalmarkterfahrung',
      expertise: ['Strategische Führung', 'Regulatorik', 'Geschäftsentwicklung'],
      qualifications: 'Dr. rer. pol., CFA',
      image: '/images/ceo-001.jpg',
      icon: 'ri-user-star-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Sarah Weber',
      position: 'Chief Investment Officer',
      experience: '18+ Jahre Investment Management',
      expertise: ['Portfolio Management', 'Asset Allocation', 'Risikomanagement'],
      qualifications: 'MBA, CAIA',
      image: '/images/cio-001.jpg',
      icon: 'ri-line-chart-line',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      name: 'Max Baumgartner',
      position: 'Chief Risk Officer',
      experience: '16+ Jahre Risikomanagement',
      expertise: ['Risikokontrolle', 'Compliance', 'Interne Revision'],
      qualifications: 'Dipl.-Kfm., FRM',
      image: '/images/cro-001.jpg',
      icon: 'ri-shield-check-line',
      color: 'from-violet-500 to-violet-600'
    },
    {
      name: 'Dr. Anna Hoffmann',
      position: 'Head of Research',
      experience: '14+ Jahre Kapitalmarktanalyse',
      expertise: ['Marktforschung', 'Fundamentalanalyse', 'Makroökonomie'],
      qualifications: 'Dr. rer. oec., CFA',
      image: '/images/research-001.jpg',
      icon: 'ri-search-line',
      color: 'from-amber-500 to-amber-600'
    },
    {
      name: 'Stefan Wimmer',
      position: 'Head of Fixed Income',
      experience: '15+ Jahre Anleihenmanagement',
      expertise: ['Anleihenstrategien', 'Credit Analysis', 'Duration Management'],
      qualifications: 'M.Sc. Finance, CFA',
      image: '/images/fixedincome-001.jpg',
      icon: 'ri-stock-line',
      color: 'from-teal-500 to-teal-600'
    },
    {
      name: 'Julia Becker',
      position: 'Head of Equities',
      experience: '13+ Jahre Aktienmanagement',
      expertise: ['Equity Research', 'Stock Selection', 'Sector Analysis'],
      qualifications: 'MBA, CIIA',
      image: '/images/equities-001.jpg',
      icon: 'ri-bar-chart-line',
      color: 'from-rose-500 to-rose-600'
    },
    {
      name: 'Robert Fischer',
      position: 'Head of Client Relations',
      experience: '12+ Jahre Kundenbetreuung',
      expertise: ['Relationship Management', 'Beratung', 'Kundenbindung'],
      qualifications: 'Dipl.-Kfm., CFP',
      image: '/images/relations-001.jpg',
      icon: 'ri-customer-service-line',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      name: 'Lisa Zimmermann',
      position: 'Head of Operations',
      experience: '11+ Jahre Operations Management',
      expertise: ['Prozessoptimierung', 'IT-Systeme', 'Qualitätssicherung'],
      qualifications: 'M.Sc. BWL, PMP',
      image: '/images/operations-001.jpg',
      icon: 'ri-settings-line',
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <section id="team-grid" className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent-gold/10 rounded-full px-6 py-3 mb-6">
            <i className="ri-user-star-line text-primary text-xl"></i>
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Führungsteam</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
            Unsere <span className="gradient-text">Experten</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Erfahrene Führungskräfte mit nachgewiesener Expertise in allen Bereichen der Kapitalverwaltung
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-40 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-50"></div>
                    <div className="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-xl">
                      <i className={`${member.icon} text-2xl text-primary`}></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-accent-gold mb-3">
                  {member.position}
                </p>
                <p className="text-sm text-neutral-600 mb-4 flex items-center space-x-2">
                  <i className="ri-time-line text-primary"></i>
                  <span>{member.experience}</span>
                </p>

                {/* Qualifications */}
                <div className="bg-gradient-to-r from-primary/5 to-accent-gold/5 rounded-xl p-3 mb-4">
                  <p className="text-xs text-neutral-700 font-semibold">{member.qualifications}</p>
                </div>

                {/* Expertise */}
                <div className="space-y-2">
                  {member.expertise.map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
                      <span className="text-xs text-neutral-600">{skill}</span>
                    </div>
                  ))}
                </div>
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
