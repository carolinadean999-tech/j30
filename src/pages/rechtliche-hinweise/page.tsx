export default function RechtlicheHinweisePage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Rechtliche Hinweise
            </h1>
            <p className="text-xl text-white/80">
              Wichtige Informationen für Anleger
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 space-y-8">
              {/* Risk Warning */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <i className="ri-alert-line text-2xl text-amber-600 flex-shrink-0 mt-1"></i>
                  <div>
                    <h3 className="font-semibold text-lg text-amber-900 mb-2">Risikohinweis</h3>
                    <p className="text-amber-800">
                      Kapitalanlagen sind mit Risiken verbunden. Der Wert von Anlagen kann sowohl steigen als auch fallen. Es besteht das Risiko, dass Anleger ihr eingesetztes Kapital ganz oder teilweise verlieren. Die Wertentwicklung in der Vergangenheit ist kein verlässlicher Indikator für zukünftige Ergebnisse.
                    </p>
                  </div>
                </div>
              </div>

              {/* General Information */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Allgemeine Hinweise</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Die auf dieser Website bereitgestellten Informationen dienen ausschließlich Informationszwecken und stellen weder eine Anlageberatung noch eine Empfehlung zum Kauf oder Verkauf von Finanzinstrumenten dar. Sie ersetzen nicht die individuelle Beratung durch einen qualifizierten Anlageberater.</p>
                  <p>Die J30 Vermögensverwaltung GmbH ist im Handelsregister des Amtsgerichts München unter HRB 293622 eingetragen (Sitz: Oberhaching).</p>
                </div>
              </div>

              {/* Target Group */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Zielgruppe</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Die auf dieser Website dargestellten Anlagemöglichkeiten richten sich ausschließlich an:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Professionelle Anleger im Sinne des § 1 Abs. 19 Nr. 32 KAGB</li>
                    <li>Semiprofessionelle Anleger im Sinne des § 1 Abs. 19 Nr. 33 KAGB</li>
                    <li>Institutionelle Investoren</li>
                    <li>Qualifizierte Anleger gemäß den gesetzlichen Bestimmungen</li>
                  </ul>
                  <p className="mt-4">Die Informationen sind nicht für Privatanleger bestimmt und dürfen nicht an diese weitergegeben werden.</p>
                </div>
              </div>

              {/* Investment Risks */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Anlagerisiken</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Jede Kapitalanlage ist mit Risiken verbunden. Zu den wesentlichen Risiken gehören unter anderem:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><span className="font-semibold">Marktrisiko:</span> Wertschwankungen aufgrund von Marktbewegungen</li>
                    <li><span className="font-semibold">Kreditrisiko:</span> Ausfall von Schuldnern oder Emittenten</li>
                    <li><span className="font-semibold">Liquiditätsrisiko:</span> Eingeschränkte Handelbarkeit von Anlagen</li>
                    <li><span className="font-semibold">Währungsrisiko:</span> Wechselkursschwankungen bei Fremdwährungsanlagen</li>
                    <li><span className="font-semibold">Zinsänderungsrisiko:</span> Auswirkungen von Zinsänderungen auf den Wert</li>
                    <li><span className="font-semibold">Konzentrationsrisiko:</span> Abhängigkeit von einzelnen Anlagen oder Märkten</li>
                  </ul>
                  <p className="mt-4">Eine detaillierte Darstellung der Risiken finden Sie in den jeweiligen Anlagebedingungen und Verkaufsprospekten.</p>
                </div>
              </div>

              {/* No Guarantee */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Keine Garantie oder Gewährleistung</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Die J30 Vermögensverwaltung übernimmt keine Garantie oder Gewährleistung für:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen</li>
                    <li>Die Erreichung bestimmter Anlageziele oder Renditen</li>
                    <li>Den Erhalt des eingesetzten Kapitals</li>
                    <li>Die steuerliche Behandlung von Anlagen</li>
                  </ul>
                </div>
              </div>

              {/* Past Performance */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Wertentwicklung</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Angaben zur Wertentwicklung beziehen sich auf die Vergangenheit. Die frühere Wertentwicklung ist kein verlässlicher Indikator für künftige Ergebnisse. Der Wert von Anlagen und die daraus erzielten Erträge können sowohl steigen als auch fallen.</p>
                  <p>Simulierte oder prognostizierte Wertentwicklungen basieren auf Annahmen und Schätzungen, die sich als unzutreffend erweisen können. Sie sind kein verlässlicher Indikator für die tatsächliche zukünftige Wertentwicklung.</p>
                </div>
              </div>

              {/* Tax Information */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Steuerliche Behandlung</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Die steuerliche Behandlung von Kapitalanlagen hängt von den individuellen Verhältnissen des jeweiligen Anlegers ab und kann künftigen Änderungen unterworfen sein. Die auf dieser Website enthaltenen Informationen stellen keine Steuerberatung dar.</p>
                  <p>Anleger sollten sich vor einer Anlageentscheidung von einem qualifizierten Steuerberater über die steuerlichen Auswirkungen beraten lassen.</p>
                </div>
              </div>

              {/* Regulatory Information */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Unternehmensangaben</h2>
                <div className="space-y-4 text-neutral-700">
                  <p><span className="font-semibold">Rechtsform:</span> Gesellschaft mit beschränkter Haftung (GmbH)</p>
                  <p><span className="font-semibold">Registergericht:</span> Amtsgericht München</p>
                  <p><span className="font-semibold">Handelsregisternummer:</span> <a href="https://www.northdata.de/J30%20Verm%C3%B6gensverwaltung%20GmbH,%20Oberhaching/Amtsgericht%20M%C3%BCnchen%20HRB%20293622" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">HRB 293622</a></p>
                  <p><span className="font-semibold">Sitz:</span> 82041 Oberhaching</p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Wesentliche Anlegerinformationen</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Vor einer Anlageentscheidung sollten Anleger die folgenden Dokumente sorgfältig lesen:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Verkaufsprospekt</li>
                    <li>Anlagebedingungen</li>
                    <li>Wesentliche Anlegerinformationen (Key Investor Information Document - KIID)</li>
                    <li>Jahres- und Halbjahresberichte</li>
                  </ul>
                  <p className="mt-4">Diese Dokumente sind kostenlos bei der J30 Vermögensverwaltung erhältlich und können auf Anfrage zugesandt werden.</p>
                </div>
              </div>

              {/* Complaints */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Beschwerdemanagement</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Sollten Sie Anlass zu einer Beschwerde haben, können Sie sich jederzeit an uns wenden:</p>
                  <p className="mt-2">
                    <span className="font-semibold">E-Mail:</span> kontakt@j30-vermogensverwaltung.com<br />
                    <span className="font-semibold">Telefon:</span> +49 (0) 30 22955248<br />
                    <span className="font-semibold">Schriftlich:</span> J30 Vermögensverwaltung, Grünwalder Weg 28d, 82041 Oberhaching
                  </p>
                  <p className="mt-4">Wir werden Ihre Beschwerde umgehend prüfen und uns bemühen, diese innerhalb angemessener Frist zu beantworten.</p>
                </div>
              </div>

              {/* Copyright */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Urheberrecht und Nutzungsrechte</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>Alle auf dieser Website veröffentlichten Inhalte (Texte, Bilder, Grafiken, Logos, etc.) sind urheberrechtlich geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung der J30 Vermögensverwaltung.</p>
                </div>
              </div>

              {/* Contact Box */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-semibold text-lg text-primary mb-3">Fragen zu rechtlichen Hinweisen?</h3>
                <p className="text-neutral-700 mb-4">Bei Fragen zu den rechtlichen Hinweisen oder für weitere Informationen kontaktieren Sie uns bitte:</p>
                <div className="space-y-2 text-neutral-700">
                  <p><span className="font-semibold">E-Mail:</span> kontakt@j30-vermogensverwaltung.com</p>
                  <p><span className="font-semibold">Telefon:</span> +49 (0) 30 22955248</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}