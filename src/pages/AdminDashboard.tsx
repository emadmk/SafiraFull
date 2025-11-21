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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="font-semibold">{user?.full_name}</span>
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
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-2 text-white">Welcome Admin!</h2>
          <p className="text-gray-300">Persian Carpet Pre-sale Management Dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-400">{dashboard?.users?.total || 0}</p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Total Collections</h3>
            <p className="text-3xl font-bold text-purple-400">{dashboard?.collections?.total || 0}</p>
            <p className="text-sm text-gray-500 mt-1">
              Active: {dashboard?.collections?.active || 0}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Sold Pieces</h3>
            <p className="text-3xl font-bold text-green-400">{dashboard?.pieces?.sold || 0}</p>
            <p className="text-sm text-gray-500 mt-1">
              Available: {dashboard?.pieces?.available || 0}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Total Revenue (USDT)</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {dashboard?.payments?.totalRevenue?.toFixed(2) || 0}
            </p>
          </div>
        </div>

        {/* Reservations & Payments Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white">Reservations Stats</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {Object.entries(dashboard?.reservations?.byStatus || {}).map(([status, count]: any) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-gray-300 capitalize">{status}</span>
                    <span className="font-semibold text-lg text-gray-200">{count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-300">Total Reservations:</span>
                  <span className="text-xl text-indigo-400">{dashboard?.reservations?.total || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white">Payments Stats</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {Object.entries(dashboard?.payments?.byStatus || {}).map(([status, count]: any) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-gray-300 capitalize">{status}</span>
                    <span className="font-semibold text-lg text-gray-200">{count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-300">Total Payments:</span>
                  <span className="text-xl text-green-400">{dashboard?.payments?.total || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">Quick Actions</h3>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-4">
            <button className="p-4 bg-indigo-900/30 border border-indigo-700/50 rounded-lg hover:bg-indigo-900/50 transition-colors text-left">
              <h4 className="font-semibold text-indigo-300 mb-1">Manage Collections</h4>
              <p className="text-sm text-gray-400">Add and edit carpet collections</p>
            </button>
            <button className="p-4 bg-purple-900/30 border border-purple-700/50 rounded-lg hover:bg-purple-900/50 transition-colors text-left">
              <h4 className="font-semibold text-purple-300 mb-1">View Users</h4>
              <p className="text-sm text-gray-400">List of all registered users</p>
            </button>
            <button className="p-4 bg-green-900/30 border border-green-700/50 rounded-lg hover:bg-green-900/50 transition-colors text-left">
              <h4 className="font-semibold text-green-300 mb-1">Settings</h4>
              <p className="text-sm text-gray-400">Manage system settings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
