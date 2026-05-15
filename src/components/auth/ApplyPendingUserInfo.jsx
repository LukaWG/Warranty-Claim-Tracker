import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { databaseClients } from '@/api/databaseClient';
import { useQueryClient } from '@tanstack/react-query';

export default function ApplyPendingUserInfo() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const applyPendingInfo = async () => {
      if (!user?.email) return;

      try {
        // Check if there's pending info for this user
        const pendingInvites = await databaseClients.PendingUserInvite.query('*', `email=${user.email}`);

        if (pendingInvites.length > 0) {
          const pendingInfo = pendingInvites[0];

          // In a real app, you might update the user data here
          // For now, since we have static user data, we'll just log this
          console.log('Found pending user invite:', pendingInfo);

          // Delete the pending invite (in a real app with persistent storage)
          // await databaseClients.PendingUserInvite.delete(pendingInfo.id);

          // Invalidate queries to refresh user data
          queryClient.invalidateQueries({ queryKey: ['currentUser'] });
          queryClient.invalidateQueries({ queryKey: ['users'] });

          // Reload page to ensure all data is fresh
          window.location.reload();
        }
      } catch (error) {
        console.error('Error applying pending user info:', error);
      }
    };

    applyPendingInfo();
  }, [user, queryClient]);

  return null;
}