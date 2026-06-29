import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d5846ru9uelhi9993fu0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-card p-8 md:p-10 border border-neutral-100">
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                Kontaktformular
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen. Alle Felder sind erforderlich.
              </p>
            </div>

            <form onSubmit={handleSubmit} data-readdy-form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Ihr vollständiger Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="+49 (0) 123 456789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Unternehmen / Organisation *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Ihr Unternehmen"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Betreff *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                >
                  <option value="">Bitte wählen Sie ein Thema</option>
                  <option value="Festgeld">Festgeld</option>
                  <option value="Flexgeld">Flexgeld</option>
                  <option value="Tagesgeld">Tagesgeld</option>
                  <option value="Aktien">Aktien</option>
                  <option value="Anleihen">Anleihen</option>
                  <option value="Allgemeine Beratung">Allgemeine Beratung</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none text-sm"
                  placeholder="Beschreiben Sie Ihr Anliegen (max. 500 Zeichen)"
                />
                <div className="text-xs text-neutral-500 mt-2 text-right">
                  {formData.message.length}/500 Zeichen
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-4 text-xs text-neutral-600">
                <p className="mb-2">
                  <i className="ri-information-line text-primary mr-1"></i>
                  Mit dem Absenden dieses Formulars stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer Datenschutzerklärung zu.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-gold-light text-white text-base font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <i className="ri-loader-4-line animate-spin"></i>
                    <span>Wird gesendet...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Nachricht senden</span>
                    <i className="ri-send-plane-line"></i>
                  </span>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800 text-sm">
                  <i className="ri-check-line mr-2"></i>
                  Vielen Dank für Ihre Nachricht! Wir melden uns zeitnah bei Ihnen.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800 text-sm">
                  <i className="ri-error-warning-line mr-2"></i>
                  Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-heading font-bold mb-6">Direkter Kontakt</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-xl text-accent-gold"></i>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Adresse</div>
                    <div className="text-white/80 text-sm">
                      Grünwalder Weg 28d<br />
                      82041 Oberhaching<br />
                      Deutschland
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-xl text-accent-gold"></i>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Telefon</div>
                    <div className="text-white/80 text-sm">+49 (0) 30 22955248</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-xl text-accent-gold"></i>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold mb-1">E-Mail</div>
                    <div className="text-white/80 text-sm break-all">kontakt@j30vermogensverwaltung.com</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-xl text-accent-gold"></i>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Öffnungszeiten</div>
                    <div className="text-white/80 text-sm">
                      Mo - Fr: 09:00 - 18:00 Uhr<br />
                      Sa - So: Geschlossen
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-8 border border-neutral-100">
              <h3 className="text-xl font-heading font-bold text-primary mb-4">
                Schnelle Antworten
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                Für allgemeine Fragen können Sie auch unsere FAQ-Sektion besuchen oder uns direkt anrufen. Wir sind gerne für Sie da.
              </p>
              <div className="flex items-center space-x-4">
                <a href="tel:+493022955248" className="flex-1 px-4 py-3 bg-primary/5 text-primary text-sm font-semibold rounded-lg hover:bg-primary/10 transition-colors duration-200 text-center whitespace-nowrap">
                  <i className="ri-phone-line mr-2"></i>
                  Anrufen
                </a>
                <a href="mailto:kontakt@j30vermogensverwaltung.com" className="flex-1 px-4 py-3 bg-primary/5 text-primary text-sm font-semibold rounded-lg hover:bg-primary/10 transition-colors duration-200 text-center whitespace-nowrap">
                  <i className="ri-mail-line mr-2"></i>
                  E-Mail
                </a>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <i className="ri-information-line text-2xl text-amber-600 flex-shrink-0 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Wichtiger Hinweis</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Bitte beachten Sie, dass wir ausschließlich institutionelle und qualifizierte Anleger betreuen. Für eine Beratung ist eine Terminvereinbarung erforderlich.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}