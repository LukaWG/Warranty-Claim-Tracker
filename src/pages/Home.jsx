import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createPageUrl } from '@/utils';
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

  return { props: { user: session.user } }
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        const user = await currentUser.me();
        const role = user?.custom_role || user?.role;

        if (role === 'Location') {
          router.replace(createPageUrl('ClaimForm'));
        } else if (role === 'Group Manager') {
          router.replace(createPageUrl('Dashboard'));
        } else if (role === 'Administrator') {
          router.replace(createPageUrl('Dashboard'));
        } else if (role === 'Owner') {
          router.replace(createPageUrl('Dashboard'));
        } else {
          router.replace(createPageUrl('ClaimForm'));
        }
      } catch (error) {
        router.replace(createPageUrl('ClaimForm'));
      }
    };

    redirectUser();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}