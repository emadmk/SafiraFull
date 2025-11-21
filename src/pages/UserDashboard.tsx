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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">پنل کاربری</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.full_name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              خروج
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">خوش آمدید {user?.full_name}!</h2>
          <p>به پنل کاربری سیستم پیش‌فروش فرش‌های لوکس کرمان خوش آمدید.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">رزروها</h3>
            <p className="text-3xl font-bold text-purple-600">{reservations.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">پرداخت‌ها</h3>
            <p className="text-3xl font-bold text-green-600">{payments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">کالکشن‌های موجود</h3>
            <p className="text-3xl font-bold text-blue-600">{collections.length}</p>
          </div>
        </div>

        {/* Reservations */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-bold text-gray-800">رزروهای من</h3>
          </div>
          <div className="p-6">
            {reservations.length > 0 ? (
              <div className="space-y-4">
                {reservations.map((res: any) => (
                  <div key={res.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{res.collection_name}</h4>
                        <p className="text-gray-600">قطعه شماره: {res.piece_number}</p>
                        <p className="text-sm text-gray-500">
                          تاریخ: {new Date(res.created_at).toLocaleDateString('fa-IR')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        res.status === 'paid' ? 'bg-green-100 text-green-800' :
                        res.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {res.status === 'paid' ? 'پرداخت شده' :
                         res.status === 'confirmed' ? 'تایید شده' : 'در انتظار'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">هنوز رزروی ندارید</p>
            )}
          </div>
        </div>

        {/* Available Collections */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-bold text-gray-800">کالکشن‌های موجود</h3>
          </div>
          <div className="p-6">
            {collections.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((col: any) => (
                  <div key={col.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    {col.image_url && (
                      <img
                        src={col.image_url}
                        alt={col.name}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                    )}
                    <h4 className="font-semibold text-lg mb-2">{col.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{col.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-bold">
                        {col.price_usdt} USDT
                      </span>
                      <span className="text-sm text-gray-500">
                        {col.available_pieces} موجود
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">در حال حاضر کالکشنی موجود نیست</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
