import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, MapPin, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { databaseClients } from '@/api/databaseClient';
import { useSites } from '@/hooks/useSites';
import { useBrands } from '@/hooks/useBrands';
import { toast } from '@/components/ui/use-toast';

export default function SitesTab() {
	const queryClient = useQueryClient();
	const [newSite, setNewSite] = useState({ name: '', code: '' });
	const [editingSite, setEditingSite] = useState(null);
	const [deletingSite, setDeletingSite] = useState(null);

	const { data: sites = [], isLoading: sitesLoading } = useSites();
	const { data: brands = [] } = useBrands();

	const createSiteMutation = useMutation({
	mutationFn: (data) => databaseClients.Site.create(data),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ['sites'] });
		setNewSite({ name: '', code: '' });
	},
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to add location', description: error?.message || 'Please try again.' })
	});

	const updateSiteMutation = useMutation({
	mutationFn: ({ id, data }) => databaseClients.Site.update(id, data),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ['sites'] });
		setEditingSite(null);
	},
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to update location', description: error?.message || 'Please try again.' })
	});

	const deleteSiteMutation = useMutation({
	mutationFn: (id) => databaseClients.Site.delete(id),
	onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] }),
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to delete location', description: error?.message || 'Please try again.' })
	});

	const handleSiteSubmit = (e) => {
	e.preventDefault();
	if (newSite.name.trim()) {
		createSiteMutation.mutate({ name: newSite.name, code: newSite.code || null });
	}
	};

	return (
	<>
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<Card className="border-0 shadow-xl bg-white mb-8">
			<CardHeader className="border-b border-slate-100">
				<CardTitle className="flex items-center gap-2">
				<Plus className="h-5 w-5" />
				Add New Location
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<form onSubmit={handleSiteSubmit} className="flex gap-4">
				<div className="flex-1">
					<Label className="text-sm">Location Name *</Label>
					<Input
					placeholder="Enter location name"
					value={newSite.name}
					onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
					required
					className="mt-1"
					/>
				</div>
				<div className="flex-1">
					<Label className="text-sm">Location Code</Label>
					<Input
					placeholder="Enter location code (optional)"
					value={newSite.code}
					onChange={(e) => setNewSite({ ...newSite, code: e.target.value })}
					className="mt-1"
					/>
				</div>

				<div className="flex items-end">
					<Button
					type="submit"
					disabled={createSiteMutation.isPending}
					style={{ backgroundColor: 'var(--hendy-blue)' }}
					>
					<Plus className="h-4 w-4 mr-2" />
					Add Location
					</Button>
				</div>
				</form>
			</CardContent>
			</Card>
		</motion.div>

		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.1 }}
		>
			<Card className="border-0 shadow-xl bg-white">
			<CardHeader className="border-b border-slate-100">
				<CardTitle className="flex items-center gap-2">
				<MapPin className="h-5 w-5" />
				All Locations ({sites.length})
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				{sitesLoading ? (
				<div className="flex items-center justify-center py-16">
					<div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
				</div>
				) : sites.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
					<MapPin className="h-8 w-8 text-slate-400" />
					</div>
					<p className="text-slate-600 font-medium">No locations configured</p>
					<p className="text-sm text-slate-400 mt-1">Add your first location above</p>
				</div>
				) : (
				<Table>
					<TableHeader>
					<TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
						<TableHead className="font-semibold text-slate-600">Location Name</TableHead>
						<TableHead className="font-semibold text-slate-600">Location Code</TableHead>
						<TableHead className="font-semibold text-slate-600">Brand Rates</TableHead>
						<TableHead className="font-semibold text-slate-600">Created By</TableHead>
						<TableHead className="font-semibold text-slate-600 w-24">Actions</TableHead>
					</TableRow>
					</TableHeader>
					<TableBody>
					{sites.map((site) => (
						<TableRow key={site.id} className="hover:bg-slate-50/50">
						<TableCell className="font-medium text-slate-800">
							{site.name}
						</TableCell>
						<TableCell className="text-slate-600">
							{site.code || '—'}
						</TableCell>
						<TableCell className="text-slate-600">
							{site.brands && site.brands.length > 0 ? (
							<div className="flex flex-wrap gap-1">
								{site.brands.map(brand => (
								<span key={brand} className="inline-block text-xs bg-slate-100 text-slate-700 rounded px-2 py-0.5">{brands.find(b => b.id === brand)?.name}</span>
								))}
							</div>
							) : '—'}
						</TableCell>
						<TableCell className="text-slate-600">
							{site.created_by}
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setEditingSite(site)}
								className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
								title="Edit location"
							>
								<Pencil className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setDeletingSite(site)}
								disabled={deleteSiteMutation.isPending && deleteSiteMutation.variables === site.id}
								className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
							</div>
						</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
				)}
			</CardContent>
			</Card>
		</motion.div>

		{/* Edit Location Dialog */}
		<Dialog open={!!editingSite} onOpenChange={(open) => !open && setEditingSite(null)}>
			<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
			<DialogHeader>
				<DialogTitle>Edit Location</DialogTitle>
			</DialogHeader>
			{editingSite && (
				<form
				onSubmit={(e) => {
					e.preventDefault();
					const brandRates1 = {};
					const brandRates2 = {};
					brands.forEach(brand => {
					const val1 = editingSite.brand_hourly_rates_1?.[brand.id];
					if (val1 !== undefined && val1 !== '') {
						brandRates1[brand.id] = parseFloat(val1);
					}
					const val2 = editingSite.brand_hourly_rates_2?.[brand.id];
					if (val2 !== undefined && val2 !== '') {
						brandRates2[brand.id] = parseFloat(val2);
					}
					});
					updateSiteMutation.mutate({ id: editingSite.id, data: {
					name: editingSite.name,
					code: editingSite.code || null,
					brands: editingSite.brands || [],
					brand_hourly_rates_1: Object.keys(brandRates1).length > 0 ? brandRates1 : null,
					brand_hourly_rates_2: Object.keys(brandRates2).length > 0 ? brandRates2 : null,
					campaign_enabled: editingSite.campaign_enabled !== false
				}});
				}}
				className="space-y-4"
				>
				<div className="space-y-2">
					<Label>Location Name *</Label>
					<Input
					placeholder="Location name"
					value={editingSite.name || ''}
					onChange={(e) => setEditingSite({ ...editingSite, name: e.target.value })}
					required
					/>
				</div>
				<div className="space-y-2">
					<Label>Location Code</Label>
					<Input
					placeholder="Location code (optional)"
					value={editingSite.code || ''}
					onChange={(e) => setEditingSite({ ...editingSite, code: e.target.value })}
					/>
				</div>
				<div className="space-y-2">
					<Label className="text-sm font-medium">Available Brands at this location</Label>
					<p className="text-xs text-slate-500">Select which brands are available at this location.</p>
					<div className="space-y-2 border rounded-md p-3 bg-slate-50">
					{brands.map(brand => {
						const isChecked = (editingSite.brands || []).includes(brand.id);
						return (
						<div key={brand.id} className="flex items-center gap-3">
							<input
							type="checkbox"
							id={`brand-${brand.id}`}
							checked={isChecked}
							onChange={(e) => {
								const current = editingSite.brands || [];
								const updated = e.target.checked
								? [...current, brand.id]
								: current.filter(b => b !== brand.id);
								setEditingSite({ ...editingSite, brands: updated });
							}}
							className="h-4 w-4 rounded border-gray-300"
							/>
							<label htmlFor={`brand-${brand.id}`} className="text-sm text-slate-700">{brand.name}</label>
						</div>
						);
					})}
					{brands.length === 0 && (
						<p className="text-xs text-slate-400">No brands configured yet</p>
					)}
					</div>
				</div>
				 <div className="flex items-center gap-3 rounded-md border border-slate-200 p-3 bg-slate-50">
                  <input
                    type="checkbox"
                    id="campaign-enabled"
                    checked={editingSite.campaign_enabled !== false}
                    onChange={(e) => setEditingSite({ ...editingSite, campaign_enabled: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="campaign-enabled" className="text-sm text-slate-700 cursor-pointer">
                    Show "Safety Recall / Service Campaign" option on the submission form for this location's users
                  </label>
                </div>
				<div className="space-y-2">
					<Label className="text-sm font-medium">Hourly Rate per Brand (£)</Label>
					<p className="text-xs text-slate-500">Set a rate per brand. Leave blank to exclude that brand.</p>
					<div className="border rounded-md p-3 bg-slate-50">
						{(editingSite.brands || []).length === 0 ? (
							<p className="text-xs text-slate-400">No brands selected above</p>
						) : (
						<>
						<div className="flex items-center gap-3 mb-2">
							<span className="text-xs font-medium text-slate-500 w-32 flex-shrink-0"></span>
							<span className="text-xs font-semibold text-slate-600 flex-1 text-center">Rate 1 (£)</span>
							<span className="text-xs font-semibold text-slate-600 flex-1 text-center">Rate 2 (£)</span>
						</div>
					<div className="space-y-2">
					{brands.filter(brand => (editingSite.brands || []).includes(brand.id)).map(brand => (
						<div key={brand.id} className="flex items-center gap-3">
						<span className="text-sm text-slate-700 w-32 flex-shrink-0">{brand.name}</span>
						<Input
							type="number"
							step="0.01"
							min="0"
							placeholder="e.g. 85.00"
							value={editingSite.brand_hourly_rates_1?.[brand.id] ?? ''}
							onChange={(e) => setEditingSite({
							...editingSite,
							brand_hourly_rates_1: {
								...(editingSite.brand_hourly_rates_1 || {}),
								[brand.id]: e.target.value
							}
							})}
							className="h-8 bg-white"
						/>
						<Input
							type="number"
							step="0.01"
							min="0"
							placeholder="e.g. 95.00"
							value={editingSite.brand_hourly_rates_2?.[brand.id] ?? ''}
							onChange={(e) => setEditingSite({
							...editingSite,
							brand_hourly_rates_2: {
								...(editingSite.brand_hourly_rates_2 || {}),
								[brand.id]: e.target.value
							}
							})}
							className="h-8 bg-white"
						/>
						</div>
					))}
					</div>
					</>
					)}
					</div>
				</div>
				<DialogFooter>
					<Button type="button" variant="outline" onClick={() => setEditingSite(null)}>
					Cancel
					</Button>
					<Button type="submit" disabled={updateSiteMutation.isPending}>
					{updateSiteMutation.isPending ? 'Saving...' : 'Save Changes'}
					</Button>
				</DialogFooter>
				</form>
			)}
			</DialogContent>
		</Dialog>

		<AlertDialog open={!!deletingSite} onOpenChange={(open) => !open && setDeletingSite(null)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Location</AlertDialogTitle>
					<AlertDialogDescription>
						Delete location "{deletingSite?.name}"?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: "destructive" })}
						onClick={() => {
							deleteSiteMutation.mutate(deletingSite.id);
							setDeletingSite(null);
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	</>
	);
}
