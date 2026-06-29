import AboutHero from './components/AboutHero';
import AboutContent from './components/AboutContent';
import Timeline from './components/Timeline';
import Testimonials from '../../components/feature/Testimonials';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main>
        <AboutHero />
        <AboutContent />
        <Timeline />
        <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Mission & Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div className="bg-white rounded-2xl p-10 shadow-card border border-neutral-100">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-compass-3-line text-3xl text-accent-gold"></i>
                </div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Unsere Mission</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Wir schaffen nachhaltige Werte für unsere Mandanten durch professionelle Kapitalverwaltung nach höchsten institutionellen Standards. Unser Fokus liegt auf Transparenz, Risikomanagement und langfristigem Erfolg.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Als unabhängige Vermögensverwaltung verbinden wir fundierte Expertise mit innovativen Anlagestrategien und persönlicher Betreuung.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-10 shadow-card border border-neutral-100">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-gold-light rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-eye-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Unsere Vision</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Wir streben danach, eine führende Vermögensverwaltung für institutionelle und qualifizierte Anleger in Süddeutschland zu werden. Durch kontinuierliche Innovation und höchste Servicequalität setzen wir neue Maßstäbe.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Unser Ziel ist es, langfristige Partnerschaften aufzubauen, die auf Vertrauen, Expertise und messbarem Erfolg basieren.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Unsere Werte</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Diese Prinzipien leiten unser tägliches Handeln und prägen unsere Unternehmenskultur
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: 'ri-shield-check-line',
                  title: 'Integrität',
                  description: 'Höchste ethische Standards und vollständige Transparenz in allen Geschäftsbeziehungen'
                },
                {
                  icon: 'ri-user-heart-line',
                  title: 'Mandantenfokus',
                  description: 'Ihre Ziele und Ihr Erfolg stehen im Mittelpunkt unseres Handelns'
                },
                {
                  icon: 'ri-lightbulb-line',
                  title: 'Innovation',
                  description: 'Kontinuierliche Weiterentwicklung unserer Strategien und Prozesse'
                },
                {
                  icon: 'ri-team-line',
                  title: 'Expertise',
                  description: 'Tiefes Fachwissen und langjährige Kapitalmarkterfahrung'
                }
              ].map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-neutral-100 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <i className={`${value.icon} text-2xl text-accent-gold`}></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">{value.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulatory Excellence */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Regulatorische Exzellenz</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Vollständige Konformität mit allen gesetzlichen Anforderungen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className="ri-government-line text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary">Rechtsform</h3>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Gesellschaft mit beschränkter Haftung (GmbH) mit Sitz in Oberhaching. Eingetragen im Handelsregister des Amtsgerichts München.
                </p>
                <div className="flex items-center space-x-2 text-accent-gold font-semibold">
                  <i className="ri-check-line"></i>
                  <span className="text-sm">HRB 293622</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-check-line text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary">Handelsregister</h3>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Eingetragen im Handelsregister des Amtsgerichts München unter HRB 293622. Transparente Unternehmensstruktur und klare Governance.
                </p>
                <div className="flex items-center space-x-2 text-accent-gold font-semibold">
                  <i className="ri-check-line"></i>
                  <span className="text-sm">Öffentlich einsehbar</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className="ri-file-shield-line text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary">Governance</h3>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Professionelle Governance-Strukturen mit klaren Verantwortlichkeiten, umfassendem Risikomanagement und transparenter Berichterstattung.
                </p>
                <div className="flex items-center space-x-2 text-accent-gold font-semibold">
                  <i className="ri-check-line"></i>
                  <span className="text-sm">Höchste Standards</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>
    </div>
  );
}