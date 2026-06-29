export default function ImpressumPage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Impressum
            </h1>
            <p className="text-xl text-white/80">
              Rechtliche Angaben gemäß §5 TMG
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 space-y-8">
              {/* Company Info */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Angaben gemäß § 5 TMG</h2>
                <div className="space-y-2 text-neutral-700">
                  <p className="font-semibold text-lg">J30 Vermögensverwaltung</p>
                  <p>Grünwalder Weg 28d</p>
                  <p>82041 Oberhaching</p>
                  <p>Deutschland</p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Kontakt</h2>
                <div className="space-y-2 text-neutral-700">
                  <p><span className="font-semibold">Telefon:</span> +49 (0) 30 22955248</p>
                  <p><span className="font-semibold">E-Mail:</span> kontakt@j30vermogensverwaltung.com</p>
                </div>
              </div>

              {/* Registration */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Registereintrag</h2>
                <div className="space-y-2 text-neutral-700">
                  <p><span className="font-semibold">Registergericht:</span> Amtsgericht München</p>
                  <p><span className="font-semibold">Handelsregisternummer:</span> <a href="https://www.northdata.de/J30%20Verm%C3%B6gensverwaltung%20GmbH,%20Oberhaching/Amtsgericht%20M%C3%BCnchen%20HRB%20293622" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">HRB 293622</a></p>
                </div>
              </div>

              {/* Management */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Vertretungsberechtigte Geschäftsführer</h2>
                <div className="space-y-2 text-neutral-700">
                  <p>Fabian Dippner</p>
                  <p>Felix Dippner</p>
                </div>
              </div>

              {/* VAT */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Umsatzsteuer-ID</h2>
                <div className="space-y-2 text-neutral-700">
                  <p><span className="font-semibold">Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</span></p>
                  <p>DE123456789</p>
                </div>
              </div>

              {/* Responsible */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <div className="space-y-2 text-neutral-700">
                  <p>Fabian Dippner</p>
                  <p>Grünwalder Weg 28d</p>
                  <p>82041 Oberhaching</p>
                </div>
              </div>

              {/* Dispute Resolution */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Streitschlichtung</h2>
                <div className="space-y-2 text-neutral-700">
                  <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">https://ec.europa.eu/consumers/odr</a></p>
                  <p className="mt-4">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                </div>
              </div>

              {/* Liability */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Haftungsausschluss</h2>
                <div className="space-y-4 text-neutral-700">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Haftung für Inhalte</h3>
                    <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Haftung für Links</h3>
                    <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Urheberrecht</h3>
                    <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}