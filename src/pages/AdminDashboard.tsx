import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../lib/api';

export const AdminDashboard: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    loadDashboard();
  }, [isAdmin]);

  const loadDashboard = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setDashboard(response.data.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">پنل مدیریت</h1>
          <div className="flex items-center gap-4">
            <span className="font-semibold">{user?.full_name}</span>
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
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">خوش آمدید مدیر عزیز!</h2>
          <p className="text-gray-600">داشبورد مدیریت سیستم پیش‌فروش فرش‌های کرمان</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">کل کاربران</h3>
            <p className="text-3xl font-bold text-indigo-600">{dashboard?.users?.total || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">کل کالکشن‌ها</h3>
            <p className="text-3xl font-bold text-purple-600">{dashboard?.collections?.total || 0}</p>
            <p className="text-sm text-gray-500 mt-1">
              فعال: {dashboard?.collections?.active || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">قطعات فروخته شده</h3>
            <p className="text-3xl font-bold text-green-600">{dashboard?.pieces?.sold || 0}</p>
            <p className="text-sm text-gray-500 mt-1">
              موجود: {dashboard?.pieces?.available || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">کل درآمد (USDT)</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {dashboard?.payments?.totalRevenue?.toFixed(2) || 0}
            </p>
          </div>
        </div>

        {/* Reservations Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">آمار رزروها</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {Object.entries(dashboard?.reservations?.byStatus || {}).map(([status, count]: any) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{status}</span>
                    <span className="font-semibold text-lg">{count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center font-bold">
                  <span>مجموع رزروها:</span>
                  <span className="text-xl text-indigo-600">{dashboard?.reservations?.total || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">آمار پرداخت‌ها</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {Object.entries(dashboard?.payments?.byStatus || {}).map(([status, count]: any) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{status}</span>
                    <span className="font-semibold text-lg">{count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center font-bold">
                  <span>مجموع پرداخت‌ها:</span>
                  <span className="text-xl text-green-600">{dashboard?.payments?.total || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-bold text-gray-800">عملیات سریع</h3>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-4">
            <button className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors text-left">
              <h4 className="font-semibold text-indigo-700 mb-1">مدیریت کالکشن‌ها</h4>
              <p className="text-sm text-gray-600">افزودن و ویرایش کالکشن‌های جدید</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <h4 className="font-semibold text-purple-700 mb-1">مشاهده کاربران</h4>
              <p className="text-sm text-gray-600">لیست تمام کاربران ثبت نام شده</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
              <h4 className="font-semibold text-green-700 mb-1">تنظیمات</h4>
              <p className="text-sm text-gray-600">مدیریت تنظیمات سیستم</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
