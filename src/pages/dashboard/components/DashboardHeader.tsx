import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Übersicht', icon: 'ri-dashboard-3-line' },
    { path: '/dashboard/festgeld', label: 'Festgeld', icon: 'ri-safe-2-line' },
    { path: '/dashboard/flexgeld', label: 'Flexgeld', icon: 'ri-exchange-line' },
    { path: '/dashboard/tagesgeld', label: 'Tagesgeld', icon: 'ri-calendar-check-line' },
    { path: '/dashboard/aktien', label: 'Aktien', icon: 'ri-stock-line' },
    { path: '/dashboard/anleihen', label: 'Anleihen', icon: 'ri-file-chart-line' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-neutral-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-2xl font-bold text-white">J</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-heading font-bold text-primary">
                J30
              </span>
              <p className="text-xs text-accent-gold font-semibold -mt-1">Kundenportal</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = window.location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap group ${
                    isActive
                      ? 'text-accent-gold'
                      : 'text-neutral-600 hover:text-accent-gold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <i className={`${item.icon} text-lg`}></i>
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <i className={`${showMobileMenu ? 'ri-close-line' : 'ri-menu-line'} text-2xl text-neutral-600`}></i>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 hover:bg-neutral-50 rounded-xl px-3 py-2 transition-all cursor-pointer group"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                  <span className="text-white font-bold text-sm">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-primary">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                </div>
                <i className={`ri-arrow-down-s-line text-neutral-400 transition-transform hidden md:block ${showMenu ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-200/50 overflow-hidden"
                  >
                    <div className="p-5 border-b border-neutral-100 bg-gradient-to-br from-amber-50/50 to-primary/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-white font-bold">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-neutral-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-xs text-neutral-600">
                        <i className="ri-shield-check-line text-accent-gold mr-1"></i>
                        Verifiziertes Konto
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate('/dashboard/profil');
                          setShowMenu(false);
                        }}
                        className="w-full px-5 py-3 text-left text-sm text-neutral-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-primary/5 hover:text-primary flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap group"
                      >
                        <div className="w-9 h-9 bg-neutral-100 group-hover:bg-amber-100 rounded-lg flex items-center justify-center transition-colors">
                          <i className="ri-user-line text-lg"></i>
                        </div>
                        <div>
                          <p className="font-semibold">Mein Profil</p>
                          <p className="text-xs text-neutral-500">Einstellungen verwalten</p>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/');
                          setShowMenu(false);
                        }}
                        className="w-full px-5 py-3 text-left text-sm text-neutral-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-primary/5 hover:text-primary flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap group"
                      >
                        <div className="w-9 h-9 bg-neutral-100 group-hover:bg-amber-100 rounded-lg flex items-center justify-center transition-colors">
                          <i className="ri-home-line text-lg"></i>
                        </div>
                        <div>
                          <p className="font-semibold">Zur Startseite</p>
                          <p className="text-xs text-neutral-500">Hauptwebsite besuchen</p>
                        </div>
                      </button>
                    </div>
                    
                    <div className="border-t border-neutral-100 bg-neutral-50/50">
                      <button
                        onClick={handleLogout}
                        className="w-full px-5 py-3.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap group"
                      >
                        <div className="w-9 h-9 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors">
                          <i className="ri-logout-box-line text-lg"></i>
                        </div>
                        <div>
                          <p className="font-semibold">Abmelden</p>
                          <p className="text-xs text-red-500">Sicher ausloggen</p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-neutral-200 bg-gradient-to-br from-neutral-50 to-white"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = window.location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-50 to-primary/5 text-primary shadow-sm'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-amber-100' : 'bg-neutral-100'
                    }`}>
                      <i className={`${item.icon} text-lg`}></i>
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}