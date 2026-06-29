import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const BlogGrid = () => {
  const categories = ['Alle', 'Marktanalyse', 'Regulierung', 'Strategie', 'Wirtschaft', 'Technologie', 'Nachhaltigkeit', 'Risikomanagement'];
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Zinswende 2024: Auswirkungen auf Anleihenportfolios',
      excerpt: 'Eine detaillierte Analyse der aktuellen Zinspolitik der EZB und deren Implikationen für institutionelle Fixed-Income-Strategien.',
      category: 'Marktanalyse',
      date: '28. Juni 2026',
      readTime: '8 Min.',
      image: '/images/blog1.jpg'
    },
    {
      id: 2,
      title: 'KAGB-Novelle: Neue Anforderungen für Kapitalverwaltungsgesellschaften',
      excerpt: 'Überblick über die wichtigsten Änderungen im Kapitalanlagegesetzbuch und deren praktische Umsetzung für regulierte KVGs.',
      category: 'Regulierung',
      date: '26. Juni 2026',
      readTime: '6 Min.',
      image: '/images/blog2.jpg'
    },
    {
      id: 3,
      title: 'Diversifikation in volatilen Märkten: Best Practices',
      excerpt: 'Strategische Ansätze zur Portfoliodiversifikation unter Berücksichtigung aktueller Marktvolatilitäten und Korrelationsstrukturen.',
      category: 'Strategie',
      date: '24. Juni 2026',
      readTime: '10 Min.',
      image: '/images/blog3.jpg'
    },
    {
      id: 4,
      title: 'ESG-Integration in institutionellen Portfolios',
      excerpt: 'Praktische Implementierung von ESG-Kriterien in Anlagestrategien unter Einhaltung regulatorischer Vorgaben und Performanceanforderungen.',
      category: 'Strategie',
      date: '22. Juni 2026',
      readTime: '7 Min.',
      image: '/images/blog4.jpg'
    },
    {
      id: 5,
      title: 'Geopolitische Risiken und Portfoliomanagement',
      excerpt: 'Analyse aktueller geopolitischer Entwicklungen und deren Auswirkungen auf internationale Anlagestrategien und Risikomanagement.',
      category: 'Marktanalyse',
      date: '20. Juni 2026',
      readTime: '9 Min.',
      image: '/images/blog5.jpg'
    },
    {
      id: 6,
      title: 'Inflationsschutz durch alternative Anlageklassen',
      excerpt: 'Evaluierung alternativer Investments als Inflationshedge: Immobilien, Infrastruktur und Rohstoffe im institutionellen Kontext.',
      category: 'Strategie',
      date: '19. Juni 2026',
      readTime: '8 Min.',
      image: '/images/blog6.jpg'
    },
    {
      id: 7,
      title: 'Liquiditätsmanagement in Spezial-AIFs',
      excerpt: 'Best Practices für effektives Liquiditätsmanagement unter Berücksichtigung regulatorischer Anforderungen nach KAGB.',
      category: 'Regulierung',
      date: '17. Juni 2026',
      readTime: '6 Min.',
      image: '/images/blog7.jpg'
    },
    {
      id: 8,
      title: 'Konjunkturausblick 2024: Deutschland und Europa',
      excerpt: 'Makroökonomische Prognosen für die deutsche und europäische Wirtschaft mit Fokus auf Zinsentwicklung und Wachstumsperspektiven.',
      category: 'Wirtschaft',
      date: '15. Juni 2026',
      readTime: '11 Min.',
      image: '/images/blog8.jpg'
    },
    {
      id: 9,
      title: 'Digitalisierung im Asset Management',
      excerpt: 'Technologische Innovationen und deren Einfluss auf Prozesse, Compliance und Kundenservice in der Kapitalverwaltung.',
      category: 'Technologie',
      date: '13. Juni 2026',
      readTime: '7 Min.',
      image: '/images/blog9.jpg'
    },
    {
      id: 10,
      title: 'Nachhaltige Investments: Trends und Entwicklungen 2024',
      excerpt: 'Aktuelle Entwicklungen im Bereich nachhaltiger Geldanlagen und deren Integration in institutionelle Anlagestrategien.',
      category: 'Nachhaltigkeit',
      date: '11. Juni 2026',
      readTime: '9 Min.',
      image: '/images/blog10.jpg'
    },
    {
      id: 11,
      title: 'Private Equity: Chancen für institutionelle Investoren',
      excerpt: 'Analyse der Private-Equity-Märkte und strategische Überlegungen für institutionelle Anleger im aktuellen Marktumfeld.',
      category: 'Marktanalyse',
      date: '9. Juni 2026',
      readTime: '10 Min.',
      image: '/images/blog11.jpg'
    },
    {
      id: 12,
      title: 'Währungsrisiken im internationalen Portfolio',
      excerpt: 'Strategien zur Steuerung von Währungsrisiken in global diversifizierten Portfolios und Einsatz von Hedging-Instrumenten.',
      category: 'Risikomanagement',
      date: '7. Juni 2026',
      readTime: '8 Min.',
      image: '/images/blog12.jpg'
    },
    {
      id: 13,
      title: 'Real Assets: Infrastruktur als Anlageklasse',
      excerpt: 'Bewertung von Infrastrukturinvestments als langfristige Anlageoption mit stabilen Cashflows und Inflationsschutz.',
      category: 'Strategie',
      date: '5. Juni 2026',
      readTime: '9 Min.',
      image: '/images/blog13.jpg'
    },
    {
      id: 14,
      title: 'MiFID II: Auswirkungen auf die Anlageberatung',
      excerpt: 'Praktische Implikationen der MiFID-II-Richtlinie für Kapitalverwaltungsgesellschaften und institutionelle Anlageberatung.',
      category: 'Regulierung',
      date: '3. Juni 2026',
      readTime: '7 Min.',
      image: '/images/blog14.jpg'
    },
    {
      id: 15,
      title: 'Künstliche Intelligenz im Portfoliomanagement',
      excerpt: 'Einsatzmöglichkeiten von KI und Machine Learning in der Portfoliooptimierung und im Risikomanagement.',
      category: 'Technologie',
      date: '1. Juni 2026',
      readTime: '10 Min.',
      image: '/images/blog15.jpg'
    },
    {
      id: 16,
      title: 'Emerging Markets: Chancen und Risiken 2024',
      excerpt: 'Analyse der Schwellenländermärkte mit Fokus auf Wachstumspotenziale und spezifische Risikofaktoren für institutionelle Investoren.',
      category: 'Marktanalyse',
      date: '31. Mai 2026',
      readTime: '11 Min.',
      image: '/images/blog16.jpg'
    },
    {
      id: 17,
      title: 'Stresstest-Szenarien für Portfolios',
      excerpt: 'Methoden und Best Practices für die Durchführung von Stresstests und Szenarioanalysen in der Kapitalverwaltung.',
      category: 'Risikomanagement',
      date: '29. Mai 2026',
      readTime: '8 Min.',
      image: '/images/blog17.jpg'
    },
    {
      id: 18,
      title: 'Green Bonds: Marktentwicklung und Perspektiven',
      excerpt: 'Überblick über den wachsenden Markt für grüne Anleihen und deren Rolle in nachhaltigen Investmentstrategien.',
      category: 'Nachhaltigkeit',
      date: '27. Mai 2026',
      readTime: '7 Min.',
      image: '/images/blog18.jpg'
    },
    {
      id: 19,
      title: 'Cyber-Sicherheit in der Finanzbranche',
      excerpt: 'Aktuelle Bedrohungen und Schutzmaßnahmen für Kapitalverwaltungsgesellschaften im digitalen Zeitalter.',
      category: 'Technologie',
      date: '25. Mai 2026',
      readTime: '9 Min.',
      image: '/images/blog19.jpg'
    },
    {
      id: 20,
      title: 'Demografischer Wandel und Kapitalanlage',
      excerpt: 'Langfristige Auswirkungen des demografischen Wandels auf Kapitalmärkte und Anlagestrategien für institutionelle Investoren.',
      category: 'Wirtschaft',
      date: '23. Mai 2026',
      readTime: '10 Min.',
      image: '/images/blog20.jpg'
    },
    {
      id: 21,
      title: 'Blockchain-Technologie im Wertpapierhandel',
      excerpt: 'Potenziale und Herausforderungen der Distributed-Ledger-Technologie für den institutionellen Wertpapierhandel und Settlement.',
      category: 'Technologie',
      date: '21. Mai 2026',
      readTime: '9 Min.',
      image: '/images/blog21.jpg'
    },
    {
      id: 22,
      title: 'Faktor-Investing: Systematische Anlagestrategien',
      excerpt: 'Wissenschaftlich fundierte Faktorstrategien wie Value, Momentum und Quality im institutionellen Portfoliomanagement.',
      category: 'Strategie',
      date: '19. Mai 2026',
      readTime: '11 Min.',
      image: '/images/blog22.jpg'
    },
    {
      id: 23,
      title: 'Immobilien-AIFs: Marktchancen 2024',
      excerpt: 'Analyse des deutschen Immobilienmarktes und Investitionsmöglichkeiten für geschlossene und offene Immobilienfonds.',
      category: 'Marktanalyse',
      date: '17. Mai 2026',
      readTime: '10 Min.',
      image: '/images/blog23.jpg'
    },
    {
      id: 24,
      title: 'DORA: Neue IT-Sicherheitsanforderungen',
      excerpt: 'Der Digital Operational Resilience Act und seine Auswirkungen auf Kapitalverwaltungsgesellschaften und deren IT-Infrastruktur.',
      category: 'Regulierung',
      date: '15. Mai 2026',
      readTime: '8 Min.',
      image: '/images/blog24.jpg'
    },
    {
      id: 25,
      title: 'Rohstoff-Investments: Strategische Allokation',
      excerpt: 'Rolle von Rohstoffen in diversifizierten Portfolios: Gold, Öl, Industriemetalle und Agrarrohstoffe im Vergleich.',
      category: 'Strategie',
      date: '13. Mai 2026',
      readTime: '9 Min.',
      image: '/images/blog25.jpg'
    },
    {
      id: 26,
      title: 'Quantitative Easing: Ende einer Ära',
      excerpt: 'Auswirkungen der Beendigung der quantitativen Lockerung durch die EZB auf Anleihenmärkte und Portfoliostrategien.',
      category: 'Marktanalyse',
      date: '12. Mai 2026',
      readTime: '10 Min.',
      image: '/images/blog26.jpg'
    },
    {
      id: 27,
      title: 'Nachhaltigkeitsrating: Methoden und Standards',
      excerpt: 'Vergleich verschiedener ESG-Rating-Agenturen und deren Bewertungsmethoden für institutionelle Investitionsentscheidungen.',
      category: 'Nachhaltigkeit',
      date: '10. Mai 2026',
      readTime: '8 Min.',
      image: '/images/blog27.jpg'
    },
    {
      id: 28,
      title: 'Derivate im Risikomanagement',
      excerpt: 'Einsatz von Optionen, Futures und Swaps zur Absicherung von Portfoliorisiken und zur Optimierung der Rendite-Risiko-Struktur.',
      category: 'Risikomanagement',
      date: '8. Mai 2026',
      readTime: '11 Min.',
      image: '/images/blog28.jpg'
    },
    {
      id: 29,
      title: 'Venture Capital: Zugang für institutionelle Anleger',
      excerpt: 'Investitionsmöglichkeiten in Start-ups und Wachstumsunternehmen über VC-Fonds und deren Integration in institutionelle Portfolios.',
      category: 'Strategie',
      date: '6. Mai 2026',
      readTime: '9 Min.',
      image: '/images/blog29.jpg'
    },
    {
      id: 30,
      title: 'Steueroptimierung bei Kapitalanlagen',
      excerpt: 'Strategien zur steuereffizienten Strukturierung von Investmentportfolios unter Berücksichtigung aktueller Gesetzgebung.',
      category: 'Strategie',
      date: '4. Mai 2026',
      readTime: '10 Min.',
      image: '/images/blog30.jpg'
    },
    {
      id: 31,
      title: 'Credit-Spreads: Analyse und Prognose',
      excerpt: 'Entwicklung der Risikoaufschläge bei Unternehmensanleihen und deren Bedeutung für Fixed-Income-Investoren.',
      category: 'Marktanalyse',
      date: '2. Mai 2026',
      readTime: '8 Min.',
      image: '/images/blog31.jpg'
    },
    {
      id: 32,
      title: 'Automatisiertes Trading: Chancen und Grenzen',
      excerpt: 'Algorithmischer Handel und Robo-Advisory im institutionellen Asset Management: Technologie, Regulierung und Performance.',
      category: 'Technologie',
      date: '30. April 2026',
      readTime: '9 Min.',
      image: '/images/blog32.jpg'
    },
    {
      id: 33,
      title: 'Pensionsfonds: Herausforderungen und Lösungen',
      excerpt: 'Strategien für Pensionskassen zur Bewältigung niedriger Zinsen, demografischer Entwicklung und regulatorischer Anforderungen.',
      category: 'Wirtschaft',
      date: '28. April 2026',
      readTime: '11 Min.',
      image: '/images/blog33.jpg'
    },
    {
      id: 34,
      title: 'Klimarisiken im Portfolio',
      excerpt: 'Identifikation, Messung und Management von klimabezogenen Finanzrisiken gemäß TCFD-Empfehlungen.',
      category: 'Nachhaltigkeit',
      date: '26. April 2026',
      readTime: '10 Min.',
      image: '/images/blog34.jpg'
    },
    {
      id: 35,
      title: 'Alternative Risikoprämien',
      excerpt: 'Systematische Erfassung von Risikoprämien jenseits traditioneller Anlageklassen für institutionelle Portfolios.',
      category: 'Strategie',
      date: '24. April 2026',
      readTime: '9 Min.',
      image: '/images/blog35.jpg'
    },
    {
      id: 36,
      title: 'Compliance-Management: Best Practices',
      excerpt: 'Aufbau und Organisation effektiver Compliance-Strukturen in Kapitalverwaltungsgesellschaften.',
      category: 'Regulierung',
      date: '23. April 2026',
      readTime: '8 Min.',
      image: '/images/blog36.jpg'
    },
    {
      id: 37,
      title: 'Hochzinsanleihen: Chancen und Risiken',
      excerpt: 'High-Yield-Bonds im institutionellen Portfolio: Bonitätsanalyse, Ausfallrisiken und Renditeerwartungen.',
      category: 'Marktanalyse',
      date: '21. April 2026',
      readTime: '10 Min.',
      image: '/images/blog37.jpg'
    },
    {
      id: 38,
      title: 'Digitale Assets: Institutionelle Perspektive',
      excerpt: 'Kryptowährungen und digitale Vermögenswerte: Regulierung, Verwahrung und Portfoliointegration für professionelle Investoren.',
      category: 'Technologie',
      date: '19. April 2026',
      readTime: '11 Min.',
      image: '/images/blog38.jpg'
    },
    {
      id: 39,
      title: 'Performance-Attribution: Methoden und Analyse',
      excerpt: 'Systematische Analyse von Portfoliorenditen: Faktorzerlegung, Benchmark-Vergleich und Wertbeitrag einzelner Entscheidungen.',
      category: 'Risikomanagement',
      date: '17. April 2026',
      readTime: '9 Min.',
      image: '/images/blog39.jpg'
    },
    {
      id: 40,
      title: 'Globale Lieferketten: Investmentimplikationen',
      excerpt: 'Auswirkungen von Lieferkettenveränderungen auf Branchen, Regionen und Investmentstrategien im globalen Kontext.',
      category: 'Wirtschaft',
      date: '15. April 2026',
      readTime: '10 Min.',
      image: '/images/blog40.jpg'
    }
  ];

  const filteredPosts = selectedCategory === 'Alle' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Category Filter */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === category
                  ? 'bg-accent-gold text-primary'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer group"
            >
              <Link to={`/blog/${post.id}`} className="block">
                <div className="relative w-full h-56 overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent-gold text-primary text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-3">
                    <span className="flex items-center space-x-1">
                      <i className="ri-calendar-line"></i>
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <i className="ri-time-line"></i>
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-accent-gold font-semibold group-hover:space-x-3 transition-all duration-300">
                    <span>Weiterlesen</span>
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;