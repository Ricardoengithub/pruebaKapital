import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCitySearch } from './useCitySearch';
import { vi } from 'vitest';
import type { Mock } from 'vitest';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCitySearch', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch cities successfully', async () => {
    const mockCities = [{ name: 'London', country: 'GB', lat: 51.5, lon: -0.1 }];
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCities,
    });

    const { result } = renderHook(() => useCitySearch('London'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockCities);
  });

  it('should not fetch if query is empty', async () => {
    const { result } = renderHook(() => useCitySearch(''), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.fetchStatus).toBe('idle');
    });

    expect(fetch).not.toHaveBeenCalled();
  });
});
