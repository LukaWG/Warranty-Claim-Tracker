import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';
import ClaimFormCard from '@/components/claims/ClaimFormCard';
import HendyLogo from '@/components/layout/HendyLogo';
import { databaseClients } from '@/api/databaseClient';
import { currentUser } from '@/api/currentUser';

// Redirect if user not logged in
import { auth } from "@/lib/auth"
// import { GetServerSideProps } from "next"

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth.api.getSession({
    headers: new Headers(req.headers),
  })

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } }
  }

  return { props: {} }
}

export default function ClaimForm() {
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const user = await currentUser.me();
        const role = user?.custom_role || user?.role;
        if (!['Location', 'Administrator', 'Group Manager', 'Owner'].includes(role)) {
          router.replace(createPageUrl('Dashboard'));
        }
      } catch (error) {
        // If not authenticated, allow claim form for public access
      }
    };
    checkAccess();
  }, [router]);

  const createMutation = useMutation({
    mutationFn: (data) => databaseClients.WarrantyClaim.create(data)
  });

  const handleSubmit = async (formData) => {
    const claim = await createMutation.mutateAsync(formData);
    await databaseClients.ClaimAudit.create({
      claim_id: claim.id,
      wip_number: claim.wip_number,
      field_changed: 'created',
      old_value: '',
      new_value: claim.status || 'in_progress',
      change_type: 'created'
    });
    if (claim.is_campaign) {
      const noteContent = `Safety Recall / Service Campaign${claim.campaign_reference ? `: ${claim.campaign_reference}` : ''}`;
      await databaseClients.ClaimNote.create({
        claim_id: claim.id,
        content: noteContent,
      });
    }

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