import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { databaseClients } from '@/api/databaseClient';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        // const user = await base44.auth.me();
        // [ ] Sort user logic and get current user here. For now just getting me manually
        const user = await databaseClients.User.me(); // Fetch current user
        const role = user?.custom_role || user?.role;

        // Redirect based on role
        if (role === 'Processor') {
          navigate(createPageUrl('ClaimForm'));
        } else if (role === 'Admin Manager') {
          navigate(createPageUrl('Dashboard'));
        } else if (role === 'Admin') {
          navigate(createPageUrl('Dashboard'));
        } else if (role === 'Service Manager') {
          navigate(createPageUrl('Dashboard'));
        } else if (role === 'Owner') {
          navigate(createPageUrl('Dashboard'));
        } else {
          // Default to ClaimForm for unknown roles
          navigate(createPageUrl('ClaimForm'));
        }
      } catch (error) {
        // If not authenticated, redirect to ClaimForm
        navigate(createPageUrl('ClaimForm'));
      }
    };

    redirectUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}