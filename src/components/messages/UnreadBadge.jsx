import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function UnreadBadge({ currentUser }) {
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

  const userSite = currentUser?.default_site;
  const readIds = new Set(readReceipts.map(r => r.message_id));

  // Count messages for this user's site that are unread and not sent by them
  const unreadCount = messages.filter(m =>
    m.target_site === userSite &&
    m.sender_email !== currentUser?.email &&
    !readIds.has(m.id)
  ).length;

  if (unreadCount === 0) return null;

  return (
    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold px-1">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  );
}