import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../lib/api';

export const ManageReservationsPage: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    loadData();
  }, [isAdmin]);

  const loadData = async () => {
    try {
      const [resData, payData] = await Promise.all([
        adminAPI.getReservations(),
        adminAPI.getPayments(),
      ]);
      setReservations(resData.data.reservations || []);
      setPayments(payData.data.payments || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReservations = reservations.filter((res: any) => {
    if (filter === 'all') return true;
    return res.status === filter;
  });

  const getPaymentForReservation = (reservationId: number) => {
    return payments.find((p: any) => p.reservation_id === reservationId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Manage Reservations & Payments</h1>
              <p className="text-gray-400 text-sm mt-1">View and manage all customer reservations</p>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">Total Reservations</h3>
            <p className="text-2xl font-bold text-white">{reservations.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-green-700/50">
            <h3 className="text-gray-400 text-sm">Paid</h3>
            <p className="text-2xl font-bold text-green-400">
              {reservations.filter((r: any) => r.status === 'paid').length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-yellow-700/50">
            <h3 className="text-gray-400 text-sm">Pending</h3>
            <p className="text-2xl font-bold text-yellow-400">
              {reservations.filter((r: any) => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-purple-700/50">
            <h3 className="text-gray-400 text-sm">Total Revenue</h3>
            <p className="text-2xl font-bold text-purple-400">
              ${payments.reduce((sum: number, p: any) => sum + (p.amount_usdt || 0), 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded transition-colors ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All ({reservations.length})
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded transition-colors ${
                filter === 'paid' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Paid ({reservations.filter((r: any) => r.status === 'paid').length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded transition-colors ${
                filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Pending ({reservations.filter((r: any) => r.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded transition-colors ${
                filter === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Confirmed ({reservations.filter((r: any) => r.status === 'confirmed').length})
            </button>
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.length > 0 ? (
            filteredReservations.map((res: any) => {
              const payment = getPaymentForReservation(res.id);
              return (
                <div key={res.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{res.collection_name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            res.status === 'paid' ? 'bg-green-900 text-green-200' :
                            res.status === 'confirmed' ? 'bg-blue-900 text-blue-200' :
                            'bg-yellow-900 text-yellow-200'
                          }`}>
                            {res.status === 'paid' ? '✓ Paid' :
                             res.status === 'confirmed' ? '✓ Confirmed' :
                             '⏳ Pending'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Customer:</span>
                            <p className="text-white font-medium">{res.user_name}</p>
                            <p className="text-gray-400 text-xs">{res.user_email}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Piece Number:</span>
                            <p className="text-white font-medium">#{res.piece_number}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Reserved Date:</span>
                            <p className="text-white font-medium">
                              {new Date(res.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {new Date(res.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Reservation ID:</span>
                            <p className="text-white font-mono text-xs">#{res.id}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    {payment && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                          </svg>
                          Payment Information
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Amount:</span>
                            <p className="text-white font-bold text-lg">${payment.amount_usdt}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Currency:</span>
                            <p className="text-white font-medium uppercase">{payment.currency}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Payment Status:</span>
                            <p className={`font-medium ${
                              payment.status === 'finished' || payment.status === 'confirmed' ? 'text-green-400' :
                              payment.status === 'waiting' || payment.status === 'confirming' ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {payment.status === 'finished' ? 'Completed ✓' :
                               payment.status === 'confirmed' ? 'Confirmed ✓' :
                               payment.status === 'waiting' ? 'Awaiting Payment' :
                               payment.status === 'confirming' ? 'Confirming...' :
                               payment.status}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Order ID:</span>
                            <p className="text-white font-mono text-xs break-all">{payment.order_id}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Payment ID:</span>
                            <p className="text-white font-mono text-xs break-all">{payment.payment_id || 'N/A'}</p>
                          </div>
                        </div>
                        {payment.txid && (
                          <div className="mt-3">
                            <span className="text-gray-500 text-sm">Transaction Hash:</span>
                            <p className="text-white font-mono text-xs break-all bg-gray-900 p-2 rounded mt-1">
                              {payment.txid}
                            </p>
                          </div>
                        )}
                        {payment.payment_url && (
                          <div className="mt-3">
                            <a
                              href={payment.payment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                            >
                              View Payment Page →
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {!payment && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-yellow-400 text-sm">⚠️ No payment record found for this reservation</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
              <p className="text-gray-400 text-lg">No reservations found for this filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
