import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export function useClaims(options = {}) {
  return useQuery({
    queryKey: ['claims'],
    queryFn: () => databaseClients.WarrantyClaim.get(),
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    ...options,
  });
}
