import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Users, Pencil, Clock, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { databaseClients } from '@/api/databaseClient';
import { useSites } from '@/hooks/useSites';
import { useBrands } from '@/hooks/useBrands';
import { authUsers } from "@/api/authClient";
import { toast } from '@/components/ui/use-toast';

// Brand IDs selectable for a role given its assigned sites — mirrors the
// "Assigned Brands" checkbox lists rendered for Location/Administrator users.
function availableBrandIdsFor(role, default_sites, sites) {
	const siteIds = default_sites || [];
	const relevantSites = (role === 'Administrator' && siteIds.length === 0)
		? sites
		: sites.filter(s => siteIds.includes(s.id));
	return [...new Set(relevantSites.flatMap(s => s.brands || []))];
}

// Role-exclusive fields: only one of these ever applies to a given role, so
// whichever ones don't apply must be cleared whenever a role is set/changed.
function roleFieldsFor(role, { default_site, default_sites, default_brands } = {}, sites = []) {
	const isBrandRestrictable = role === 'Location' || role === 'Administrator';
	const availableBrandIds = isBrandRestrictable ? availableBrandIdsFor(role, default_sites, sites) : [];
	return {
		default_site: (role !== 'Administrator' && role !== 'Location') ? (default_site || null) : null,
		default_sites: isBrandRestrictable ? (default_sites || []) : [],
		default_brands: isBrandRestrictable ? (default_brands || []).filter(id => availableBrandIds.includes(id)) : [],
	};
}

