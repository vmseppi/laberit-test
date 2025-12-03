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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          ← Volver a la lista
        </button>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-32 h-32 rounded-full mb-6 border-4 border-indigo-200"
            />
            <h1 className="text-3xl font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </h1>
          </div>

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">ID</label>
              <p className="text-lg text-gray-800 mt-1">{user.id}</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">Nombre</label>
              <p className="text-lg text-gray-800 mt-1">{user.first_name}</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">Apellido</label>
              <p className="text-lg text-gray-800 mt-1">{user.last_name}</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">Email</label>
              <p className="text-lg text-gray-800 mt-1">{user.email}</p>
            </div>

            <div className="pt-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">Avatar</label>
              <div className="mt-2">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-lg border-2 border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

