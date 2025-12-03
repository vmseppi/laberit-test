import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    job: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.createUser(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Error creating user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            Crear Nuevo Usuario
          </h1>

          {success && (
            <div className="mb-4 sm:mb-6 bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
              User created successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="mb-4 sm:mb-6 bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-800 bg-white"
                placeholder="Ingresa el nombre"
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
                value={formData.job}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm sm:text-base text-gray-800 bg-white"
                placeholder="Ingresa el trabajo"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition-colors text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition-colors text-sm sm:text-base"
              >
                {loading ? 'Creando...' : 'Crear Usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