export default function UsersTab() {
	const queryClient = useQueryClient();
	const [newUser, setNewUser] = useState({ email: '', role: 'Location', first_name: '', last_name: '', default_site: '', default_sites: [], default_brands: [] });
	const [showUserDialog, setShowUserDialog] = useState(false);
	const [editingUser, setEditingUser] = useState(null);
	const [tempPassword, setTempPassword] = useState(null);
	const [showTempPasswordDialog, setShowTempPasswordDialog] = useState(false);

	const { data: sites = [] } = useSites();
	const { data: brands = [] } = useBrands();

	// Fetch users from better-auth
	const { data: users = [], isLoading: usersLoading } = useQuery({
	queryKey: ["users"],
	queryFn: () => authUsers.list(),
	});

	// userId -> providerIds; used to hide password reset for SSO-only users.
	// Fails open: if the lookup errors the map stays empty and all buttons show.
	const { data: userProviders = {} } = useQuery({
	queryKey: ["user-providers"],
	queryFn: () => authUsers.listUserProviders(),
	});
	const isSsoOnlyUser = (userId) =>
		userProviders[userId]?.length > 0 && !userProviders[userId].includes("credential");

	const { data: pendingInvites = [], isLoading: pendingInvitesLoading } = useQuery({
	  queryKey: ['pendingInvites'],
	  queryFn: () => databaseClients.PendingUserInvite.get()
	});

	const deletePendingInviteMutation = useMutation({
	mutationFn: (id) => databaseClients.PendingUserInvite.delete(id),
	onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingInvites'] }),
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to cancel invite', description: error?.message || 'Please try again.' })
	});

	const inviteUserMutation = useMutation({
	mutationFn: ({ email, role, first_name, last_name, default_site, default_sites, default_brands }) =>
		authUsers.invite({
			email,
			first_name,
			last_name,
			custom_role: role,
			default_site,
			default_sites,
			default_brands }),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ["users"] });
		setNewUser({ email: "", role: "Location", first_name: "", last_name: "", default_site: "" });
		setShowUserDialog(false);
	},
	onError: (error) => alert(`Failed to add user: ${error.message}`),
	});

	const updateUserRoleMutation = useMutation({
	mutationFn: ({ id, role, user }) => {
		const platformRole = (role === 'Owner' || role === 'Group Manager') ? 'admin' : 'user';
		return authUsers.update(id, { custom_role: role, role: platformRole, ...roleFieldsFor(role, user) });
	},
	onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
	onError: () => alert("Failed to update role. Please try again."),
	});

	const updateUserMutation = useMutation({
	mutationFn: ({ id, data }) =>
		authUsers.update(id, {
		first_name: data.first_name,
		last_name: data.last_name,
		custom_role: data.custom_role,
		default_site: data.default_site,
		default_sites: data.default_sites,
		default_brands: data.default_brands,
		}),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ["users"] });
		setEditingUser(null);
	},
	onError: () => alert("Failed to update user. Please try again."),
	});

	const deleteUserMutation = useMutation({
	mutationFn: (id) => authUsers.delete(id),
	onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
	onError: (error) => toast({ variant: 'destructive', title: 'Failed to delete user', description: error?.message || 'Please try again.' }),
	});

	const resetUserPasswordMutation = useMutation({
	mutationFn: async ({ id }) => {
		const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
		let generatedPassword = "";
		for (let i = 0; i < 10; i++) {
			generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		await authUsers.resetPassword(id, generatedPassword);
		await authUsers.update(id, { must_change_password: true });
		return generatedPassword;
	},
	onSuccess: (generatedPassword) => {
		setTempPassword(generatedPassword);
		setShowTempPasswordDialog(true);
		queryClient.invalidateQueries({ queryKey: ["users"] });
	},
	onError: (error) => {
		alert(`Failed to reset password: ${error.message || "Unknown error"}`);
	}
	});

	const handleUserInvite = async (e) => {
	e.preventDefault();

	// [ ] Check whether user is logged in before inviting user. Log in system
	// and invites need to be setup. Waiting on where it is being hosted.

	if (newUser.email.trim()) {
		inviteUserMutation.mutate({
		email: newUser.email,
		role: newUser.role,
		first_name: newUser.first_name,
		last_name: newUser.last_name,
		...roleFieldsFor(newUser.role, newUser, sites)
		});
	}
	};

	const handleUserEdit = (e) => {
	e.preventDefault();
	if (editingUser) {
		const role = editingUser.custom_role || editingUser.role;
		updateUserMutation.mutate({
		id: editingUser.id,
		data: {
			first_name: editingUser.first_name,
			last_name: editingUser.last_name,
			custom_role: role,
			...roleFieldsFor(role, editingUser, sites)
		}
		});
	}
	};

	return (
	<>
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<Card className="border-0 shadow-xl bg-white">
			<CardHeader className="border-b border-slate-100">
				<div className="flex items-center justify-between">
				<CardTitle className="flex items-center gap-2">
					<Users className="h-5 w-5" />
					All Users ({users.length + pendingInvites.filter(p => !users.find(u => u.email === p.email)).length})
				</CardTitle>
				<Button
					onClick={() => setShowUserDialog(true)}
					style={{ backgroundColor: 'var(--hendy-blue)' }}
				>
					<Plus className="h-4 w-4 mr-2" />
					Add New User
				</Button>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				{usersLoading || pendingInvitesLoading ? (
				<div className="flex items-center justify-center py-16">
					<div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
				</div>
				) : users.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
					<Users className="h-8 w-8 text-slate-400" />
					</div>
					<p className="text-slate-600 font-medium">No users yet</p>
					<p className="text-sm text-slate-400 mt-1">Invite your first user above</p>
				</div>
				) : (
				<Table>
					<TableHeader>
					<TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
						<TableHead className="font-semibold text-slate-600">First Name</TableHead>
						<TableHead className="font-semibold text-slate-600">Last Name</TableHead>
						<TableHead className="font-semibold text-slate-600">Email</TableHead>
						<TableHead className="font-semibold text-slate-600">Role</TableHead>
						<TableHead className="font-semibold text-slate-600">Joined</TableHead>
						<TableHead className="font-semibold text-slate-600 w-40">Actions</TableHead>
					</TableRow>
					</TableHeader>
					<TableBody>
					{users.map((user) => (
						<TableRow key={user.id} className="hover:bg-slate-50/50">
						<TableCell className="font-medium text-slate-800">
							{user.first_name || '—'}
						</TableCell>
						<TableCell className="font-medium text-slate-800">
							{user.last_name || '—'}
						</TableCell>
						<TableCell className="text-slate-600">
							{user.email}
						</TableCell>
						<TableCell>
							<select
							value={user.custom_role || user.role || 'Location'}
							onChange={(e) => {
								const newRole = e.target.value;
								if (window.confirm(`Change ${user.email}'s role to ${newRole}?`)) {
								updateUserRoleMutation.mutate({
									id: user.id,
									role: newRole,
									user
								});
								}
							}}
							disabled={updateUserRoleMutation.isPending}
							className="h-8 px-2 rounded border border-input bg-background text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							>
							<option value="Location">Location</option>
							<option value="Administrator">Administrator</option>
							<option value="Group Manager">Group Manager</option>
							<option value="Owner">Owner</option>
							</select>
						</TableCell>
						<TableCell className="text-slate-600">
							{user.created_date ? new Date(user.created_date).toLocaleDateString() : '—'}
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => {
									// Normalize legacy default_site/default_sites values that stored the site name instead of its id
									const legacySite = user.default_site ? sites.find(s => s.name === user.default_site) : null;
									const normalizedSites = (user.default_sites || []).map(s => sites.find(site => site.id === s) ? s : (sites.find(site => site.name === s)?.id ?? s));
									setEditingUser({ ...user, ...(legacySite ? { default_site: legacySite.id } : {}), default_sites: normalizedSites });
								}}
								className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
								title="Edit user"
							>
								<Pencil className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => {
								if (window.confirm(`Delete user "${user.email}"?`)) {
									deleteUserMutation.mutate(user.id);
								}
								}}
								disabled={deleteUserMutation.isPending && deleteUserMutation.variables === user.id}
								className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
							{!isSsoOnlyUser(user.id) && (
							<Button
								variant="ghost"
								size="icon"
								onClick={() => {
									if (window.confirm(`Reset password for user "${user.email}"?`)) {
										resetUserPasswordMutation.mutate({ id: user.id });
									}
								}}
								disabled={resetUserPasswordMutation.isPending}
								className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
								title="Reset Password"
							>
								<Key className="h-4 w-4" />
							</Button>
							)}
							</div>
						</TableCell>
						</TableRow>
					))}
					{pendingInvites
						.filter(p => !users.find(u => u.email === p.email))
						.map((invite) => (
						<TableRow key={`pending-${invite.id}`} className="hover:bg-amber-50/30 bg-amber-50/20">
						<TableCell className="font-medium text-slate-800">
							{invite.first_name || '—'}
						</TableCell>
						<TableCell className="font-medium text-slate-800">
							{invite.last_name || '—'}
						</TableCell>
						<TableCell className="text-slate-600">
							{invite.email}
						</TableCell>
						<TableCell>
							<span className="text-sm text-slate-600">{invite.custom_role || '—'}</span>
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-1.5">
							<Clock className="h-3.5 w-3.5 text-amber-500" />
							<span className="text-xs font-medium text-amber-600">Invite Pending</span>
							</div>
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => {
								if (window.confirm(`Cancel invite for "${invite.email}"?`)) {
									deletePendingInviteMutation.mutate(invite.id);
								}
								}}
								disabled={deletePendingInviteMutation.isPending && deletePendingInviteMutation.variables === invite.id}
								className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
								title="Cancel invite"
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

		{/* Add User Dialog */}
		<Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
			<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
			<DialogHeader>
				<DialogTitle>Add New User</DialogTitle>
			</DialogHeader>
			<form onSubmit={handleUserInvite} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label>First Name</Label>
					<Input
					placeholder="First name"
					value={newUser.first_name}
					onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
					/>
				</div>
				<div className="space-y-2">
					<Label>Last Name</Label>
					<Input
					placeholder="Last name"
					value={newUser.last_name}
					onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
					/>
				</div>
				</div>
				<div className="space-y-2">
				<Label>Email *</Label>
				<Input
					type="email"
					placeholder="Enter user email"
					value={newUser.email}
					onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
					required
				/>
				</div>
				<div className="space-y-2">
				<Label>Role *</Label>
				<Select
					value={newUser.role}
					onValueChange={(value) => setNewUser({ ...newUser, role: value })}
				>
					<SelectTrigger>
					<SelectValue />
					</SelectTrigger>
					<SelectContent>
					<SelectItem value="Location">Location</SelectItem>
					<SelectItem value="Administrator">Administrator</SelectItem>
					<SelectItem value="Group Manager">Group Manager</SelectItem>
					<SelectItem value="Owner">Owner</SelectItem>
					</SelectContent>
				</Select>
				</div>
				{newUser.role === 'Location' && (
				  <div className="space-y-2">
                  <Label>Assigned Branches</Label>
                  <p className="text-xs text-slate-500">Select which branches this Location user can submit claims for.</p>
                  <div className="space-y-2 border rounded-md p-3 bg-slate-50 max-h-40 overflow-y-auto">
                    {sites.map((site) => (
                      <div key={site.id} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`new-user-site-${site.id}`}
                          checked={(newUser.default_sites || []).includes(site.id)}
                          onChange={(e) => {
                            const current = newUser.default_sites || [];
                            const updated = e.target.checked ? [...current, site.id] : current.filter(s => s !== site.id);
                            setNewUser({ ...newUser, default_sites: updated });
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`new-user-site-${site.id}`} className="text-sm text-slate-700">{site.name}</label>
                      </div>
                    ))}
                    {sites.length === 0 && <p className="text-xs text-slate-400">No sites configured yet</p>}
                  </div>
                </div>
              )}
			  {newUser.role === 'Location' && (() => {
				const selectedSiteBrands = sites
					.filter(s => (newUser.default_sites || []).includes(s.id))
					.flatMap(s => s.brands || []);
				const availableBrands = [...new Set(selectedSiteBrands)];
				if (availableBrands.length === 0) return null;
				return (
					<div className="space-y-2">
						<Label>Assigned Brands</Label>
						<p className="text-xs text-slate-500">Select which brands this Location user can submit claims for. These are the brands available at their assigned branches.</p>
						<div className="space-y-2 border rounded-md p-3 bg-slate-50 max-h-40 overflow-y-auto">
							{availableBrands.map((brandId) => (
								<div key={brandId} className="flex items-center gap-3">
									<input
										type="checkbox"
										id={`new-user-brand-${brandId}`}
										checked={(newUser.default_brands || []).includes(brandId)}
										onChange={(e) => {
											const current = newUser.default_brands || [];
											const updated = e.target.checked ? [...current, brandId] : current.filter(b => b !== brandId);
											setNewUser({ ...newUser, default_brands: updated });
										}}
										className="h-4 w-4 rounded border-gray-300"
									/>
									<label htmlFor={`new-user-brand-${brandId}`} className="text-sm text-slate-700">{brands.find(b => b.id === brandId)?.name}</label>
								</div>
							))}
						</div>
					</div>
				);
				})()}
              {newUser.role !== 'Administrator' && newUser.role !== 'Location' && (
				<div className="space-y-2">
				<Label>Default Branch</Label>
				<Select
					value={newUser.default_site || '__none__'}
					onValueChange={(value) => setNewUser({ ...newUser, default_site: value === '__none__' ? '' : value })}
				>
					<SelectTrigger>
					<SelectValue placeholder="No default branch" />
					</SelectTrigger>
					<SelectContent>
					<SelectItem value="__none__">No default branch</SelectItem>
					{sites.map((site) => (
						<SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
					))}
					</SelectContent>
				</Select>
				</div>
				)}
				{newUser.role === 'Administrator' && (
					<div className="space-y-2">
						<Label>Assigned Locations</Label>
						<p className="text-xs text-slate-500">Select which locations this Administrator can see. Leave empty for all locations.</p>
						<div className="space-y-2 border rounded-md p-3 bg-slate-50 max-h-40 overflow-y-auto">
							{sites.map(site => (
								<div key={site.id} className="flex items-center gap-3">
									<input
										type="checkbox"
										id={`new-user-admin-site-${site.id}`}
										checked={(newUser.default_sites || []).includes(site.id)}
										onChange={(e) => {
											const current = newUser.default_sites || [];
											const updated = e.target.checked ? [...current, site.id] : current.filter(b => b !== site.id);
											setNewUser({ ...newUser, default_sites: updated });
										}}
										className="h-4 w-4 rounded border-gray-300"
									/>
									<label htmlFor={`new-user-admin-site-${site.id}`} className="text-sm text-slate-700">{site.name}</label>
								</div>
							))}
							{sites.length === 0 && <p className="text-xs text-slate-400">No sites configured yet</p>}
						</div>
					</div>
				)}
				{newUser.role === 'Administrator' && (() => {
					const adminSiteBrands = (newUser.default_sites || []).length === 0
						? sites.flatMap(s => s.brands || [])
						: sites.filter(s => (newUser.default_sites || []).includes(s.id)).flatMap(s => s.brands || []);
					const availableBrands = [...new Set(adminSiteBrands)];
					if (availableBrands.length === 0) return null;
					return (
					<div className="space-y-2">
					<Label>Assigned Brands</Label>
					<p className="text-xs text-slate-500">Restrict this Admin to specific brands. Leave empty for all brands.</p>
					<div className="space-y-2 border rounded-md p-3 bg-slate-50 max-h-40 overflow-y-auto">
						<div className="flex items-center gap-3 pb-2 mb-1 border-b border-slate-200">
						<input
							type="checkbox"
							id="new-user-admin-brand-all"
							checked={(newUser.default_brands || []).length === 0}
							onChange={(e) => {
							if (e.target.checked) setNewUser({ ...newUser, default_brands: [] });
							}}
							className="h-4 w-4 rounded border-gray-300"
						/>
						<label htmlFor="new-user-admin-brand-all" className="text-sm font-medium text-slate-700">All Brands</label>
						</div>
						{availableBrands.map((brandId) => (
						<div key={brandId} className="flex items-center gap-3">
							<input
							type="checkbox"
							id={`new-user-admin-brand-${brandId}`}
							checked={(newUser.default_brands || []).includes(brandId)}
							onChange={(e) => {
								const current = newUser.default_brands || [];
								const updated = e.target.checked ? [...current, brandId] : current.filter(b => b !== brandId);
								setNewUser({ ...newUser, default_brands: updated });
							}}
							className="h-4 w-4 rounded border-gray-300"
							/>
							<label htmlFor={`new-user-admin-brand-${brandId}`} className="text-sm text-slate-700">{brands.find(b => b.id === brandId)?.name}</label>
						</div>
						))}
					</div>
					</div>
					);
				})()}
				<DialogFooter>
				<Button type="button" variant="outline" onClick={() => setShowUserDialog(false)}>
					Cancel
				</Button>
				<Button type="submit" disabled={inviteUserMutation.isPending}>
					{inviteUserMutation.isPending ? 'Adding...' : 'Add User'}
				</Button>
				</DialogFooter>
			</form>
			</DialogContent>
		</Dialog>

		{/* Edit User Dialog */}
		<Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
			<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
			<DialogHeader>
				<DialogTitle>Edit User</DialogTitle>
			</DialogHeader>
			{editingUser && (
				<form onSubmit={handleUserEdit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
					<Label>First Name</Label>
					<Input
						placeholder="First name"
						value={editingUser.first_name || ''}
						onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
					/>
					</div>
					<div className="space-y-2">
					<Label>Last Name</Label>
					<Input
						placeholder="Last name"
						value={editingUser.last_name || ''}
						onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
					/>
					</div>
				</div>
				<div className="space-y-2">
					<Label>Email</Label>
					<Input
					type="email"
					value={editingUser.email}
					disabled
					className="bg-slate-50"
					/>
				</div>
				<div className="space-y-2">
					 <Label>Role *</Label>
					 <Select
					value={editingUser.custom_role || editingUser.role}
					onValueChange={(value) => setEditingUser({ ...editingUser, custom_role: value })}
					>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Location">Location</SelectItem>
						<SelectItem value="Administrator">Administrator</SelectItem>
						<SelectItem value="Group Manager">Group Manager</SelectItem>
						<SelectItem value="Owner">Owner</SelectItem>
					</SelectContent>
					</Select>
				</div>
				{(editingUser.custom_role || editingUser.role) === 'Location' && (
					<div className="space-y-2">
                  <Label>Assigned Branches</Label>
                  <p className="text-xs text-slate-500">Select which branches this Location user can submit claims for.</p>
                  <div className="space-y-2 border rounded-md p-3 bg-slate-50 max-h-40 overflow-y-auto">
                    {sites.map((site) => (
                      <div key={site.id} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`edit-user-site-${site.id}`}
                          checked={(editingUser.default_sites || []).includes(site.id)}
                          onChange={(e) => {
                            const current = editingUser.default_sites || [];
                            const updated = e.target.checked ? [...current, site.id] : current.filter(s => s !== site.id);
                            setEditingUser({ ...editingUser, default_sites: updated });
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`edit-user-site-${site.id}`} className="text-sm text-slate-700">{site.name}</label>
                      </div>
                    ))}
                    {sites.length === 0 && <p className="text-xs text-slate-400">No sites configured yet</p>}
                  </div>
                </div>
                )}
				{(editingUser.custom_role || editingUser.role) === 'Location' && (() => {
                  const selectedSiteBrands = sites
                    .filter(s => (editingUser.default_sites || []).includes(s.id))
                    .flatMap(s => s.brands || []);
                  const availableBrands = [...new Set(selectedSiteBrands)];
                  if (availableBrands.length === 0) return null;
                  return (
                  <div className="space-y-2">
                    <Label>Assigned Brands</Label>
                    <p className="text-xs text-slate-500">Select which brands this Location user can submit claims for. These are the brands available at their assigned branches.</p>
                    <div className="space-y-2 border rounded-md p-3 bg-slate-50 max-h-40 overflow-y-auto">
                      {availableBrands.map((brandId) => (
                        <div key={brandId} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`edit-user-brand-${brandId}`}
                            checked={(editingUser.default_brands || []).includes(brandId)}
                            onChange={(e) => {
                              const current = editingUser.default_brands || [];
                              const updated = e.target.checked ? [...current, brandId] : current.filter(b => b !== brandId);
                              setEditingUser({ ...editingUser, default_brands: updated });
                            }}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label htmlFor={`edit-user-brand-${brandId}`} className="text-sm text-slate-700">{brands.find(b => b.id === brandId)?.name || brandId}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  );
                })()}
                {(editingUser.custom_role || editingUser.role) !== 'Administrator' && (editingUser.custom_role || editingUser.role) !== 'Location' && (
				<div className="space-y-2">
					<Label>Default Branch</Label>
					<Select
					value={editingUser.default_site || '__none__'}
					onValueChange={(value) => setEditingUser({ ...editingUser, default_site: value === '__none__' ? null : value })}
					>
					<SelectTrigger>
						<SelectValue placeholder="No default branch" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="__none__">No default branch</SelectItem>
						{sites.map((site) => (
						<SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
						))}
					</SelectContent>
					</Select>
				</div>
				)}
				{(editingUser.custom_role || editingUser.role) === 'Administrator' && (
					<div className="space-y-2">
					<Label>Assigned Locations</Label>
					<p className="text-xs text-slate-500">Select which locations this Administrator can see. Leave empty for all locations.</p>
					<div className="space-y-2 border rounded-md p-3 bg-slate-50 max-h-40 overflow-y-auto">
						<div className="flex items-center gap-3 pb-2 mb-1 border-b border-slate-200">
							<input
							type="checkbox"
							id="edit-user-admin-site-all"
							checked={(editingUser.default_sites || []).length === 0}
							onChange={(e) => {
								if (e.target.checked) {
								setEditingUser({ ...editingUser, default_sites: [] });
								}
							}}
							className="h-4 w-4 rounded border-gray-300"
							/>
							<label htmlFor="edit-user-admin-site-all" className="text-sm text-slate-700 font-medium">All Locations</label>
						</div>
						{sites.map(site => (
						<div key={site.id} className="flex items-center gap-3">
							<input
							type="checkbox"
							id={`edit-user-admin-site-${site.id}`}
							checked={(editingUser.default_sites || []).includes(site.id)}
							onChange={(e) => {
								const current = editingUser.default_sites || [];
								const updated = e.target.checked ? [...current, site.id] : current.filter(b => b !== site.id);
								setEditingUser({ ...editingUser, default_sites: updated });
							}}
							className="h-4 w-4 rounded border-gray-300"
							/>
							<label htmlFor={`edit-user-admin-site-${site.id}`} className="text-sm text-slate-700">{site.name}</label>
						</div>
						))}
						{sites.length === 0 && <p className="text-xs text-slate-400">No sites configured yet</p>}
					</div>
					</div>
				)}
				{(editingUser.custom_role || editingUser.role) === 'Administrator' && (() => {
                  const adminSiteBrands = (editingUser.default_sites || []).length === 0
                    ? sites.flatMap(s => s.brands || [])
                    : sites.filter(s => (editingUser.default_sites || []).includes(s.id)).flatMap(s => s.brands || []);
                  const availableBrands = [...new Set(adminSiteBrands)];
                  if (availableBrands.length === 0) return null;
                  return (
                  <div className="space-y-2">
                    <Label>Assigned Brands</Label>
                    <p className="text-xs text-slate-500">Restrict this Admin to specific brands. Leave empty for all brands.</p>
                    <div className="space-y-2 border rounded-md p-3 bg-slate-50 max-h-40 overflow-y-auto">
                      <div className="flex items-center gap-3 pb-2 mb-1 border-b border-slate-200">
                        <input
                          type="checkbox"
                          id="edit-user-admin-brand-all"
                          checked={(editingUser.default_brands || []).length === 0}
                          onChange={(e) => {
                            if (e.target.checked) setEditingUser({ ...editingUser, default_brands: [] });
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="edit-user-admin-brand-all" className="text-sm font-medium text-slate-700">All Brands</label>
                      </div>
                      {availableBrands.map((brandId) => (
                        <div key={brandId} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`edit-user-admin-brand-${brandId}`}
                            checked={(editingUser.default_brands || []).includes(brandId)}
                            onChange={(e) => {
                              const current = editingUser.default_brands || [];
                              const updated = e.target.checked ? [...current, brandId] : current.filter(b => b !== brandId);
                              setEditingUser({ ...editingUser, default_brands: updated });
                            }}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label htmlFor={`edit-user-admin-brand-${brandId}`} className="text-sm text-slate-700">{brands.find(b => b.id === brandId)?.name || brandId}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  );
                })()}
				<DialogFooter>
					<Button type="button" variant="outline" onClick={() => setEditingUser(null)}>
					Cancel
					</Button>
					<Button type="submit" disabled={updateUserMutation.isPending}>
					{updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
					</Button>
				</DialogFooter>
				</form>
			)}
			</DialogContent>
		</Dialog>

		{/* Temporary Password Dialog */}
		<Dialog open={showTempPasswordDialog} onOpenChange={setShowTempPasswordDialog}>
			<DialogContent className="sm:max-w-md">
			<DialogHeader>
				<DialogTitle className="text-slate-800">Password Reset Successful</DialogTitle>
			</DialogHeader>
			<div className="space-y-4 my-4">
				<p className="text-sm text-slate-500">
					A temporary password has been successfully generated for the user. Please copy and share this password with them, as it will only be displayed once.
				</p>
				<div className="flex items-center space-x-2">
					<Input
						readOnly
						value={tempPassword || ''}
						className="font-mono bg-slate-50 text-center text-lg select-all flex-1 py-5 border-slate-300 font-semibold"
					/>
					<Button
						type="button"
						className="px-4 py-5"
						style={{ backgroundColor: 'var(--hendy-blue)' }}
						onClick={() => {
							navigator.clipboard.writeText(tempPassword || '');
							alert('Password copied to clipboard!');
						}}
					>
						Copy
					</Button>
				</div>
			</div>
			<DialogFooter className="justify-end">
				<Button type="button" variant="outline" onClick={() => setShowTempPasswordDialog(false)}>
					Close
				</Button>
			</DialogFooter>
			</DialogContent>
		</Dialog>
	</>
	);
}
