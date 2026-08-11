import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export function useBrands(options = {}) {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const data = await databaseClients.Brand.get();
      return data.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    },
    ...options,
  });
}
