import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, MapPin, AlertCircle, Settings, Tag, Users, Mail, Pencil, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EditBrandModal from '@/components/configuration/EditBrandModal';
import { getData } from '@/api/databaseClient';

export default function Configuration() {
  const queryClient = useQueryClient();
  const [newSite, setNewSite] = useState({ name: '', code: '' });
  const [editingSite, setEditingSite] = useState(null);
  const [newAlert, setNewAlert] = useState({ name: '' });
  const [newResolution, setNewResolution] = useState({ name: '' });
  const [newBrand, setNewBrand] = useState({ name: '', manufacturer_deadline_days: '', green_min_days: '', green_max_days: '', amber_min_days: '', amber_max_days: '', red_min_days: '', red_max_days: '' });
  const [newUser, setNewUser] = useState({ email: '', role: 'Processor', first_name: '', last_name: '', default_site: '' });
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingBrandDeadlines, setEditingBrandDeadlines] = useState({});
  const [editingBrandThresholds, setEditingBrandThresholds] = useState({});
  const [editingBrand, setEditingBrand] = useState(null);

  // fetch site data and store in sites state without using useQuery to demonstrate direct database access for simple data retrieval
  const [sites, setSites] = useState([]);
  const [sitesLoading, setSitesLoading] = useState(true);
  React.useEffect(() => {
    async function fetchSites() {
      setSitesLoading(true);
      try {
        const data = await getData('Site', '*');
        setSites(data);
      } catch (error) {
        console.error('Failed to fetch sites:', error);
        alert('Failed to fetch sites. Please check the console for more details.');
      } finally {
        setSitesLoading(false);
      }
    }
    fetchSites();
  }, []);

  // const { data: sites = [], isLoading: sitesLoading } = useQuery({
  //   queryKey: ['sites'],
  //   queryFn: () => getData('sites', '*')
  // });


  const [alerts, setAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  React.useEffect(() => {
    async function fetchAlerts() {
      setAlertsLoading(true);
      try {
        const data = await getData('Alert', '*');
        setAlerts(data);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
        alert('Failed to fetch alerts. Please check the console for more details.');
      } finally {
        setAlertsLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  // const { data: alerts = [], isLoading: alertsLoading } = useQuery({
  //   queryKey: ['alerts'],
  //   queryFn: () => base44.entities.Alert.list('-created_date')
  // });


  const [resolutions, setResolutions] = useState([]);
  const [resolutionsLoading, setResolutionsLoading] = useState(true);
  React.useEffect(() => {
    async function fetchResolutions() {
      setResolutionsLoading(true);
      try {
        const data = await getData('AlertResolution', '*');
        setResolutions(data);
      } catch (error) {
        console.error('Failed to fetch resolutions:', error);
        alert('Failed to fetch resolutions. Please check the console for more details.');
      } finally {
        setResolutionsLoading(false);
      }
    }
    fetchResolutions();
  }, []);

  // const { data: resolutions = [], isLoading: resolutionsLoading } = useQuery({
  //   queryKey: ['resolutions'],
  //   queryFn: () => base44.entities.AlertResolution.list('-created_date')
  // });


  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  React.useEffect(() => {
    async function fetchBrands() {
      setBrandsLoading(true);
      try {
        const data = await getData('Brand', '*');
        setBrands(data);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
        alert('Failed to fetch brands. Please check the console for more details.');
      } finally {
        setBrandsLoading(false);
      }
    }
    fetchBrands();
  }, []);


  // const { data: brands = [], isLoading: brandsLoading } = useQuery({
  //   queryKey: ['brands'],
  //   queryFn: () => base44.entities.Brand.list('-created_date')
  // });


  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  React.useEffect(() => {
    async function fetchUsers() {
      setUsersLoading(true);
      try {
        const data = await getData('User', '*');
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        alert('Failed to fetch users. Please check the console for more details.');
      } finally {
        setUsersLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // const { data: users = [], isLoading: usersLoading } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: () => base44.entities.User.list('-created_date')
  // });


  const [pendingInvites, setPendingInvites] = useState([]);
  const [pendingInvitesLoading, setPendingInvitesLoading] = useState(true);
  React.useEffect(() => {
    async function fetchPendingInvites() {
      setPendingInvitesLoading(true);
      try {
        const data = await getData('PendingUserInvite', '*');
        setPendingInvites(data);
      } catch (error) {
        console.error('Failed to fetch pending invites:', error);
        alert('Failed to fetch pending invites. Please check the console for more details.');
      } finally {
        setPendingInvitesLoading(false);
      }
    }
    fetchPendingInvites();
  }, []);

  // const { data: pendingInvites = [], isLoading: pendingInvitesLoading } = useQuery({
  //   queryKey: ['pendingInvites'],
  //   queryFn: () => base44.entities.PendingUserInvite.list('-created_date')
  // });

  const deletePendingInviteMutation = useMutation({
    mutationFn: (id) => base44.entities.PendingUserInvite.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingInvites'] })
  });

  const createSiteMutation = useMutation({
    mutationFn: (data) => base44.entities.Site.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setNewSite({ name: '', code: '' });
    }
  });

  const updateSiteMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Site.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setEditingSite(null);
    }
  });

  const deleteSiteMutation = useMutation({
    mutationFn: (id) => base44.entities.Site.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] })
  });

  const createAlertMutation = useMutation({
    mutationFn: (data) => base44.entities.Alert.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      setNewAlert({ name: '' });
    }
  });

  const deleteAlertMutation = useMutation({
    mutationFn: (id) => base44.entities.Alert.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] })
  });

  const createResolutionMutation = useMutation({
    mutationFn: (data) => base44.entities.AlertResolution.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resolutions'] });
      setNewResolution({ name: '' });
    }
  });

  const deleteResolutionMutation = useMutation({
    mutationFn: (id) => base44.entities.AlertResolution.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['resolutions'] })
  });

  const createBrandMutation = useMutation({
    mutationFn: (data) => base44.entities.Brand.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setNewBrand({ name: '', manufacturer_deadline_days: '', green_min_days: '', green_max_days: '', amber_min_days: '', amber_max_days: '', red_min_days: '', red_max_days: '' });
    }
  });

  const updateBrandMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Brand.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] })
  });

  const deleteBrandMutation = useMutation({
    mutationFn: (id) => base44.entities.Brand.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] })
  });

  const handleSiteSubmit = (e) => {
    e.preventDefault();
    if (newSite.name.trim()) {
      createSiteMutation.mutate({ name: newSite.name, code: newSite.code || null });
    }
  };

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    if (newAlert.name.trim()) {
      createAlertMutation.mutate(newAlert);
    }
  };

  const handleResolutionSubmit = (e) => {
    e.preventDefault();
    if (newResolution.name.trim()) {
      createResolutionMutation.mutate(newResolution);
    }
  };

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

  const inviteUserMutation = useMutation({
    mutationFn: async ({ email, role, first_name, last_name, default_site }) => {
      console.log('Inviting user:', { email, role, first_name, last_name });
      
      // Map custom role to platform role (admin or user)
      // Only Owner has platform admin access for configuration management
      const platformRole = (role === 'Owner') ? 'admin' : 'user';
      
      // Store pending user information for when they register
      await base44.entities.PendingUserInvite.create({
        email: email,
        custom_role: role,
        first_name: first_name,
        last_name: last_name,
        default_site: default_site || null
      });
      
      // Invite user with platform role
      await base44.users.inviteUser(email, platformRole);
      console.log('User invited and pending info stored');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setNewUser({ email: '', role: 'Processor', first_name: '', last_name: '' });
      setShowUserDialog(false);
    },
    onError: (error) => {
      console.error('Failed to invite user:', error);
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      alert(`Failed to invite user: ${errorMessage}\n\nPlease check the console for more details.`);
    }
  });

  const resendInviteMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const platformRole = role === 'Admin Manager' ? 'admin' : 'user';
      await base44.users.inviteUser(email, platformRole);
    }
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ id, role }) => {
      return base44.entities.User.update(id, { custom_role: role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Failed to update user role:', error);
      alert('Failed to update user role. Please try again.');
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.User.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditingUser(null);
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => base44.entities.User.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  });

  const handleUserInvite = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    try {
      await base44.auth.me();
    } catch (error) {
      alert('You must be logged in to invite users. Please refresh the page and log in.');
      return;
    }
    
    if (newUser.email.trim()) {
      inviteUserMutation.mutate({
        email: newUser.email,
        role: newUser.role,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        default_site: newUser.default_site || null
      });
    }
  };

  const handleUserEdit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUserMutation.mutate({
        id: editingUser.id,
        data: {
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          custom_role: editingUser.custom_role || editingUser.role,
          default_site: editingUser.default_site || null
        }
      });
    }
  };

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
            Manage sites and alerts for warranty claims
          </p>
        </div>

        <Tabs defaultValue="sites" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="sites" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Sites
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

          {/* Sites Tab */}
          <TabsContent value="sites">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-0 shadow-xl bg-white mb-8">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Site
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSiteSubmit} className="flex gap-4">
                    <div className="flex-1">
                      <Label className="text-sm">Site Name *</Label>
                      <Input
                        placeholder="Enter site name"
                        value={newSite.name}
                        onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Site Code</Label>
                      <Input
                        placeholder="Enter site code (optional)"
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
                        Add Site
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
                    All Sites ({sites.length})
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
                      <p className="text-slate-600 font-medium">No sites configured</p>
                      <p className="text-sm text-slate-400 mt-1">Add your first site location above</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                          <TableHead className="font-semibold text-slate-600">Site Name</TableHead>
                          <TableHead className="font-semibold text-slate-600">Site Code</TableHead>
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
                                  {<span key="all-brands" className="inline-block text-xs bg-slate-100 text-slate-700 rounded px-2 py-0.5">{site.brands.length} brands</span>
                                  /* {site.brands.map(brand => (
                                    <span key={brand} className="inline-block text-xs bg-slate-100 text-slate-700 rounded px-2 py-0.5">{brand}</span>
                                  ))} */}
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
                                  title="Edit site"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    if (window.confirm(`Delete site "${site.name}"?`)) {
                                      deleteSiteMutation.mutate(site.id);
                                    }
                                  }}
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
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands">
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
                                  onClick={() => {
                                    if (window.confirm(`Delete brand "${brand.name}"?`)) {
                                      deleteBrandMutation.mutate(brand.id);
                                    }
                                  }}
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
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
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
          </TabsContent>

          {/* Resolutions Tab */}
          <TabsContent value="resolutions">
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
                                onClick={() => {
                                  if (window.confirm(`Delete resolution "${resolution.name}"?`)) {
                                    deleteResolutionMutation.mutate(resolution.id);
                                  }
                                }}
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
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
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
                                value={user.custom_role || user.role || 'Processor'}
                                onChange={(e) => {
                                  const newRole = e.target.value;
                                  if (window.confirm(`Change ${user.email}'s role to ${newRole}?`)) {
                                    updateUserRoleMutation.mutate({
                                      id: user.id,
                                      role: newRole
                                    });
                                  }
                                }}
                                disabled={updateUserRoleMutation.isPending}
                                className="h-8 px-2 rounded border border-input bg-background text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <option value="Processor">Processor</option>
                                <option value="Site Manager">Site Manager</option>
                                <option value="Admin">Admin</option>
                                <option value="Admin Manager">Admin Manager</option>
                                <option value="Service Manager">Service Manager</option>
                                <option value="Owner">Owner</option>
                              </select>
                            </TableCell>
                            <TableCell className="text-slate-600">
                              {new Date(user.created_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingUser(user)}
                                  className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                  title="Edit user"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    resendInviteMutation.mutate({ 
                                      email: user.email, 
                                      role: user.custom_role || user.role 
                                    });
                                  }}
                                  disabled={resendInviteMutation.isPending}
                                  className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                  title="Send invite email"
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    if (window.confirm(`Delete user "${user.email}"?`)) {
                                      deleteUserMutation.mutate(user.id);
                                    }
                                  }}
                                  className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
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
          </TabsContent>
        </Tabs>

        {/* Add User Dialog */}
        <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
          <DialogContent>
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
                    <SelectItem value="Processor">Processor</SelectItem>
                    <SelectItem value="Site Manager">Site Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Admin Manager">Admin Manager</SelectItem>
                    <SelectItem value="Service Manager">Service Manager</SelectItem>
                    <SelectItem value="Owner">Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                      <SelectItem key={site.id} value={site.name}>{site.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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

        {/* Edit Site Dialog */}
        <Dialog open={!!editingSite} onOpenChange={(open) => !open && setEditingSite(null)}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Site</DialogTitle>
            </DialogHeader>
            {editingSite && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const brandRates = {};
                  brands.forEach(brand => {
                    const val = editingSite.brand_hourly_rates?.[brand.name];
                    if (val !== undefined && val !== '') {
                      brandRates[brand.name] = parseFloat(val);
                    }
                  });
                  updateSiteMutation.mutate({
                    id: editingSite.id,
                    data: {
                      name: editingSite.name,
                      code: editingSite.code || null,
                      brands: editingSite.brands || [],
                      brand_hourly_rates: Object.keys(brandRates).length > 0 ? brandRates : null
                    }
                  });
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Site Name *</Label>
                  <Input
                    placeholder="Site name"
                    value={editingSite.name || ''}
                    onChange={(e) => setEditingSite({ ...editingSite, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Site Code</Label>
                  <Input
                    placeholder="Site code (optional)"
                    value={editingSite.code || ''}
                    onChange={(e) => setEditingSite({ ...editingSite, code: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Available Brands at this Site</Label>
                  <p className="text-xs text-slate-500">Select which brands are available at this site.</p>
                  <div className="space-y-2 border rounded-md p-3 bg-slate-50">
                    {brands.map(brand => {
                      const isChecked = (editingSite.brands || []).includes(brand.name);
                      return (
                        <div key={brand.id} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`brand-${brand.id}`}
                            checked={isChecked}
                            onChange={(e) => {
                              const current = editingSite.brands || [];
                              const updated = e.target.checked
                                ? [...current, brand.name]
                                : current.filter(b => b !== brand.name);
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Hourly Rate per Brand (£)</Label>
                  <p className="text-xs text-slate-500">Set a rate per brand. Leave blank to exclude that brand.</p>
                  <div className="space-y-2 border rounded-md p-3 bg-slate-50">
                    {brands.map(brand => (
                      <div key={brand.id} className="flex items-center gap-3">
                        <span className="text-sm text-slate-700 w-32 flex-shrink-0">{brand.name}</span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="e.g. 85.00"
                          value={editingSite.brand_hourly_rates?.[brand.name] ?? ''}
                          onChange={(e) => setEditingSite({
                            ...editingSite,
                            brand_hourly_rates: {
                              ...(editingSite.brand_hourly_rates || {}),
                              [brand.name]: e.target.value
                            }
                          })}
                          className="h-8 bg-white"
                        />
                      </div>
                    ))}
                    {brands.length === 0 && (
                      <p className="text-xs text-slate-400">No brands configured yet</p>
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

        {/* Edit User Dialog */}
        <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
          <DialogContent>
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
                      <SelectItem value="Processor">Processor</SelectItem>
                      <SelectItem value="Site Manager">Site Manager</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Admin Manager">Admin Manager</SelectItem>
                      <SelectItem value="Service Manager">Service Manager</SelectItem>
                      <SelectItem value="Owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                        <SelectItem key={site.id} value={site.name}>{site.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
      </div>
    </div>
  );
}