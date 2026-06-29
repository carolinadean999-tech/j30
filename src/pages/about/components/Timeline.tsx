export default function Timeline() {
  const milestones = [
    {
      year: '2010',
      title: 'Gründung in Oberhaching',
      description: 'Gründung der J30 Vermögensverwaltung mit Fokus auf institutionelle Kapitalverwaltung. Handelsregister: HRB 293622.',
      icon: 'ri-building-line'
    },
    {
      year: '2011',
      title: 'Aufbau des Portfoliomanagements',
      description: 'Etablierung professioneller Anlage- und Risikomanagement-Prozesse für die Vermögensverwaltung institutioneller und privater Mandate.',
      icon: 'ri-shield-check-line'
    },
    {
      year: '2013',
      title: 'Erweiterung Produktpalette',
      description: 'Einführung umfassender Anlagelösungen: Festgeld, Flexgeld und Tagesgeld für institutionelle Anleger. Aufbau professioneller Risikomanagement-Strukturen.',
      icon: 'ri-briefcase-line'
    },
    {
      year: '2015',
      title: 'Equity & Fixed Income',
      description: 'Expansion in Aktien- und Anleihenmanagement. Aufbau internationaler Marktexpertise und Etablierung systematischer Anlagestrategien.',
      icon: 'ri-line-chart-line'
    },
    {
      year: '2018',
      title: 'Digitalisierung & Innovation',
      description: 'Implementierung moderner Technologieplattformen für Portfolio-Management und Reporting. Einführung digitaler Mandantenkommunikation.',
      icon: 'ri-computer-line'
    },
    {
      year: '2020',
      title: 'Governance-Excellence',
      description: 'Weiterentwicklung der Governance-Strukturen und Compliance-Prozesse. Zertifizierung nach höchsten institutionellen Standards.',
      icon: 'ri-award-line'
    },
    {
      year: '2022',
      title: 'Nachhaltigkeit & ESG',
      description: 'Integration von ESG-Kriterien in alle Anlagestrategien. Entwicklung nachhaltiger Investmentlösungen für zukunftsorientierte Mandanten.',
      icon: 'ri-leaf-line'
    },
    {
      year: '2024',
      title: 'Kontinuierliches Wachstum',
      description: 'Weiterer Ausbau des verwalteten Vermögens und der Mandantenbasis. Fokus auf Innovation, Qualität und langfristige Partnerschaften.',
      icon: 'ri-rocket-line'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/5 rounded-full mb-6">
            <i className="ri-time-line text-primary"></i>
            <span className="text-sm text-primary font-semibold">Unsere Geschichte</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Entwicklung & Meilensteine
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Von der Gründung bis heute – eine Erfolgsgeschichte geprägt von Qualität, Innovation und Vertrauen
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent-gold to-primary"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-neutral-100">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                        <i className={`${milestone.icon} text-xl text-accent-gold`}></i>
                      </div>
                      <div className="text-3xl font-heading font-bold text-accent-gold">{milestone.year}</div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-primary mb-3">{milestone.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-gold rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Spacer */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}