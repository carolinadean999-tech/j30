import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { updateUser, updatePassword } from '../../../data/users';
import { motion } from 'framer-motion';
import DashboardHeader from '../components/DashboardHeader';

export default function ProfilPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    dateOfBirth: '',
    nationality: '',
    idNumber: '',
    taxId: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
        dateOfBirth: user.dateOfBirth,
        nationality: user.nationality,
        idNumber: user.idNumber,
        taxId: user.taxId,
      });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const success = updateUser(user.id, formData);
      if (success) {
        setMessage({ type: 'success', text: 'Profil erfolgreich aktualisiert!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Fehler beim Aktualisieren des Profils' });
      }
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Bitte füllen Sie alle Felder aus' });
      return;
    }

    if (user && user.password !== passwordData.currentPassword) {
      setPasswordMessage({ type: 'error', text: 'Aktuelles Passwort ist falsch' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwörter stimmen nicht überein' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Passwort muss mindestens 6 Zeichen lang sein' });
      return;
    }

    if (user) {
      const success = updatePassword(user.id, passwordData.newPassword);
      if (success) {
        setPasswordMessage({ type: 'success', text: 'Passwort erfolgreich geändert!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setPasswordMessage({ type: '', text: '' }), 3000);
      } else {
        setPasswordMessage({ type: 'error', text: 'Fehler beim Ändern des Passworts' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-amber-50/30">
      <DashboardHeader />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-neutral-600 hover:text-amber-600 transition-colors mb-6 whitespace-nowrap cursor-pointer"
        >
          <i className="ri-arrow-left-line text-lg"></i>
          <span className="text-sm font-medium">Zurück zur Übersicht</span>
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">Mein Profil</h1>
          <p className="text-neutral-600 text-sm md:text-base">Verwalten Sie Ihre persönlichen Informationen und Einstellungen</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-3xl">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-neutral-500 mt-1">{user.email}</p>
              </div>

              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-3 text-sm">
                  <i className="ri-calendar-line text-amber-600 text-lg"></i>
                  <div>
                    <p className="text-neutral-500 text-xs">Mitglied seit</p>
                    <p className="font-semibold text-primary">{user.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <i className="ri-map-pin-line text-amber-600 text-lg"></i>
                  <div>
                    <p className="text-neutral-500 text-xs">Standort</p>
                    <p className="font-semibold text-primary">{user.city}, {user.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-neutral-200"
            >
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">Persönliche Informationen</h2>

              {message.text && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <i className={`${message.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'} text-xl`}></i>
                  <span className="text-sm font-medium">{message.text}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Vorname</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Nachname</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">E-Mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Stadt</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">PLZ</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Land</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Geburtsdatum</label>
                    <input
                      type="text"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Nationalität</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Ausweisnummer</label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Steuer-ID</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-save-line text-lg"></i>
                  <span>Änderungen speichern</span>
                </button>
              </form>
            </motion.div>

            {/* Password Change */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-neutral-200"
            >
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">Passwort ändern</h2>

              {passwordMessage.text && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    passwordMessage.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <i className={`${passwordMessage.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'} text-xl`}></i>
                  <span className="text-sm font-medium">{passwordMessage.text}</span>
                </motion.div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Aktuelles Passwort</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Neues Passwort</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Passwort bestätigen</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm bg-neutral-50 hover:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-3.5 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-lock-password-line text-lg"></i>
                  <span>Passwort ändern</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}