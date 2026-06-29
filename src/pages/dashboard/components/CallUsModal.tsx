import { motion, AnimatePresence } from 'framer-motion';

interface CallUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallUsModal({ isOpen, onClose }: CallUsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-neutral-100 hover:bg-neutral-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl text-neutral-600"></i>
            </button>

            <div className="text-center">
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <i className="ri-phone-line text-4xl text-white"></i>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                Rufen Sie uns an
              </h3>

              {/* Description */}
              <p className="text-neutral-600 mb-6">
                Unser Expertenteam steht Ihnen persönlich zur Verfügung. Wir beraten Sie gerne zu Ihrer nächsten Investition.
              </p>

              {/* Phone Number */}
              <div className="bg-gradient-to-br from-amber-50 to-primary/5 rounded-xl p-6 mb-6 border border-amber-100">
                <p className="text-sm text-accent-gold700 mb-2 font-medium">Unsere Servicenummer</p>
                <a
                  href="tel:+493022955248"
                  className="text-3xl font-bold text-primary hover:text-accent-gold transition-colors"
                >
                  +49 (0) 30 22955248
                </a>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <i className="ri-time-line text-accent-gold"></i>
                    <span>Mo-Fr: 9:00 - 18:00</span>
                  </div>
                </div>
              </div>

              {/* Additional Contact Options */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a
                  href="mailto:kontakt@j30vermogensverwaltung.com"
                  className="bg-neutral-100 hover:bg-neutral-200 rounded-xl p-4 transition-colors group"
                >
                  <i className="ri-mail-line text-2xl text-primary group-hover:text-accent-gold transition-colors mb-2 block"></i>
                  <p className="text-sm font-medium text-neutral-700">E-Mail</p>
                  <p className="text-xs text-neutral-500">kontakt@j30vermogensverwaltung.com</p>
                </a>
                <a
                  href="https://wa.me/493022955248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-100 hover:bg-neutral-200 rounded-xl p-4 transition-colors group"
                >
                  <i className="ri-whatsapp-line text-2xl text-primary group-hover:text-green-500 transition-colors mb-2 block"></i>
                  <p className="text-sm font-medium text-neutral-700">WhatsApp</p>
                  <p className="text-xs text-neutral-500">Schreiben Sie uns</p>
                </a>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-slate-800 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                Schließen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
