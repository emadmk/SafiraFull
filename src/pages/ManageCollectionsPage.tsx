import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { adminAPI, collectionsAPI } from '../lib/api';

interface Collection {
  id: number;
  name: string;
  description: string;
  total_pieces: number;
  sold_pieces: number;
  price_usdt: number;
  is_active: boolean;
  available_pieces: number;
  created_at: string;
}

export const ManageCollectionsPage: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    total_pieces: 100,
    price_usdt: 100,
    is_active: true,
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    loadCollections();
  }, [isAdmin]);

  const loadCollections = async () => {
    try {
      const response = await collectionsAPI.getAll(false); // Get all including inactive
      setCollections(response.data.data);
    } catch (error) {
      console.error('Failed to load collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminAPI.updateCollection(editingId, formData);
      } else {
        await adminAPI.createCollection(formData);
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      loadCollections();
    } catch (error) {
      console.error('Failed to save collection:', error);
      alert('Failed to save collection');
    }
  };

  const handleEdit = (collection: Collection) => {
    setFormData({
      name: collection.name,
      description: collection.description,
      total_pieces: collection.total_pieces,
      price_usdt: collection.price_usdt,
      is_active: collection.is_active,
    });
    setEditingId(collection.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    try {
      await adminAPI.deleteCollection(id);
      loadCollections();
    } catch (error) {
      console.error('Failed to delete collection:', error);
      alert('Failed to delete collection');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      total_pieces: 100,
      price_usdt: 100,
      is_active: true,
    });
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
          <h1 className="text-2xl font-bold">Manage Collections</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Back to Admin
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              resetForm();
              setEditingId(null);
              setShowForm(!showForm);
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            {showForm ? 'Cancel' : '+ Add New Collection'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Collection' : 'Add New Collection'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price per Piece (USDT)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.price_usdt}
                    onChange={(e) =>
                      setFormData({ ...formData, price_usdt: parseFloat(e.target.value) })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Pieces
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.total_pieces}
                    onChange={(e) =>
                      setFormData({ ...formData, total_pieces: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-3 text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span>Active (visible to users)</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  {editingId ? 'Update' : 'Create'} Collection
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Collections List */}
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">All Collections</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pieces
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {collections.map((collection) => (
                  <tr key={collection.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{collection.name}</div>
                      <div className="text-xs text-gray-400">{collection.description.substring(0, 50)}...</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-green-400">${collection.price_usdt}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{collection.total_pieces}</td>
                    <td className="px-6 py-4 text-sm text-purple-400">{collection.available_pieces}</td>
                    <td className="px-6 py-4">
                      {collection.is_active ? (
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(collection)}
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(collection.id)}
                        className="text-red-400 hover:text-red-300 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
