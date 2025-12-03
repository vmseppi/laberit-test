import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserList from '../UserList';
import { api } from '../../services/api';

// Mock the API
vi.mock('../../services/api');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the title "Lista de Usuarios"', async () => {
    // Mock API response
    (api.getUsers as any).mockResolvedValueOnce({
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [],
    });

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    // Wait for loading to finish and check title
    const title = await screen.findByText('Lista de Usuarios');
    expect(title).toBeInTheDocument();
  });

  it('should show loading skeleton initially', () => {
    (api.getUsers as any).mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    // Check for skeleton elements (gray background divs)
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});

