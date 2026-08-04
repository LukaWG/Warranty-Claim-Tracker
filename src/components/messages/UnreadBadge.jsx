import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function UnreadBadge({ currentUser }) {
  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdmin = ['Group Manager', 'Owner'].includes(userRole);
  const userSite = currentUser?.default_site;

  const { data: messages = [] } = useQuery({
    queryKey: ['messages-unread', currentUser?.email],
    queryFn: () => databaseClients.Message.get(),
    enabled: !!currentUser?.email,
    refetchInterval: 30000
  });

  // Only count root messages (not replies) - same logic as Messages page
  const rootMessages = messages.filter(m => !m.is_reply);

  const unreadCount = rootMessages.filter(m => {
    if (m.sender_email === currentUser?.email) return false;
    // Location users only see their site. Administrators are restricted to their assigned locations
    if (['Location', 'Administrator'].includes(userRole) && currentUser?.default_sites?.length > 0) {
      if (!currentUser.default_sites.includes(m.target_site)) return false;
    }
    // Shared read state: a thread is unread if any message hasn't been read (by anyone)
    const threadMessages = messages.filter(tm => tm.id === m.id || tm.parent_message_id === m.id)
    return threadMessages.some(tm => tm.sender_email !== currentUser?.email && !tm.read);
  }).length;

  if (unreadCount === 0) return null;

  return (
    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full text-white text-xs font-bold px-1" style={{backgroundColor: 'var(--hendy-teal)'}}>
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  );
}