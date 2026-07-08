import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  gradient: string;
}

const stats: Stat[] = [
  { 
    value: 500, 
    suffix: ' Mio. €', 
    label: 'Verwaltetes Volumen',
    icon: 'ri-funds-line',
    gradient: 'from-accent-gold via-accent-gold-light to-yellow-300'
  },
  { 
    value: 15, 
    suffix: '+', 
    label: 'Jahre Erfahrung',
    icon: 'ri-calendar-line',
    gradient: 'from-blue-400 via-blue-500 to-blue-600'
  },
  { 
    value: 120, 
    suffix: '+', 
    label: 'Institutionelle Kunden',
    icon: 'ri-team-line',
    gradient: 'from-emerald-400 via-emerald-500 to-emerald-600'
  },
  { 
    value: 8, 
    suffix: '', 
    label: 'Internationale Märkte',
    icon: 'ri-global-line',
    gradient: 'from-purple-400 via-purple-500 to-purple-600'
  },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const node = sectionRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-24 px-6 lg:px-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent-gold rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              {/* Card Background with Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-105"></div>
              
              {/* Gradient Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500`}></div>

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Icon with Gradient Background */}
                <div className="relative mx-auto mb-6 w-20 h-20 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500`}></div>
                  <i className={`${stat.icon} text-4xl text-white relative z-10 group-hover:scale-110 transition-transform duration-500`}></i>
                </div>

                {/* Number with CountUp */}
                <div className="mb-3">
                  <div className={`text-5xl lg:text-6xl font-heading font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 inline-block`}>
                    {isVisible ? (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        suffix={stat.suffix}
                        separator="."
                      />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>
                </div>

                {/* Label */}
                <p className="text-white/90 text-base font-semibold leading-tight group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Decorative Line */}
                <div className="mt-6 mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-white/60 transition-all duration-500"></div>
              </div>

              {/* Corner Accent */}
              <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${stat.gradient} rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500`}></div>
              <div className={`absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br ${stat.gradient} rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
