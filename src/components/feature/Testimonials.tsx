import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "J30 hat unsere Erwartungen übertroffen. Die professionelle Beratung und transparente Kommunikation schaffen Vertrauen. Unsere Kapitalanlagen sind in besten Händen.",
    author: "Dr. Michael Schneider",
    position: "CFO, TechVentures GmbH",
    rating: 5,
  },
  {
    quote: "Als institutioneller Anleger schätzen wir die regulatorische Konformität und das exzellente Risikomanagement von J30. Eine verlässliche Partnerschaft seit Jahren.",
    author: "Sandra Hoffmann",
    position: "Investment Director, Pension Fund AG",
    rating: 5,
  },
  {
    quote: "Die Kombination aus Flexibilität und Sicherheit bei den Anlageprodukten ist beeindruckend. J30 versteht die Bedürfnisse qualifizierter Anleger perfekt.",
    author: "Thomas Weber",
    position: "Geschäftsführer, Weber Capital Partners",
    rating: 5,
  },
  {
    quote: "Hervorragende Performance und transparente Berichterstattung. J30 setzt Maßstäbe in der Kapitalverwaltung. Absolute Empfehlung für institutionelle Investoren.",
    author: "Julia Richter",
    position: "Head of Treasury, Global Industries SE",
    rating: 5,
  },
  {
    quote: "Die Expertise des Teams und die maßgeschneiderten Anlagestrategien haben unsere Renditeerwartungen deutlich übertroffen. J30 ist unser bevorzugter Partner für komplexe Kapitalanlagen.",
    author: "Prof. Dr. Andreas Bauer",
    position: "Vorstandsvorsitzender, Innovation Capital AG",
    rating: 5,
  },
  {
    quote: "Seit über 8 Jahren vertrauen wir J30 unsere Pensionsfonds an. Die Stabilität, Sicherheit und kontinuierliche Wertentwicklung sprechen für sich. Ein erstklassiger Partner.",
    author: "Martina Schröder",
    position: "Leiterin Finanzen, Deutsche Versorgungswerk eV",
    rating: 5,
  },
  {
    quote: "Die digitale Plattform ermöglicht uns Echtzeit-Einblicke in unsere Portfolios. Kombiniert mit persönlicher Beratung ist dies die perfekte Balance zwischen Innovation und Tradition.",
    author: "Robert Klein",
    position: "CFO, MedTech Solutions GmbH",
    rating: 5,
  },
  {
    quote: "J30 hat uns durch volatile Marktphasen sicher navigiert. Das proaktive Risikomanagement und die schnelle Reaktionsfähigkeit des Teams sind außergewöhnlich.",
    author: "Dr. Elisabeth Wagner",
    position: "Geschäftsführerin, Family Office Wagner",
    rating: 5,
  },
  {
    quote: "Als internationaler Investor schätze ich die grenzüberschreitende Expertise von J30. Die Marktkenntnis und das Netzwerk in 8 Ländern sind unschätzbar wertvoll.",
    author: "Alexander Petrov",
    position: "CEO, Global Investment Partners Ltd.",
    rating: 5,
  },
  {
    quote: "Die ESG-konformen Anlagestrategien von J30 entsprechen perfekt unseren Nachhaltigkeitszielen. Rendite und Verantwortung in Einklang - das ist moderne Kapitalverwaltung.",
    author: "Sophie Bergmann",
    position: "Sustainability Officer, Green Future Foundation",
    rating: 5,
  },
  {
    quote: "Die Transparenz und Detailtiefe der Quartalsberichte sind beeindruckend. J30 setzt neue Standards in der Kommunikation mit institutionellen Anlegern.",
    author: "Marcus Lehmann",
    position: "Investment Manager, Pension Trust International",
    rating: 5,
  },
  {
    quote: "Nach intensiver Due Diligence haben wir uns für J30 entschieden - die beste Entscheidung für unser Stiftungsvermögen. Professionell, zuverlässig, erfolgreich.",
    author: "Dr. Claudia Zimmermann",
    position: "Vorstand, Kulturstiftung Deutschland",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-neutral-50 py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Vertrauen durch Qualität und Transparenz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 ${
                index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-8'
              }`}
            >
              <div className="mb-6">
                <i className="ri-double-quotes-l text-5xl text-accent-gold opacity-30"></i>
              </div>
              <p className="text-lg text-primary italic leading-relaxed mb-6">
                {testimonial.quote}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                <div>
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-neutral-600">{testimonial.position}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-accent-gold text-lg"></i>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
