import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Festgeld', path: '/leistungen/festgeld', icon: 'ri-safe-line' },
    { name: 'Flexgeld', path: '/leistungen/flexgeld', icon: 'ri-exchange-line' },
    { name: 'Tagesgeld', path: '/leistungen/tagesgeld', icon: 'ri-wallet-3-line' },
    { name: 'Aktien', path: '/leistungen/aktien', icon: 'ri-line-chart-line' },
    { name: 'Anleihen', path: '/leistungen/anleihen', icon: 'ri-stock-line' },
  ];

  const company = [
    { name: 'Über Uns', path: '/ueber-uns', icon: 'ri-building-line' },
    { name: 'Unser Team', path: '/team', icon: 'ri-team-line' },
    { name: 'Märkte', path: '/maerkte', icon: 'ri-stock-line' },
    { name: 'Blog & News', path: '/blog', icon: 'ri-newspaper-line' },
    { name: 'Kontakt', path: '/kontakt', icon: 'ri-mail-line' },
  ];

  const legal = [
    { name: 'Impressum', path: '/impressum' },
    { name: 'Datenschutz', path: '/datenschutz' },
    { name: 'Rechtliche Hinweise', path: '/rechtliche-hinweise' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold-light rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold to-accent-gold-light rounded-xl blur-lg opacity-50"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-accent-gold via-accent-gold-light to-accent-gold rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-white">J</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold tracking-tight">J30</span>
                <span className="text-sm text-accent-gold font-semibold">Vermögensverwaltung</span>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-8 max-w-md">
              Unabhängige Vermögensverwaltung mit Sitz in Oberhaching. Professionelle Anlagelösungen für institutionelle und qualifizierte Anleger.
            </p>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <i className="ri-building-2-line text-xl text-accent-gold"></i>
                  <p className="text-xs font-bold text-white/90">Rechtsform</p>
                </div>
                <p className="text-xs text-white/60">GmbH · Oberhaching</p>
              </div>
              <a
                href="https://www.northdata.de/J30%20Verm%C3%B6gensverwaltung%20GmbH,%20Oberhaching/Amtsgericht%20M%C3%BCnchen%20HRB%20293622"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 block"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <i className="ri-building-line text-xl text-accent-gold"></i>
                  <p className="text-xs font-bold text-white/90">Handelsregister</p>
                </div>
                <p className="text-xs text-white/60">HRB 293622 · AG München</p>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-3">
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-accent-gold rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-11 h-11 bg-white/10 hover:bg-accent-gold rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <i className="ri-linkedin-fill text-lg"></i>
                </div>
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-accent-gold rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-11 h-11 bg-white/10 hover:bg-accent-gold rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <i className="ri-twitter-x-fill text-lg"></i>
                </div>
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-accent-gold rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-11 h-11 bg-white/10 hover:bg-accent-gold rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <i className="ri-mail-line text-lg"></i>
                </div>
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-accent-gold rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-11 h-11 bg-white/10 hover:bg-accent-gold rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <i className="ri-youtube-fill text-lg"></i>
                </div>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-heading font-bold mb-6 text-accent-gold flex items-center space-x-2">
              <i className="ri-service-line text-xl"></i>
              <span>Leistungen</span>
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link to={service.path} className="group flex items-center space-x-3 text-sm text-white/80 hover:text-accent-gold transition-all duration-300">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-accent-gold/20 transition-all duration-300">
                      <i className={`${service.icon} text-sm`}></i>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-heading font-bold mb-6 text-accent-gold flex items-center space-x-2">
              <i className="ri-building-4-line text-xl"></i>
              <span>Unternehmen</span>
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="group flex items-center space-x-3 text-sm text-white/80 hover:text-accent-gold transition-all duration-300">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-accent-gold/20 transition-all duration-300">
                      <i className={`${item.icon} text-sm`}></i>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-heading font-bold mb-6 text-accent-gold flex items-center space-x-2">
              <i className="ri-customer-service-line text-xl"></i>
              <span>Kontakt</span>
            </h3>
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-lg text-accent-gold"></i>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/90 mb-1">Adresse</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Grünwalder Weg 28d<br />
                      82041 Oberhaching<br />
                      Deutschland
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-lg text-accent-gold"></i>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/90 mb-1">Telefon</p>
                    <p className="text-xs text-white/70">+49 (0) 30 22955248</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-lg text-accent-gold"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white/90 mb-1">E-Mail</p>
                    <p className="text-xs text-white/70 break-all">kontakt@j30vermogensverwaltung.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Information */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent-gold/30 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center">
                  <i className="ri-building-2-line text-2xl text-accent-gold"></i>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-medium mb-1">Rechtsform</p>
                  <p className="text-sm text-white font-bold">GmbH</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.northdata.de/J30%20Verm%C3%B6gensverwaltung%20GmbH,%20Oberhaching/Amtsgericht%20M%C3%BCnchen%20HRB%20293622"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent-gold/30 transition-all duration-300 block"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center">
                  <i className="ri-building-line text-2xl text-accent-gold"></i>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-medium mb-1">Handelsregister</p>
                  <p className="text-sm text-white font-bold">HRB 293622</p>
                </div>
              </div>
            </a>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent-gold/30 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center">
                  <i className="ri-scales-3-line text-2xl text-accent-gold"></i>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-medium mb-1">Registergericht</p>
                  <p className="text-sm text-white font-bold">Amtsgericht München</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-sm text-white/60">
                © {currentYear} J30 Vermögensverwaltung
              </p>
              <div className="flex items-center space-x-6">
                {legal.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="text-sm text-white/60 hover:text-accent-gold transition-colors duration-300 whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <span className="text-sm text-white/60 whitespace-nowrap">
              HRB 293622 · Amtsgericht München
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
