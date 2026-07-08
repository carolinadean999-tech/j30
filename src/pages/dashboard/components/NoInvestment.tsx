import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardHeader from './DashboardHeader';
import CallUsModal from './CallUsModal';

interface NoInvestmentProps {
  typeName: string;
  icon: string;
}

export default function NoInvestment({ typeName, icon }: NoInvestmentProps) {
  const [showCallModal, setShowCallModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <DashboardHeader />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Zurück */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-neutral-600 hover:text-accent-gold600 transition-colors mb-6 whitespace-nowrap cursor-pointer"
        >
          <i className="ri-arrow-left-line text-lg"></i>
          <span className="text-sm font-medium">Zurück zur Übersicht</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <i className={`${icon} text-4xl text-white`}></i>
          </div>

          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
            Noch keine {typeName}-Anlage
          </h1>
          <p className="text-neutral-600 max-w-xl mx-auto mb-8">
            Sie haben derzeit keine {typeName}-Anlage in Ihrem Portfolio. Unser
            Expertenteam berät Sie gerne persönlich zu den Möglichkeiten,
            Konditionen und Vorteilen einer {typeName}-Anlage.
          </p>

          {/* Servicenummer */}
          <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-2xl p-6 mb-8 border border-amber-100 max-w-md mx-auto">
            <p className="text-sm text-accent-gold700 mb-2 font-medium">Unsere Servicenummer</p>
            <a
              href="tel:+493022955248"
              className="text-2xl md:text-3xl font-bold text-primary hover:text-accent-gold transition-colors"
            >
              +49 (0) 30 22955248
            </a>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-600">
              <i className="ri-time-line text-accent-gold"></i>
              <span>Mo-Fr: 9:00 - 18:00 Uhr</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setShowCallModal(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-slate-800 text-white py-3.5 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-customer-service-2-line text-xl"></i>
              Jetzt Beratung anfragen
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto bg-white hover:bg-neutral-50 text-primary py-3.5 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg border border-neutral-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-dashboard-line text-xl"></i>
              Zur Übersicht
            </button>
          </div>
        </motion.div>
      </div>

      <CallUsModal isOpen={showCallModal} onClose={() => setShowCallModal(false)} />
    </div>
  );
}
