import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://141.11.1.85:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; full_name: string; phone?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
  getReservations: () => api.get('/user/reservations'),
  getPayments: () => api.get('/user/payments'),
  updateReservationAddress: (id: number, address: string) =>
    api.put(`/user/reservations/${id}/address`, { address }),
};

// Collections API
export const collectionsAPI = {
  getAll: (activeOnly = true) => api.get(`/collections?active=${activeOnly}`),
  getById: (id: number) => api.get(`/collections/${id}`),
  getAvailablePieces: (id: number) => api.get(`/collections/${id}/available-pieces`),
};

// Reservations API
export const reservationsAPI = {
  create: (data: { collection_id: number; piece_number: number; delivery_address?: string }) =>
    api.post('/reservations', data),
  getById: (id: number) => api.get(`/reservations/${id}`),
};

// Payments API
export const paymentsAPI = {
  create: (data: { reservation_id: number; currency?: string }) =>
    api.post('/payments', data),
  getStatus: (paymentId: string) => api.get(`/payments/${paymentId}/status`),
  submitTxid: (paymentId: string, txid: string) =>
    api.post('/payments/submit-txid', { payment_id: paymentId, txid }),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),

  // Collections
  createCollection: (data: any) => api.post('/admin/collections', data),
  updateCollection: (id: number, data: any) => api.put(`/admin/collections/${id}`, data),
  deleteCollection: (id: number) => api.delete(`/admin/collections/${id}`),

  // Users
  getUsers: (page = 1, limit = 20) => api.get(`/admin/users?page=${page}&limit=${limit}`),

  // Reservations
  getReservations: (page = 1, limit = 20) => api.get(`/admin/reservations?page=${page}&limit=${limit}`),
  updateReservationStatus: (id: number, status: string) =>
    api.put(`/admin/reservations/${id}/status`, { status }),

  // Payments
  getPayments: (page = 1, limit = 20) => api.get(`/admin/payments?page=${page}&limit=${limit}`),

  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSetting: (key: string, value: string) =>
    api.put('/admin/settings', { key, value }),
};
