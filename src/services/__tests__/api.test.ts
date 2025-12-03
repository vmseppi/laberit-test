import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../api';

// Mock global fetch
global.fetch = vi.fn();

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call getUsers with correct URL', async () => {
    const mockResponse = {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [],
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await api.getUsers(1);

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/users?page=1',
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-api-key': expect.anything(),
        }),
      })
    );
  });

  it('should throw error when getUsers fails', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => 'Not found',
    });

    await expect(api.getUsers(1)).rejects.toThrow('Error fetching users');
  });
});

