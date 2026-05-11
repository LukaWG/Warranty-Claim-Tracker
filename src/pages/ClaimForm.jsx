import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';
import ClaimFormCard from '@/components/claims/ClaimFormCard';
import HendyLogo from '@/components/layout/HendyLogo';
import { databaseClients } from '@/api/databaseClient';

export default function ClaimForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // [ ] Sort user logic and get current user here. For now just getting me manually
        const user = await databaseClients.User.me(); // Fetch current user
        const role = user?.custom_role || user?.role;
        if (role !== 'Processor' && role !== 'Site Manager' && role !== 'Service Manager' && role !== 'Owner' && role !== 'admin') {
          navigate(createPageUrl('Dashboard'));
        }
      } catch (error) {
        // If not authenticated, allow claim form for public access
      }
    };
    checkAccess();
  }, [navigate]);

  const createMutation = useMutation({
    mutationFn: (data) => databaseClients.clients['WarrantyClaim'].create(data)
  });

  const handleSubmit = async (formData) => {
    await createMutation.mutateAsync(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex mb-6">
            <HendyLogo size={64} variant="icon" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Warranty Repairs
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Submit a new warranty repair by filling out the form below
          </p>
        </div>

        <ClaimFormCard
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}