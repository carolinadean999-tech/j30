import { motion } from 'framer-motion';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: 'ri-map-pin-line',
      title: 'Adresse',
      content: ['Grünwalder Weg 28d', '82041 Oberhaching', 'Deutschland']
    },
    {
      icon: 'ri-phone-line',
      title: 'Telefon',
      content: ['+49 (0) 30 22955248']
    },
    {
      icon: 'ri-mail-line',
      title: 'E-Mail',
      content: ['kontakt@j30-vermogensverwaltung.com']
    },
    {
      icon: 'ri-time-line',
      title: 'Geschäftszeiten',
      content: ['Montag – Freitag', '09:00 – 17:00 Uhr']
    }
  ];

  const legalInfo = [
    { label: 'Rechtsform', value: 'GmbH' },
    { label: 'Handelsregister', value: 'HRB 293622', link: 'https://www.northdata.de/J30%20Verm%C3%B6gensverwaltung%20GmbH,%20Oberhaching/Amtsgericht%20M%C3%BCnchen%20HRB%20293622' },
    { label: 'Registergericht', value: 'Amtsgericht München' },
    { label: 'Sitz', value: '82041 Oberhaching' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-heading font-bold text-primary mb-6">
          Kontaktinformationen
        </h2>
        <p className="text-neutral-600 mb-8">
          Erreichen Sie uns über folgende Kanäle. Wir freuen uns auf Ihre Kontaktaufnahme.
        </p>

        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-accent-gold/10 rounded-lg flex-shrink-0">
                <i className={`${detail.icon} text-xl text-accent-gold`}></i>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-heading font-bold text-primary mb-1">
                  {detail.title}
                </h3>
                {detail.content.map((line, idx) => (
                  <p key={idx} className="text-neutral-600 break-all">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-neutral-50 rounded-lg p-6">
        <h3 className="text-xl font-heading font-bold text-primary mb-4">
          Rechtliche Angaben
        </h3>
        <div className="space-y-3">
          {legalInfo.map((info, index) => (
            <div key={index} className="flex items-start justify-between border-b border-neutral-200 pb-2 last:border-0">
              <span className="text-sm font-semibold text-neutral-600">
                {info.label}
              </span>
              {'link' in info && info.link ? (
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-gold font-medium text-right hover:underline"
                >
                  {info.value}
                </a>
              ) : (
                <span className="text-sm text-primary font-medium text-right">
                  {info.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <i className="ri-information-line text-xl text-primary"></i>
          </div>
          <div>
            <h4 className="text-lg font-heading font-bold text-primary mb-2">
              Wichtiger Hinweis
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Die J30 Vermögensverwaltung GmbH ist im Handelsregister des Amtsgerichts München unter HRB 293622 eingetragen (Sitz: Oberhaching). Alle Angaben ohne Gewähr.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-6 text-white">
        <h4 className="text-xl font-heading font-bold mb-3">
          Persönliche Beratung gewünscht?
        </h4>
        <p className="text-neutral-200 mb-4 leading-relaxed">
          Vereinbaren Sie einen Termin mit unseren Experten für eine individuelle Beratung zu Ihren Anlagezielen.
        </p>
        <a
          href="tel:+493022955248"
          className="inline-flex items-center space-x-2 text-accent-gold font-semibold hover:text-accent-gold/80 transition-colors duration-300 cursor-pointer"
        >
          <i className="ri-phone-line text-xl"></i>
          <span>+49 (0) 30 22955248</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ContactInfo;