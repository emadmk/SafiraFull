import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { userAPI, collectionsAPI, reservationsAPI, paymentsAPI } from '../lib/api';

export const UserDashboard: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
      return;
    }
    loadData();
  }, [isAdmin]);

  const loadData = async () => {
    try {
      const [resData, payData, colData] = await Promise.all([
        userAPI.getReservations(),
        userAPI.getPayments(),
        collectionsAPI.getAll(true),
      ]);
      setReservations(resData.data.data);
      setPayments(payData.data.data);
      setCollections(colData.data.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{user?.full_name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-6 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Welcome {user?.full_name}!</h2>
          <p>Welcome to Persian Carpet Pre-sale Platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Reservations</h3>
            <p className="text-3xl font-bold text-purple-400">{reservations.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Payments</h3>
            <p className="text-3xl font-bold text-green-400">{payments.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Available Collections</h3>
            <p className="text-3xl font-bold text-blue-400">{collections.length}</p>
          </div>
        </div>

        {/* Reservations */}
        <div className="bg-gray-800 rounded-lg shadow-lg mb-8 border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">My Reservations</h3>
          </div>
          <div className="p-6">
            {reservations.length > 0 ? (
              <div className="space-y-4">
                {reservations.map((res: any) => (
                  <div key={res.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-750 bg-gray-800/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg text-white">{res.collection_name}</h4>
                        <p className="text-gray-400">Piece Number: {res.piece_number}</p>
                        <p className="text-sm text-gray-500">
                          Date: {new Date(res.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        res.status === 'paid' ? 'bg-green-900 text-green-200' :
                        res.status === 'confirmed' ? 'bg-blue-900 text-blue-200' :
                        'bg-yellow-900 text-yellow-200'
                      }`}>
                        {res.status === 'paid' ? 'Paid' :
                         res.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No reservations yet</p>
            )}
          </div>
        </div>

        {/* Available Collections */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Available Collections</h3>
          </div>
          <div className="p-6">
            {collections.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((col: any) => (
                  <div key={col.id} className="border border-gray-700 rounded-lg p-4 hover:shadow-xl transition-shadow bg-gray-800/50">
                    {col.image_url && (
                      <img
                        src={col.image_url}
                        alt={col.name}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                    )}
                    <h4 className="font-semibold text-lg mb-2 text-white">{col.name}</h4>
                    <p className="text-gray-400 text-sm mb-3">{col.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 font-bold">
                        {col.price_usdt} USDT
                      </span>
                      <span className="text-sm text-gray-400">
                        {col.available_pieces} available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No collections available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
