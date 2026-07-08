import { motion } from 'framer-motion';

interface Risk {
  title: string;
  description: string;
  icon?: string;
  level?: string;
}

interface ServiceRisksProps {
  risks: Risk[];
}

const ServiceRisks = ({ risks }: ServiceRisksProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Risiko- & Transparenzhinweise
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Vollständige Aufklärung über mögliche Risiken gemäß regulatorischer Anforderungen
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-8 mb-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <i className="ri-alert-line text-2xl text-amber-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-amber-900 mb-2">
                  Wichtiger Risikohinweis
                </h3>
                <p className="text-amber-800 leading-relaxed">
                  Jede Kapitalanlage ist mit Risiken verbunden. Die nachfolgenden Informationen dienen der vollständigen Transparenz. Bitte lesen Sie diese sorgfältig durch.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {risks.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-lg p-6 border border-neutral-200"
              >
                <h4 className="text-xl font-heading font-bold text-primary mb-3 flex items-center space-x-3">
                  <i className="ri-error-warning-line text-accent-gold"></i>
                  <span>{risk.title}</span>
                </h4>
                <p className="text-neutral-700 leading-relaxed">
                  {risk.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 bg-primary/5 rounded-lg p-6 border border-primary/10"
          >
            <p className="text-sm text-neutral-600 leading-relaxed">
              <strong className="text-primary">Rechtlicher Hinweis:</strong> Diese Informationen stellen keine Anlageberatung dar. Vor jeder Anlageentscheidung sollte eine individuelle Beratung durch qualifizierte Fachberater erfolgen. Vergangene Wertentwicklungen sind kein verlässlicher Indikator für zukünftige Ergebnisse.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceRisks;