import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { databaseClients } from '@/api/databaseClient';
import { toast } from '@/components/ui/use-toast';

export default function ResolutionsTab() {
	const queryClient = useQueryClient();
	const [newResolution, setNewResolution] = useState({ name: '' });
	const [deletingResolution, setDeletingResolution] = useState(null);

	const { data: resolutions = [], isLoading: resolutionsLoading } = useQuery({
	  queryKey: ['resolutions'],
	  queryFn: () => databaseClients.AlertResolution.get()
	});

	const createResolutionMutation = useMutation({
	mutationFn: (data) => databaseClients.AlertResolution.create(data),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ['resolutions'] });
		setNewResolution({ name: '' });
	},
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to add resolution', description: error?.message || 'Please try again.' })
	});

	const deleteResolutionMutation = useMutation({
	mutationFn: (id) => databaseClients.AlertResolution.delete(id),
	onSuccess: () => queryClient.invalidateQueries({ queryKey: ['resolutions'] }),
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to delete resolution', description: error?.message || 'Please try again.' })
	});

	const handleResolutionSubmit = (e) => {
	e.preventDefault();
	if (newResolution.name.trim()) {
		createResolutionMutation.mutate(newResolution);
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
				Add New Resolution
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<form onSubmit={handleResolutionSubmit} className="flex gap-4">
				<div className="flex-1">
					<Label className="text-sm">Resolution Name *</Label>
					<Input
					placeholder="Enter resolution name"
					value={newResolution.name}
					onChange={(e) => setNewResolution({ ...newResolution, name: e.target.value })}
					required
					className="mt-1"
					/>
				</div>
				<div className="flex items-end">
					<Button
					type="submit"
					disabled={createResolutionMutation.isPending}
					style={{ backgroundColor: 'var(--hendy-blue)' }}
					>
					<Plus className="h-4 w-4 mr-2" />
					Add Resolution
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
				<AlertCircle className="h-5 w-5" />
				All Resolutions ({resolutions.length})
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				{resolutionsLoading ? (
				<div className="flex items-center justify-center py-16">
					<div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
				</div>
				) : resolutions.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
					<AlertCircle className="h-8 w-8 text-slate-400" />
					</div>
					<p className="text-slate-600 font-medium">No resolutions configured</p>
					<p className="text-sm text-slate-400 mt-1">Add your first resolution above</p>
				</div>
				) : (
				<Table>
					<TableHeader>
					<TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
						<TableHead className="font-semibold text-slate-600">Resolution Name</TableHead>
						<TableHead className="font-semibold text-slate-600">Created By</TableHead>
						<TableHead className="font-semibold text-slate-600 w-24">Actions</TableHead>
					</TableRow>
					</TableHeader>
					<TableBody>
					{resolutions.map((resolution) => (
						<TableRow key={resolution.id} className="hover:bg-slate-50/50">
						<TableCell className="font-medium text-slate-800">
							{resolution.name}
						</TableCell>
						<TableCell className="text-slate-600">
							{resolution.created_by}
						</TableCell>
						<TableCell>
							<Button
							variant="ghost"
							size="icon"
							onClick={() => setDeletingResolution(resolution)}
							disabled={deleteResolutionMutation.isPending && deleteResolutionMutation.variables === resolution.id}
							className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
							>
							<Trash2 className="h-4 w-4" />
							</Button>
						</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
				)}
			</CardContent>
			</Card>
		</motion.div>

		<AlertDialog open={!!deletingResolution} onOpenChange={(open) => !open && setDeletingResolution(null)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Resolution</AlertDialogTitle>
					<AlertDialogDescription>
						Delete resolution "{deletingResolution?.name}"?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: "destructive" })}
						onClick={() => {
							deleteResolutionMutation.mutate(deletingResolution.id);
							setDeletingResolution(null);
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
