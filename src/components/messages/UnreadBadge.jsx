import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function UnreadBadge({ currentUser }) {
  const userRole = currentUser?.custom_role || currentUser?.role;
  const isAdmin = ['Group Manager', 'Service Manager', 'Owner', 'Administrator'].includes(userRole);
  const userSite = currentUser?.default_site;

  const { data: messages = [] } = useQuery({
    queryKey: ['messages-unread', currentUser?.email],
    queryFn: () => databaseClients.Message.get(),
    enabled: !!currentUser?.email,
    refetchInterval: 30000
  });

  const { data: readReceipts = [] } = useQuery({
    queryKey: ['message-reads', currentUser?.email],
    queryFn: () => databaseClients.MessageRead.filter({ reader_email: currentUser.email }),
    enabled: !!currentUser?.email,
    refetchInterval: 30000
  });

  const readIds = new Set(readReceipts.map(r => r.message_id));

  // Only count root messages (not replies) - same logic as Messages page
  const rootMessages = messages.filter(m => !m.is_reply);

  const unreadCount = rootMessages.filter(m => {
    if (m.sender_email === currentUser?.email) return false;
    // Admins see all messages; site users only see their site
    if (!isAdmin && m.target_site !== userSite) return false;
    // Check if the whole thread has any unread message
    const threadMessages = messages.filter(tm => tm.id === m.id || tm.parent_message_id === m.id)
    return threadMessages.some(tm => tm.sender_email !== currentUser?.email && !readIds.has(tm.id));
  }).length;

  if (unreadCount === 0) return null;

  return (
    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full text-white text-xs font-bold px-1" style={{backgroundColor: 'var(--hendy-teal)'}}>
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  );
}