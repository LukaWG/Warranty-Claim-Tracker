import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { databaseClients } from '@/api/databaseClient';
import { toast } from '@/components/ui/use-toast';

export default function AlertsTab() {
	const queryClient = useQueryClient();
	const [newAlert, setNewAlert] = useState({ name: '' });

	const { data: alerts = [], isLoading: alertsLoading } = useQuery({
	  queryKey: ['alerts'],
	  queryFn: () => databaseClients.Alert.get()
	});

	const createAlertMutation = useMutation({
	mutationFn: (data) => databaseClients.Alert.create(data),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ['alerts'] });
		setNewAlert({ name: '' });
	},
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to add alert', description: error?.message || 'Please try again.' })
	});

	const deleteAlertMutation = useMutation({
	mutationFn: (id) => databaseClients.Alert.delete(id),
	onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to delete alert', description: error?.message || 'Please try again.' })
	});

	const handleAlertSubmit = (e) => {
	e.preventDefault();
	if (newAlert.name.trim()) {
		createAlertMutation.mutate(newAlert);
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
				Add New Alert
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<form onSubmit={handleAlertSubmit} className="flex gap-4">
				<div className="flex-1">
					<Label className="text-sm">Alert Name *</Label>
					<Input
					placeholder="Enter alert name"
					value={newAlert.name}
					onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
					required
					className="mt-1"
					/>
				</div>
				<div className="flex items-end">
					<Button
					type="submit"
					disabled={createAlertMutation.isPending}
					style={{ backgroundColor: 'var(--hendy-blue)' }}
					>
					<Plus className="h-4 w-4 mr-2" />
					Add Alert
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
				All Alerts ({alerts.length})
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				{alertsLoading ? (
				<div className="flex items-center justify-center py-16">
					<div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
				</div>
				) : alerts.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
					<AlertCircle className="h-8 w-8 text-slate-400" />
					</div>
					<p className="text-slate-600 font-medium">No alerts configured</p>
					<p className="text-sm text-slate-400 mt-1">Add your first alert above</p>
				</div>
				) : (
				<Table>
					<TableHeader>
					<TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
						<TableHead className="font-semibold text-slate-600">Alert Name</TableHead>
						<TableHead className="font-semibold text-slate-600">Created By</TableHead>
						<TableHead className="font-semibold text-slate-600 w-24">Actions</TableHead>
					</TableRow>
					</TableHeader>
					<TableBody>
					{alerts.map((alert) => (
						<TableRow key={alert.id} className="hover:bg-slate-50/50">
						<TableCell className="font-medium text-slate-800">
							{alert.name}
						</TableCell>
						<TableCell className="text-slate-600">
							{alert.created_by}
						</TableCell>
						<TableCell>
							<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								if (window.confirm(`Delete alert "${alert.name}"?`)) {
								deleteAlertMutation.mutate(alert.id);
								}
							}}
							disabled={deleteAlertMutation.isPending && deleteAlertMutation.variables === alert.id}
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
	</>
	);
}
