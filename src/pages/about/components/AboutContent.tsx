import { useEffect, useState } from 'react';

export default function AboutContent() {
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

    const element = document.getElementById('about-content');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: 'ri-shield-check-line',
      title: 'Regulatorische Exzellenz',
      description: 'Transparente Unternehmensstruktur mit klaren Governance- und Compliance-Prozessen',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'ri-eye-line',
      title: 'Transparenz',
      description: 'Klare Kommunikation und vollständige Offenlegung aller Anlageentscheidungen',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Kundenorientierung',
      description: 'Individuelle Lösungen basierend auf Ihren spezifischen Anlagezielen',
      color: 'from-violet-500 to-violet-600'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Performance',
      description: 'Langfristige Wertschöpfung durch bewährte Anlagestrategien',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  const expertise = [
    {
      title: 'Governance & Compliance',
      description: 'Strenge Governance-Strukturen und umfassende Compliance-Prozesse gewährleisten höchste Standards in allen Geschäftsbereichen.',
      icon: 'ri-shield-star-line',
      image: '/images/governance-001.jpg'
    },
    {
      title: 'Risikomanagement',
      description: 'Systematische Identifikation, Bewertung und Steuerung von Risiken durch modernste Risikomanagement-Systeme und erfahrene Spezialisten.',
      icon: 'ri-shield-line',
      image: '/images/risk-001.jpg'
    },
    {
      title: 'Kapitalmarktexpertise',
      description: 'Tiefgreifende Kenntnisse internationaler Kapitalmärkte und langjährige Erfahrung in der professionellen Vermögensverwaltung.',
      icon: 'ri-global-line',
      image: '/images/expertise-001.jpg'
    }
  ];

  return (
    <section id="about-content" className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Company Introduction */}
        <div className={`mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent-gold/10 rounded-full px-6 py-3 mb-6">
                <i className="ri-building-4-line text-primary text-xl"></i>
                <span className="text-sm font-bold text-primary uppercase tracking-wider">Unser Unternehmen</span>
              </div>
              <h2 className="text-4xl font-heading font-bold text-neutral-900 mb-6">
                J30 Vermögensverwaltung
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Mit Sitz in Oberhaching sind wir eine im Handelsregister des Amtsgerichts München (HRB 293622) eingetragene Vermögensverwaltung, die sich auf die professionelle Verwaltung von Vermögen spezialisiert hat.
                </p>
                <p>
                  Unser Fokus liegt auf der Bereitstellung maßgeschneiderter Anlagelösungen für institutionelle und qualifizierte Anleger. Dabei verbinden wir regulatorische Exzellenz mit innovativen Anlagestrategien.
                </p>
                <p>
                  Durch strikte Governance-Strukturen, umfassendes Risikomanagement und transparente Prozesse schaffen wir die Grundlage für langfristigen Anlageerfolg.
                </p>
              </div>

              {/* Key Facts */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <a
                  href="https://www.northdata.de/J30%20Verm%C3%B6gensverwaltung%20GmbH,%20Oberhaching/Amtsgericht%20M%C3%BCnchen%20HRB%20293622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent-gold/10 rounded-xl flex items-center justify-center">
                      <i className="ri-building-line text-2xl text-primary"></i>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 font-medium">Handelsregister</p>
                      <p className="text-lg font-bold text-neutral-900">HRB 293622</p>
                    </div>
                  </div>
                </a>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent-gold/10 rounded-xl flex items-center justify-center">
                      <i className="ri-scales-3-line text-2xl text-primary"></i>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 font-medium">Registergericht</p>
                      <p className="text-sm font-bold text-neutral-900">Amtsgericht München</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent-gold rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/office-001.jpg"
                  alt="J30 Büro Oberhaching"
                  className="w-full h-[600px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className={`mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-neutral-900 mb-4">
              Unsere <span className="gradient-text">Werte</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Die Grundpfeiler unserer Unternehmensphilosophie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <i className={`${value.icon} text-3xl text-white`}></i>
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Areas */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-neutral-900 mb-4">
              Unsere <span className="gradient-text">Kernkompetenzen</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Expertise, die Vertrauen schafft
            </p>
          </div>

          <div className="space-y-12">
            {expertise.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent-gold rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-80 object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent-gold rounded-2xl blur-lg opacity-20"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent-gold rounded-2xl flex items-center justify-center shadow-lg">
                      <i className={`${item.icon} text-3xl text-white`}></i>
                    </div>
                  </div>

                  <h3 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
