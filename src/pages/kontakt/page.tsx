import { motion } from "framer-motion";
import { useState } from "react";

const KontaktPage = () => {
  const [formData, setFormData] = useState({
    anrede: "",
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    unternehmen: "",
    betreff: "",
    nachricht: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch(
        "https://readdy.ai/api/form/d584en93kamldd155u6g",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        },
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          anrede: "",
          vorname: "",
          nachname: "",
          email: "",
          telefon: "",
          unternehmen: "",
          betreff: "",
          nachricht: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactMethods = [
    {
      icon: "ri-phone-line",
      title: "Telefon",
      content: "+49 (0) 30 22955248",
      description: "Mo-Fr: 9:00 - 18:00 Uhr",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: "ri-mail-line",
      title: "E-Mail",
      content: "kontakt@j30-vermogensverwaltung.com",
      description: "Antwort innerhalb von 24h",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: "ri-map-pin-line",
      title: "Adresse",
      content: "Grünwalder Weg 28d",
      description: "82041 Oberhaching, Deutschland",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      icon: "ri-time-line",
      title: "Öffnungszeiten",
      content: "Mo-Fr: 9:00 - 18:00",
      description: "Sa-So: Geschlossen",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const mainOffice = {
    city: "Oberhaching",
    type: "Hauptsitz",
    address: "Grünwalder Weg 28d, 82041 Oberhaching",
    phone: "+49 (0) 30 22955248",
    email: "kontakt@j30-vermogensverwaltung.com",
    image: "/images/office1.jpg",
    features: [
      { icon: "ri-building-4-line", text: "Modernes Bürogebäude" },
      { icon: "ri-parking-line", text: "Tiefgarage vorhanden" },
      { icon: "ri-subway-line", text: "S-Bahn Oberhaching (S3)" },
      { icon: "ri-wheelchair-line", text: "Barrierefrei zugänglich" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0">
            <img
              src="/images/contacthero.jpg"
              alt="Kontakt Hero"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/95"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-accent-gold/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-accent-gold/30">
                <i className="ri-customer-service-2-line text-accent-gold text-xl"></i>
                <span className="text-accent-gold font-semibold text-sm">
                  Wir sind für Sie da
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                Kontaktieren Sie uns
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                Ihr direkter Draht zu professioneller Kapitalverwaltung. Unser
                Expertenteam steht Ihnen für alle Fragen zur Verfügung.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                  <i className="ri-time-line text-accent-gold text-2xl"></i>
                  <div className="text-left">
                    <p className="text-xs text-white/70">Antwortzeit</p>
                    <p className="text-sm font-bold text-white">
                      Innerhalb 24h
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                  <i className="ri-shield-check-line text-accent-gold text-2xl"></i>
                  <div className="text-left">
                    <p className="text-xs text-white/70">Datenschutz</p>
                    <p className="text-sm font-bold text-white">
                      DSGVO-konform
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                  <i className="ri-customer-service-line text-accent-gold text-2xl"></i>
                  <div className="text-left">
                    <p className="text-xs text-white/70">Verfügbarkeit</p>
                    <p className="text-sm font-bold text-white">
                      Mo-Fr 9-18 Uhr
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100 hover:border-accent-gold/30"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                  ></div>

                  <div className="relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                    >
                      <i className={`${method.icon} text-3xl text-white`}></i>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-primary mb-3">
                      {method.title}
                    </h3>
                    <p className="text-base font-semibold text-neutral-800 mb-2 break-all">
                      {method.content}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {method.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-neutral-50 to-white rounded-3xl p-8 lg:p-10 shadow-xl border border-neutral-100">
                  <div className="mb-8">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                      Senden Sie uns eine Nachricht
                    </h2>
                    <p className="text-neutral-600 leading-relaxed">
                      Füllen Sie das Formular aus und wir melden uns innerhalb
                      von 24 Stunden bei Ihnen.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    data-readdy-form
                    id="contact-form"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Anrede *
                        </label>
                        <select
                          name="anrede"
                          value={formData.anrede}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 text-sm cursor-pointer"
                        >
                          <option value="">Bitte wählen</option>
                          <option value="Herr">Herr</option>
                          <option value="Frau">Frau</option>
                          <option value="Divers">Divers</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Vorname *
                        </label>
                        <input
                          type="text"
                          name="vorname"
                          value={formData.vorname}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 text-sm"
                          placeholder="Ihr Vorname"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Nachname *
                        </label>
                        <input
                          type="text"
                          name="nachname"
                          value={formData.nachname}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 text-sm"
                          placeholder="Ihr Nachname"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          E-Mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 text-sm"
                          placeholder="ihre.email@beispiel.de"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          name="telefon"
                          value={formData.telefon}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 text-sm"
                          placeholder="+49 123 456789"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Unternehmen
                        </label>
                        <input
                          type="text"
                          name="unternehmen"
                          value={formData.unternehmen}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 text-sm"
                          placeholder="Ihr Unternehmen"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Betreff *
                      </label>
                      <input
                        type="text"
                        name="betreff"
                        value={formData.betreff}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 text-sm"
                        placeholder="Worum geht es?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Nachricht *
                      </label>
                      <textarea
                        name="nachricht"
                        value={formData.nachricht}
                        onChange={handleChange}
                        required
                        maxLength={500}
                        rows={6}
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 resize-none text-sm"
                        placeholder="Ihre Nachricht an uns..."
                      ></textarea>
                      <p className="text-xs text-neutral-500 mt-2">
                        Maximal 500 Zeichen ({formData.nachricht.length}/500)
                      </p>
                    </div>

                    {submitStatus === "success" && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                        <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                        <p className="text-sm text-green-800 font-medium">
                          Vielen Dank! Ihre Nachricht wurde erfolgreich
                          versendet.
                        </p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                        <i className="ri-error-warning-line text-2xl text-red-600"></i>
                        <p className="text-sm text-red-800 font-medium">
                          Ein Fehler ist aufgetreten. Bitte versuchen Sie es
                          erneut.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary font-bold py-4 px-8 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin text-xl"></i>
                          <span>Wird gesendet...</span>
                        </>
                      ) : (
                        <>
                          <span>Nachricht senden</span>
                          <i className="ri-send-plane-fill text-xl"></i>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Map & Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Map */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-neutral-100 h-[400px]">
                  <iframe
                    src="https://maps.google.com/maps?q=Gr%C3%BCnwalder%20Weg%2028d%2C%2082041%20Oberhaching%2C%20Germany&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="J30 Standort Oberhaching - Grünwalder Weg 28d"
                  ></iframe>
                </div>

                {/* Quick Info */}
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 shadow-xl text-white">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    Schnellkontakt
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="w-12 h-12 bg-accent-gold rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="ri-phone-line text-xl text-primary"></i>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">
                          Rufen Sie uns an
                        </p>
                        <p className="font-bold text-lg">+49 (0) 30 22955248</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="w-12 h-12 bg-accent-gold rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="ri-mail-line text-xl text-primary"></i>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-white/70 mb-1">
                          Schreiben Sie uns
                        </p>
                        <p className="font-bold text-lg break-all">
                          kontakt@j30-vermogensverwaltung.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="w-12 h-12 bg-accent-gold rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="ri-time-line text-xl text-primary"></i>
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">
                          Öffnungszeiten
                        </p>
                        <p className="font-bold">Mo-Fr: 9:00 - 18:00 Uhr</p>
                        <p className="text-sm text-white/70">
                          Sa-So: Geschlossen
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Office - Oberhaching */}
        <section className="py-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/5 px-5 py-2 rounded-full mb-6">
                <i className="ri-building-line text-primary"></i>
                <span className="text-sm font-semibold text-primary">
                  Unser Standort
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Besuchen Sie uns in Oberhaching
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Unser Hauptsitz im Herzen von Oberhaching – zentral gelegen und
                hervorragend erreichbar.
              </p>
            </motion.div>

            {/* Main Office Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative h-80 lg:h-auto lg:min-h-[500px] overflow-hidden">
                    <img
                      src={mainOffice.image}
                      alt={mainOffice.city}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>

                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center space-x-2 bg-accent-gold px-5 py-2.5 rounded-full shadow-lg">
                        <i className="ri-star-fill text-primary"></i>
                        <span className="text-primary text-sm font-bold">
                          {mainOffice.type}
                        </span>
                      </div>
                    </div>

                    {/* City Name Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-5xl font-heading font-bold text-white mb-2">
                        {mainOffice.city}
                      </h3>
                      <p className="text-white/80 text-lg">Landkreis München</p>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {/* Contact Info */}
                    <div className="space-y-6 mb-10">
                      <div className="flex items-start space-x-4 p-5 bg-gradient-to-r from-neutral-50 to-white rounded-2xl border border-neutral-100 hover:border-accent-gold/30 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-gradient-to-br from-accent-gold to-accent-gold-light rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <i className="ri-map-pin-line text-2xl text-primary"></i>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 mb-1">
                            Adresse
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {mainOffice.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-5 bg-gradient-to-r from-neutral-50 to-white rounded-2xl border border-neutral-100 hover:border-accent-gold/30 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-gradient-to-br from-accent-gold to-accent-gold-light rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <i className="ri-phone-line text-2xl text-primary"></i>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 mb-1">
                            Telefon
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {mainOffice.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-5 bg-gradient-to-r from-neutral-50 to-white rounded-2xl border border-neutral-100 hover:border-accent-gold/30 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-gradient-to-br from-accent-gold to-accent-gold-light rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <i className="ri-mail-line text-2xl text-primary"></i>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 mb-1">
                            E-Mail
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {mainOffice.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {mainOffice.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-primary/5 rounded-xl"
                        >
                          <i
                            className={`${feature.icon} text-accent-gold text-xl`}
                          ></i>
                          <span className="text-sm font-medium text-primary">
                            {feature.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      href="https://www.google.com/maps/dir//Gr%C3%BCnwalder+Weg+28d,+82041+Oberhaching,+Germany"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-10 inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300"
                    >
                      <i className="ri-route-line text-xl"></i>
                      <span>Route planen</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-gold/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Häufig gestellte Fragen
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Schnelle Antworten auf die wichtigsten Fragen
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "Wie schnell erhalte ich eine Antwort auf meine Anfrage?",
                  a: "Wir antworten in der Regel innerhalb von 24 Stunden auf alle Anfragen, die während unserer Geschäftszeiten eingehen.",
                },
                {
                  q: "Kann ich einen persönlichen Beratungstermin vereinbaren?",
                  a: "Ja, gerne! Kontaktieren Sie uns telefonisch oder per E-Mail, um einen individuellen Beratungstermin in einem unserer Standorte zu vereinbaren.",
                },
                {
                  q: "Welche Unterlagen benötige ich für ein Erstgespräch?",
                  a: "Für ein erstes Beratungsgespräch benötigen Sie keine speziellen Unterlagen. Wir besprechen gemeinsam Ihre Anforderungen und informieren Sie über die weiteren Schritte.",
                },
                {
                  q: "Bieten Sie auch Online-Beratung an?",
                  a: "Ja, wir bieten flexible Beratungsoptionen an, einschließlich Video-Calls und Telefon-Konferenzen für Ihre Bequemlichkeit.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-100 hover:border-accent-gold/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-heading font-bold text-primary mb-3 flex items-start space-x-3">
                    <i className="ri-question-line text-accent-gold text-xl mt-1"></i>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-neutral-600 leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default KontaktPage;
