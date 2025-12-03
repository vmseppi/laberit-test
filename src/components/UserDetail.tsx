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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', job: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleEdit = () => {
    if (user) {
      setEditData({
        name: `${user.first_name} ${user.last_name}`,
        job: '',
      });
      setIsEditing(true);
      setSuccess(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ name: '', job: '' });
    setError(null);
  };

  const handleSave = async () => {
    if (!id || !editData.name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await api.updateUser(parseInt(id), {
        name: editData.name,
        job: editData.job || undefined,
      });
      
      // Update local state with new data since ReqRes doesn't persist changes
      if (user) {
        const nameParts = editData.name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        setUser({
          ...user,
          first_name: firstName,
          last_name: lastName,
        });
      }
      
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Error updating user');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
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
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={handleBack}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            ← Volver a la lista
          </button>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              ✏️ Editar Usuario
            </button>
          )}
        </div>

        {success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
            Usuario actualizado exitosamente!
          </div>
        )}

        {error && !isEditing && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

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

          {isEditing ? (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Editar Usuario</h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-800 bg-white"
                  placeholder="Nombre completo"
                />
              </div>

              <div>
                <label htmlFor="job" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Trabajo
                </label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  value={editData.job}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-800 bg-white"
                  placeholder="Trabajo"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-200 hover:bg-white-300 text-black font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition-colors text-sm sm:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !editData.name.trim()}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition-colors text-sm sm:text-base"
                >
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

