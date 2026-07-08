// Kullanıcı veritabanı - Demo amaçlı
export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
  taxId: string;
  createdAt: string;
}

export interface Investment {
  id: string;
  userId: string;
  name?: string;
  type: 'festgeld' | 'flexgeld' | 'tagesgeld' | 'aktien' | 'anleihen';
  amount: number;
  interestRate: number;
  duration: number; // ay cinsinden
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
  currentValue: number;
  profit: number;
}

// Kullanıcı veritabanı
export const users: User[] = [
  {
    id: 'user-001',
    email: 'demo@demo.com',
    password: 'demo123',
    firstName: 'Max',
    lastName: 'Mustermann',
    phone: '+49 30 22955248',
    address: 'Friedrichstraße 123',
    city: 'Berlin',
    postalCode: '10117',
    country: 'Deutschland',
    dateOfBirth: '15.03.1985',
    nationality: 'Deutsch',
    idNumber: 'DE123456789',
    taxId: '12/345/67890',
    createdAt: '2025-01-15',
  },
  {
    id: 'user-002',
    email: 'docspi0606@gmail.com',
    password: 'Spiller2026!',
    firstName: 'Joachim',
    lastName: 'Spiller',
    phone: '0172 1833493',
    address: 'Hegelweg 10',
    city: 'Calden',
    postalCode: '34379',
    country: 'Deutschland',
    dateOfBirth: '06.06.1959',
    nationality: 'Deutsch',
    idNumber: 'L14RFP1K4',
    taxId: '',
    createdAt: '2026-07-01',
  },
];

// Yatırım veritabanı
export const investments: Investment[] = [
  // Festgeld
  {
    id: 'inv-001',
    userId: 'user-001',
    type: 'festgeld',
    amount: 100000,
    interestRate: 3.2,
    duration: 12,
    startDate: '2025-01-15',
    endDate: '2026-01-15',
    status: 'active',
    currentValue: 103200,
    profit: 3200,
  },
  // Flexgeld
  {
    id: 'inv-002',
    userId: 'user-001',
    type: 'flexgeld',
    amount: 100000,
    interestRate: 2.8,
    duration: 12,
    startDate: '2025-02-01',
    endDate: '2026-02-01',
    status: 'active',
    currentValue: 102800,
    profit: 2800,
  },
  // Tagesgeld
  {
    id: 'inv-003',
    userId: 'user-001',
    type: 'tagesgeld',
    amount: 100000,
    interestRate: 2.5,
    duration: 0, // Tagesgeld için süre yok
    startDate: '2025-03-01',
    endDate: '',
    status: 'active',
    currentValue: 102500,
    profit: 2500,
  },
  // Aktien
  {
    id: 'inv-004',
    userId: 'user-001',
    type: 'aktien',
    amount: 100000,
    interestRate: 8.5, // Ortalama getiri
    duration: 12,
    startDate: '2025-01-01',
    endDate: '2026-01-01',
    status: 'active',
    currentValue: 108500,
    profit: 8500,
  },
  // Anleihen
  {
    id: 'inv-005',
    userId: 'user-001',
    type: 'anleihen',
    amount: 100000,
    interestRate: 4.2,
    duration: 12,
    startDate: '2025-01-20',
    endDate: '2026-01-20',
    status: 'active',
    currentValue: 104200,
    profit: 4200,
  },
  // Flexgeld - Dr. Joachim Spiller (Flex90, Vertrag 6625747)
  {
    id: 'inv-006',
    userId: 'user-002',
    name: 'Flex90',
    type: 'flexgeld',
    amount: 100000,
    interestRate: 3.95,
    duration: 3, // Kündigungsfrist: 3 Monate
    startDate: '2026-07-01',
    endDate: '2026-10-01',
    status: 'pending', // Antrag ausstehend – noch nicht aktiviert
    currentValue: 100000,
    profit: 0,
  },
];

// Kullanıcı güncelleme fonksiyonu
export const updateUser = (userId: string, updates: Partial<User>): boolean => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    return true;
  }
  return false;
};

// Şifre güncelleme fonksiyonu
export const updatePassword = (userId: string, newPassword: string): boolean => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    return true;
  }
  return false;
};

// Kullanıcı doğrulama
export const authenticateUser = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

// Kullanıcı yatırımlarını getir
export const getUserInvestments = (userId: string): Investment[] => {
  return investments.filter(inv => inv.userId === userId);
};

// Toplam portföy değeri
export const getTotalPortfolioValue = (userId: string): number => {
  const userInvestments = getUserInvestments(userId);
  return userInvestments.reduce((total, inv) => total + inv.currentValue, 0);
};

// Toplam kar
export const getTotalProfit = (userId: string): number => {
  const userInvestments = getUserInvestments(userId);
  return userInvestments.reduce((total, inv) => total + inv.profit, 0);
};