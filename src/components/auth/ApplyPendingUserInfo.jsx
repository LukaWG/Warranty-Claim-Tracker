import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';

export default function ApplyPendingUserInfo() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const applyPendingInfo = async () => {
      try {
        const user = await base44.auth.me();
        
        // Check if there's pending info for this user
        const pendingInvites = await base44.entities.PendingUserInvite.filter({ 
          email: user.email 
        });
        
        if (pendingInvites.length > 0) {
          const pendingInfo = pendingInvites[0];
          
          // Update user with pending information
          await base44.auth.updateMe({
            custom_role: pendingInfo.custom_role,
            first_name: pendingInfo.first_name,
            last_name: pendingInfo.last_name,
            ...(pendingInfo.default_site ? { default_site: pendingInfo.default_site } : {})
          });
          
          // Delete the pending invite
          await base44.entities.PendingUserInvite.delete(pendingInfo.id);
          
          console.log('Applied pending user info and refreshing...');
          
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
  }, [queryClient]);

  return null;
}