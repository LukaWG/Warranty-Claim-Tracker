import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Tag, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import EditBrandModal from '@/components/configuration/EditBrandModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { databaseClients } from '@/api/databaseClient';
import { useBrands } from '@/hooks/useBrands';
import { toast } from '@/components/ui/use-toast';

export default function BrandsTab() {
	const queryClient = useQueryClient();
	const [newBrand, setNewBrand] = useState({ name: '', manufacturer_deadline_days: '', green_min_days: '', green_max_days: '', amber_min_days: '', amber_max_days: '', red_min_days: '', red_max_days: '' });
	const [editingBrandDeadlines, setEditingBrandDeadlines] = useState({});
	const [editingBrandThresholds, setEditingBrandThresholds] = useState({});
	const [editingBrand, setEditingBrand] = useState(null);
	const [deletingBrand, setDeletingBrand] = useState(null);

	const { data: brands = [], isLoading: brandsLoading } = useBrands();

	const createBrandMutation = useMutation({
	mutationFn: (data) => databaseClients.Brand.create(data),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ['brands'] });
		setNewBrand({ name: '', manufacturer_deadline_days: '', green_min_days: '', green_max_days: '', amber_min_days: '', amber_max_days: '', red_min_days: '', red_max_days: '' });
	},
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to add brand', description: error?.message || 'Please try again.' })
	});

	const updateBrandMutation = useMutation({
	mutationFn: ({ id, data }) => databaseClients.Brand.update(id, data),
	onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to update brand', description: error?.message || 'Please try again.' })
	});

	const deleteBrandMutation = useMutation({
	mutationFn: (id) => databaseClients.Brand.delete(id),
	onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to delete brand', description: error?.message || 'Please try again.' })
	});

	const handleBrandSubmit = (e) => {
	e.preventDefault();
	if (newBrand.name.trim()) {
		createBrandMutation.mutate({
		name: newBrand.name,
		manufacturer_deadline_days: newBrand.manufacturer_deadline_days ? parseInt(newBrand.manufacturer_deadline_days) : null,
		green_min_days: newBrand.green_min_days ? parseInt(newBrand.green_min_days) : null,
		green_max_days: newBrand.green_max_days ? parseInt(newBrand.green_max_days) : null,
		amber_min_days: newBrand.amber_min_days ? parseInt(newBrand.amber_min_days) : null,
		amber_max_days: newBrand.amber_max_days ? parseInt(newBrand.amber_max_days) : null,
		red_min_days: newBrand.red_min_days ? parseInt(newBrand.red_min_days) : null,
		red_max_days: newBrand.red_max_days ? parseInt(newBrand.red_max_days) : null
		});
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
				Add New Brand
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<form onSubmit={handleBrandSubmit} className="space-y-4">
				<div className="flex gap-4">
					<div className="flex-1">
					<Label className="text-sm">Brand Name *</Label>
					<Input
						placeholder="Enter brand name"
						value={newBrand.name}
						onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
						required
						className="mt-1"
					/>
					</div>
					<div className="flex-1">
					<Label className="text-sm">Deadline Days</Label>
					<Input
						type="number"
						min="0"
						placeholder="Days until deadline"
						value={newBrand.manufacturer_deadline_days}
						onChange={(e) => setNewBrand({ ...newBrand, manufacturer_deadline_days: e.target.value })}
						className="mt-1"
					/>
					</div>
				</div>
				<div>
					<Label className="text-sm mb-2 block">Traffic Light Ranges (Days remaining between min-max)</Label>
					<div className="grid grid-cols-3 gap-4">
					<div>
						<Label className="text-xs text-black flex items-center gap-1 mb-2">
						🟢 Green
						</Label>
						<div className="space-y-2">
						<Input
							type="number"
							min="0"
							placeholder="Max"
							value={newBrand.green_max_days}
							onChange={(e) => setNewBrand({ ...newBrand, green_max_days: e.target.value })}
						/>
						<Input
							type="number"
							min="0"
							placeholder="Min"
							value={newBrand.green_min_days}
							onChange={(e) => setNewBrand({ ...newBrand, green_min_days: e.target.value })}
						/>
						</div>
					</div>
					<div>
						<Label className="text-xs text-black flex items-center gap-1 mb-2">
						🟡 Amber
						</Label>
						<div className="space-y-2">
						<Input
							type="number"
							min="0"
							placeholder="Max"
							value={newBrand.amber_max_days}
							onChange={(e) => setNewBrand({ ...newBrand, amber_max_days: e.target.value })}
						/>
						<Input
							type="number"
							min="0"
							placeholder="Min"
							value={newBrand.amber_min_days}
							onChange={(e) => setNewBrand({ ...newBrand, amber_min_days: e.target.value })}
						/>
						</div>
					</div>
					<div>
						<Label className="text-xs text-black flex items-center gap-1 mb-2">
						🔴 Red
						</Label>
						<div className="space-y-2">
						<Input
							type="number"
							min="0"
							placeholder="Max"
							value={newBrand.red_max_days}
							onChange={(e) => setNewBrand({ ...newBrand, red_max_days: e.target.value })}
						/>
						<Input
							type="number"
							min="0"
							placeholder="Min"
							value={newBrand.red_min_days}
							onChange={(e) => setNewBrand({ ...newBrand, red_min_days: e.target.value })}
						/>
						</div>
					</div>
					</div>
				</div>
				<div className="flex justify-end">
					<Button
					type="submit"
					disabled={createBrandMutation.isPending}
					style={{ backgroundColor: 'var(--hendy-blue)' }}
					>
					<Plus className="h-4 w-4 mr-2" />
					Add Brand
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
				<Tag className="h-5 w-5" />
				All Brands ({brands.length})
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				{brandsLoading ? (
				<div className="flex items-center justify-center py-16">
					<div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
				</div>
				) : brands.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
					<Tag className="h-8 w-8 text-slate-400" />
					</div>
					<p className="text-slate-600 font-medium">No brands configured</p>
					<p className="text-sm text-slate-400 mt-1">Add your first brand above</p>
				</div>
				) : (
				<Table>
					<TableHeader>
					<TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
						<TableHead className="font-semibold text-slate-600">Brand Name</TableHead>
						<TableHead className="font-semibold text-slate-600">Deadline Days</TableHead>
						<TableHead className="font-semibold text-slate-600">🟢 Green</TableHead>
						<TableHead className="font-semibold text-slate-600">🟡 Amber</TableHead>
						<TableHead className="font-semibold text-slate-600">🔴 Red</TableHead>
						<TableHead className="font-semibold text-slate-600">Created By</TableHead>
						<TableHead className="font-semibold text-slate-600 w-24">Actions</TableHead>
					</TableRow>
					</TableHeader>
					<TableBody>
					{brands.map((brand) => (
						<TableRow key={brand.id} className="hover:bg-slate-50/50">
						<TableCell className="font-medium text-slate-800">
							{brand.name}
						</TableCell>
						<TableCell className="text-slate-600">
							<Input
							type="number"
							min="0"
							value={editingBrandDeadlines[brand.id] !== undefined ? editingBrandDeadlines[brand.id] : (brand.manufacturer_deadline_days || '')}
							onChange={(e) => {
								setEditingBrandDeadlines({
								...editingBrandDeadlines,
								[brand.id]: e.target.value
								});
							}}
							onBlur={(e) => {
								const value = e.target.value;
								const newValue = value ? parseInt(value) : null;
								if (newValue !== brand.manufacturer_deadline_days) {
								 updateBrandMutation.mutate({
								 id: brand.id,
								 data: {
									 manufacturer_deadline_days: newValue,
									 green_min_days: null,
									 green_max_days: null,
									 amber_min_days: null,
									 amber_max_days: null,
									 red_min_days: null,
									 red_max_days: null
								 }
								 });
								}
								setEditingBrandDeadlines({
								...editingBrandDeadlines,
								[brand.id]: undefined
								});
							}}
							className="w-20 h-8 text-slate-800 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							placeholder="Days"
							/>
						</TableCell>
						<TableCell>
							<div className="space-y-1">
							<Input
								type="number"
								min="0"
								value={editingBrandThresholds[`${brand.id}-green-max`] !== undefined ? editingBrandThresholds[`${brand.id}-green-max`] : (brand.green_max_days || '')}
								onChange={(e) => {
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-green-max`]: e.target.value
								});
								}}
								onBlur={(e) => {
								const value = e.target.value;
								const newValue = value ? parseInt(value) : null;
								if (newValue !== brand.green_max_days) {
									updateBrandMutation.mutate({
									id: brand.id,
									data: { green_max_days: newValue }
									});
								}
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-green-max`]: undefined
								});
								}}
								className="w-16 h-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Max"
							/>
							<Input
								type="number"
								min="0"
								value={editingBrandThresholds[`${brand.id}-green-min`] !== undefined ? editingBrandThresholds[`${brand.id}-green-min`] : (brand.green_min_days || '')}
								onChange={(e) => {
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-green-min`]: e.target.value
								});
								}}
								onBlur={(e) => {
								const value = e.target.value;
								const newValue = value ? parseInt(value) : null;
								if (newValue !== brand.green_min_days) {
									updateBrandMutation.mutate({
									id: brand.id,
									data: { green_min_days: newValue }
									});
								}
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-green-min`]: undefined
								});
								}}
								className="w-16 h-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Min"
							/>
							</div>
						</TableCell>
						<TableCell>
							<div className="space-y-1">
							<Input
								type="number"
								min="0"
								value={editingBrandThresholds[`${brand.id}-amber-max`] !== undefined ? editingBrandThresholds[`${brand.id}-amber-max`] : (brand.amber_max_days || '')}
								onChange={(e) => {
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-amber-max`]: e.target.value
								});
								}}
								onBlur={(e) => {
								const value = e.target.value;
								const newValue = value ? parseInt(value) : null;
								if (newValue !== brand.amber_max_days) {
									updateBrandMutation.mutate({
									id: brand.id,
									data: { amber_max_days: newValue }
									});
								}
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-amber-max`]: undefined
								});
								}}
								className="w-16 h-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Max"
							/>
							<Input
								type="number"
								min="0"
								value={editingBrandThresholds[`${brand.id}-amber-min`] !== undefined ? editingBrandThresholds[`${brand.id}-amber-min`] : (brand.amber_min_days || '')}
								onChange={(e) => {
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-amber-min`]: e.target.value
								});
								}}
								onBlur={(e) => {
								const value = e.target.value;
								const newValue = value ? parseInt(value) : null;
								if (newValue !== brand.amber_min_days) {
									updateBrandMutation.mutate({
									id: brand.id,
									data: { amber_min_days: newValue }
									});
								}
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-amber-min`]: undefined
								});
								}}
								className="w-16 h-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Min"
							/>
							</div>
						</TableCell>
						<TableCell>
							<div className="space-y-1">
							<Input
								type="number"
								min="0"
								value={editingBrandThresholds[`${brand.id}-red-max`] !== undefined ? editingBrandThresholds[`${brand.id}-red-max`] : (brand.red_max_days || '')}
								onChange={(e) => {
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-red-max`]: e.target.value
								});
								}}
								onBlur={(e) => {
								const value = e.target.value;
								const newValue = value ? parseInt(value) : null;
								if (newValue !== brand.red_max_days) {
									updateBrandMutation.mutate({
									id: brand.id,
									data: { red_max_days: newValue }
									});
								}
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-red-max`]: undefined
								});
								}}
								className="w-16 h-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Max"
							/>
							<Input
								type="number"
								min="0"
								value={editingBrandThresholds[`${brand.id}-red-min`] !== undefined ? editingBrandThresholds[`${brand.id}-red-min`] : (brand.red_min_days || '')}
								onChange={(e) => {
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-red-min`]: e.target.value
								});
								}}
								onBlur={(e) => {
								const value = e.target.value;
								const newValue = value ? parseInt(value) : null;
								if (newValue !== brand.red_min_days) {
									updateBrandMutation.mutate({
									id: brand.id,
									data: { red_min_days: newValue }
									});
								}
								setEditingBrandThresholds({
									...editingBrandThresholds,
									[`${brand.id}-red-min`]: undefined
								});
								}}
								className="w-16 h-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								placeholder="Min"
							/>
							</div>
						</TableCell>
						<TableCell className="text-slate-600">
							{brand.created_by}
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setEditingBrand(brand)}
								className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
								title="Edit brand"
							>
								<Pencil className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setDeletingBrand(brand)}
								disabled={deleteBrandMutation.isPending && deleteBrandMutation.variables === brand.id}
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

		{/* Edit Brand Modal */}
		<EditBrandModal
			brand={editingBrand}
			open={!!editingBrand}
			onOpenChange={(open) => !open && setEditingBrand(null)}
			onSave={(formData) => {
			updateBrandMutation.mutate({
				id: editingBrand.id,
				data: {
				name: formData.name,
				manufacturer_deadline_days: formData.manufacturer_deadline_days ? parseInt(formData.manufacturer_deadline_days) : null,
				green_min_days: formData.green_min_days ? parseInt(formData.green_min_days) : null,
				green_max_days: formData.green_max_days ? parseInt(formData.green_max_days) : null,
				amber_min_days: formData.amber_min_days ? parseInt(formData.amber_min_days) : null,
				amber_max_days: formData.amber_max_days ? parseInt(formData.amber_max_days) : null,
				red_min_days: formData.red_min_days ? parseInt(formData.red_min_days) : null,
				red_max_days: formData.red_max_days ? parseInt(formData.red_max_days) : null
				}
			});
			setEditingBrand(null);
			}}
			isPending={updateBrandMutation.isPending}
		/>

		<AlertDialog open={!!deletingBrand} onOpenChange={(open) => !open && setDeletingBrand(null)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Brand</AlertDialogTitle>
					<AlertDialogDescription>
						Delete brand "{deletingBrand?.name}"?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: "destructive" })}
						onClick={() => {
							deleteBrandMutation.mutate(deletingBrand.id);
							setDeletingBrand(null);
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
