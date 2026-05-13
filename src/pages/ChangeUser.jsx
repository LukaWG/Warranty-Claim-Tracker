import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

export default function ChangeUser() {
  const [selectedUserId, setSelectedUserId] = useState(() => databaseClients.User.getActingUserId());

  useEffect(() => {
    const handleUserChanged = () => {
      setSelectedUserId(databaseClients.User.getActingUserId());
    };

    window.addEventListener('acting-user-changed', handleUserChanged);
    return () => window.removeEventListener('acting-user-changed', handleUserChanged);
  }, []);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['userList'],
    queryFn: () => databaseClients.User.query('*'),
    staleTime: 30000,
  });

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const handleSelect = (userId) => {
    databaseClients.User.setTestingUser(userId);
    setSelectedUserId(userId);
  };

  const handleClearSelection = () => {
    databaseClients.User.clearTestingUser();
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Change Test User</h1>
            <p className="mt-2 text-sm text-slate-600">
              Select a registered user to act as for testing. This overrides the current user returned by `User.me()`.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={createPageUrl('Home')}>
              <Button variant="outline">Back home</Button>
            </Link>
            <Button variant="secondary" onClick={handleClearSelection}>
              Clear selection
            </Button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-medium text-slate-900">Selected acting user</div>
            {selectedUser ? (
              <div className="mt-2 space-y-1">
                <div><strong>Email:</strong> {selectedUser.email}</div>
                <div><strong>Name:</strong> {selectedUser.full_name || `${selectedUser.first_name || ''} ${selectedUser.last_name || ''}`.trim() || 'N/A'}</div>
                <div><strong>Role:</strong> {selectedUser.role || 'N/A'}</div>
                <div><strong>Custom role:</strong> {selectedUser.custom_role || 'None'}</div>
              </div>
            ) : (
              <div className="mt-2 text-slate-500">No test user selected.</div>
            )}
          </div>

          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Registered users</h2>
            <div className="text-sm text-slate-500">Total users: {users.length}</div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-slate-500">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No users found.
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Role</th>
                    <th className="px-4 py-3 text-left font-medium">Custom role</th>
                    <th className="px-4 py-3 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id} className={user.id === selectedUserId ? 'bg-slate-50' : ''}>
                      <td className="px-4 py-4 text-slate-700">{user.email}</td>
                      <td className="px-4 py-4 text-slate-700">{user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}</td>
                      <td className="px-4 py-4 text-slate-700">{user.role || 'N/A'}</td>
                      <td className="px-4 py-4 text-slate-700">{user.custom_role || 'None'}</td>
                      <td className="px-4 py-4">
                        <Button
                          size="sm"
                          variant={user.id === selectedUserId ? 'secondary' : 'outline'}
                          onClick={() => handleSelect(user.id)}
                        >
                          {user.id === selectedUserId ? 'Selected' : 'Act as'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
