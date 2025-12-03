import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { User } from '../types';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchUser(parseInt(id));
    }
  }, [id]);

  const fetchUser = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getUser(userId);
      setUser(response.data);
    } catch (err) {
      setError('Error loading user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading user...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error || 'User not found'}</div>
          <button
            onClick={handleBack}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-4 w-full">
      <div className="max-w-2xl mx-auto w-full">
        <button
          onClick={handleBack}
          className="mb-4 sm:mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          ← Volver a la lista
        </button>

        <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 w-full">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 sm:mb-6 border-4 border-indigo-200"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
              {user.first_name} {user.last_name}
            </h1>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="border-b border-gray-200 pb-3 sm:pb-4">
              <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">ID</label>
              <p className="text-base sm:text-lg text-gray-800 mt-1 break-words">{user.id}</p>
            </div>

            <div className="border-b border-gray-200 pb-3 sm:pb-4">
              <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Nombre</label>
              <p className="text-base sm:text-lg text-gray-800 mt-1 break-words">{user.first_name}</p>
            </div>

            <div className="border-b border-gray-200 pb-3 sm:pb-4">
              <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Apellido</label>
              <p className="text-base sm:text-lg text-gray-800 mt-1 break-words">{user.last_name}</p>
            </div>

            <div className="border-b border-gray-200 pb-3 sm:pb-4">
              <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Email</label>
              <p className="text-base sm:text-lg text-gray-800 mt-1 break-words">{user.email}</p>
            </div>

            <div className="pt-3 sm:pt-4">
              <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Avatar</label>
              <div className="mt-2">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border-2 border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

