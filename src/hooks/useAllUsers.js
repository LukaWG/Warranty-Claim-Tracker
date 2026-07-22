import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export function useAllUsers(options = {}) {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: () => databaseClients.User.get(),
    ...options,
  });
}
