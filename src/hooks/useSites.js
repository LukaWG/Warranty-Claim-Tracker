import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export function useSites(options = {}) {
  return useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      const data = await databaseClients.Site.get();
      return data.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    },
    ...options,
  });
}
