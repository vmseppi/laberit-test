import type { User, CreateUserRequest, CreateUserResponse, UsersResponse, UpdateUserRequest, UpdateUserResponse } from '../types';

const BASE_URL = '/api'; 
const API_KEY = import.meta.env.VITE_REQRES_API_KEY; 

export const api = {
  // Get users list with pagination
  getUsers: async (page: number = 1): Promise<UsersResponse> => {
    const response = await fetch(`${BASE_URL}/users?page=${page}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error fetching users', response.status, text);
      throw new Error('Error fetching users');
    }

    return response.json();
  },

  // Get a user by ID
  getUser: async (id: number): Promise<{ data: User }> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error fetching user', response.status, text);
      throw new Error('Error fetching user');
    }

    return response.json();
  },

  // Create a new user
  createUser: async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error creating user', response.status, text);
      throw new Error('Error creating user');
    }

    return response.json();
  },

  // Update a user (PUT)
  updateUser: async (id: number, userData: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error updating user', response.status, text);
      throw new Error('Error updating user');
    }

    return response.json();
  },

  // Update a user (PATCH)
  patchUser: async (id: number, userData: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error patching user', response.status, text);
      throw new Error('Error patching user');
    }

    return response.json();
  },

  // Delete a user
  deleteUser: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error deleting user', response.status, text);
      throw new Error('Error deleting user');
    }
  },
};
