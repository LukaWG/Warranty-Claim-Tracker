import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, AlertCircle, Settings, Tag, Users } from 'lucide-react';
import SitesTab from '@/components/configuration/SitesTab';
import BrandsTab from '@/components/configuration/BrandsTab';
import AlertsTab from '@/components/configuration/AlertsTab';
import ResolutionsTab from '@/components/configuration/ResolutionsTab';
import UsersTab from '@/components/configuration/UsersTab';

// Redirect if user not logged in
import { auth } from "@/lib/auth"

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth.api.getSession({
	headers: new Headers(req.headers),
  })

  if (!session) {
	return { redirect: { destination: "/login", permanent: false } }
  }

  // Only Owner and Group Manager may access Configuration
  if (!["Owner", "Group Manager"].includes(session.user.customRole)) {
	return { redirect: { destination: "/", permanent: false } }
  }

  return { props: {} }
}

export default function Configuration() {
	return (
	<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
		<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
		<div className="mb-10">
			<div className="flex items-center gap-3 mb-2">
			<div className="h-10 w-10 rounded-lg flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--hendy-blue)' }}>
				<Settings className="h-5 w-5 text-white" />
			</div>
			<h1 className="text-3xl md:text-4xl font-bold text-slate-800">
				Configuration
			</h1>
			</div>
			<p className="text-slate-500">
			Manage locations and alerts for warranty claims
			</p>
		</div>

		<Tabs defaultValue="sites" className="w-full">
			<TabsList className="grid w-full grid-cols-5 mb-8">
			<TabsTrigger value="sites" className="flex items-center gap-2">
				<MapPin className="h-4 w-4" />
				Locations
			</TabsTrigger>
			<TabsTrigger value="brands" className="flex items-center gap-2">
				<Tag className="h-4 w-4" />
				Brands
			</TabsTrigger>
			<TabsTrigger value="alerts" className="flex items-center gap-2">
				<AlertCircle className="h-4 w-4" />
				Alerts
			</TabsTrigger>
			<TabsTrigger value="resolutions" className="flex items-center gap-2">
				<AlertCircle className="h-4 w-4" />
				Resolutions
			</TabsTrigger>
			<TabsTrigger value="users" className="flex items-center gap-2">
				<Users className="h-4 w-4" />
				Users
			</TabsTrigger>
			</TabsList>

			<TabsContent value="sites">
			<SitesTab />
			</TabsContent>

			<TabsContent value="brands">
			<BrandsTab />
			</TabsContent>

			<TabsContent value="alerts">
			<AlertsTab />
			</TabsContent>

			<TabsContent value="resolutions">
			<ResolutionsTab />
			</TabsContent>

			<TabsContent value="users">
			<UsersTab />
			</TabsContent>
		</Tabs>
		</div>
	</div>
	);
}
