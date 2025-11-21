import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collectionsAPI, reservationsAPI, paymentsAPI } from '../lib/api';

interface Collection {
  id: number;
  name: string;
  description: string;
  total_pieces: number;
  sold_pieces: number;
  price_per_piece: number;
  available_pieces: number;
}

export const ReservationPage: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const collectionIdParam = searchParams.get('collection');

  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(
    collectionIdParam ? parseInt(collectionIdParam) : null
  );
  const [pieceNumber, setPieceNumber] = useState<number>(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      navigate('/login?redirect=/reserve');
      return;
    }
    loadCollections();
  }, [token]);

  const loadCollections = async () => {
    try {
      const response = await collectionsAPI.getAll(true);
      setCollections(response.data.data);
    } catch (err) {
      console.error('Failed to load collections:', err);
      setError('Failed to load collections');
    }
  };

  const getSelectedCollectionData = () => {
    return collections.find((c) => c.id === selectedCollection);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate
      if (!selectedCollection) {
        setError('Please select a collection');
        setLoading(false);
        return;
      }

      const collection = getSelectedCollectionData();
      if (!collection) {
        setError('Invalid collection selected');
        setLoading(false);
        return;
      }

      if (pieceNumber < 1 || pieceNumber > collection.total_pieces) {
        setError(`Piece number must be between 1 and ${collection.total_pieces}`);
        setLoading(false);
        return;
      }

      // Create reservation
      const reservationResponse = await reservationsAPI.create({
        collection_id: selectedCollection,
        piece_number: pieceNumber,
        delivery_address: deliveryAddress || undefined,
      });

      const reservation = reservationResponse.data.data;

      // Create payment
      const paymentResponse = await paymentsAPI.create({
        reservation_id: reservation.id,
        currency: 'usdttrc20', // Default to USDT TRC20
      });

      const payment = paymentResponse.data.data;

      // Redirect to payment URL
      if (payment.payment_url) {
        window.location.href = payment.payment_url;
      } else {
        setError('Payment URL not received. Please contact support.');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Reservation/Payment error:', err);
      setError(err.response?.data?.message || 'Failed to create reservation. Please try again.');
      setLoading(false);
    }
  };

  const selectedCollectionData = getSelectedCollectionData();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reserve Your Carpet</h1>
          <div className="flex items-center gap-4">
            {user ? (
              <span className="font-semibold">{user.full_name}</span>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 transition-colors"
              >
                Login
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-white">Make Your Reservation</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Collection Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Collection
              </label>
              <select
                value={selectedCollection || ''}
                onChange={(e) => setSelectedCollection(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Choose a collection...</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name} - ${collection.price_per_piece} ({collection.available_pieces} available)
                  </option>
                ))}
              </select>
            </div>

            {/* Collection Details */}
            {selectedCollectionData && (
              <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                <h3 className="font-semibold text-white mb-2">{selectedCollectionData.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{selectedCollectionData.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Price per piece:</span>
                    <p className="text-green-400 font-bold">${selectedCollectionData.price_per_piece}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Available:</span>
                    <p className="text-purple-400 font-bold">
                      {selectedCollectionData.available_pieces} / {selectedCollectionData.total_pieces}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Piece Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Piece Number
              </label>
              <input
                type="number"
                min="1"
                max={selectedCollectionData?.total_pieces || 100}
                value={pieceNumber}
                onChange={(e) => setPieceNumber(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Choose your specific piece number (1 to {selectedCollectionData?.total_pieces || 100})
              </p>
            </div>

            {/* Delivery Address (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Delivery Address (Optional)
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="You can add this later..."
              />
            </div>

            {/* Total Price */}
            {selectedCollectionData && (
              <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-400">
                    ${selectedCollectionData.price_per_piece} USD
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Payment will be processed via NOWPayments in cryptocurrency (USDT)
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              By continuing, you agree to our terms and conditions. Payment is secure and processed via NOWPayments.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
