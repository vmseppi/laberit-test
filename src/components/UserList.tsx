import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { User } from '../types';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getUsers(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError('Error loading users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const handleCreateUser = () => {
    navigate('/user/create');
  };

  const handleSort = () => {
    const sorted = [...users].sort((a, b) => 
      `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
    );
    setUsers(sorted);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-4 w-full">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 w-full sm:w-auto">Lista de Usuarios</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={handleSort}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Ordenar por Nombre
            </button>
            <button
              onClick={handleCreateUser}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              + Crear Usuario
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-4 sm:p-6 w-full"
            >
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-3 sm:mb-4 border-4 border-indigo-200"
                />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm mt-2 text-center break-words">{user.email}</p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Anterior
            </button>
            <span className="text-gray-700 font-semibold text-sm sm:text-base">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

