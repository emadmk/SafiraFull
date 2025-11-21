export interface User {
  id: number;
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Collection {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  price_usdt: number;
  total_pieces: number;
  available_pieces: number;
  sold_pieces: number;
  delivery_date?: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Reservation {
  id: number;
  user_id: number;
  collection_id: number;
  piece_number: number;
  status: 'pending' | 'paid' | 'confirmed' | 'delivered' | 'cancelled';
  delivery_address?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: number;
  reservation_id: number;
  user_id: number;
  payment_id?: string;
  order_id: string;
  amount_usdt: number;
  currency: string;
  status: 'waiting' | 'confirming' | 'confirmed' | 'sending' | 'partially_paid' | 'finished' | 'failed' | 'refunded' | 'expired';
  txid?: string;
  payment_url?: string;
  nowpayments_data?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Setting {
  id: number;
  key: string;
  value: string;
  description?: string;
  updated_at: Date;
}

export interface EmailLog {
  id: number;
  user_id?: number;
  to_email: string;
  subject: string;
  body?: string;
  status: 'sent' | 'failed';
  error_message?: string;
  created_at: Date;
}

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
