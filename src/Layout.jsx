import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createPageUrl } from './utils';
import {
  Settings,
  LayoutDashboard,
  FileEdit,
  Search,
  BarChart3,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Key,
  Lock,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SearchModal from '@/components/layout/SearchModal';
import HendyLogo from '@/components/layout/HendyLogo';
import ApplyPendingUserInfo from '@/components/auth/ApplyPendingUserInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { authClient, useSession, signOut } from "@/lib/auth-client";
import { authUsers } from '@/api/authClient';
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Layout({ children, currentPageName }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(router.pathname);

  // Voluntary Password Change States
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [changeError, setChangeError] = useState("");
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);

  // Forced Password Change States
  const [forcedCurrentPassword, setForcedCurrentPassword] = useState("");
  const [forcedNewPassword, setForcedNewPassword] = useState("");
  const [forcedConfirmPassword, setForcedConfirmPassword] = useState("");
  const [forcedShowPasswords, setForcedShowPasswords] = useState(false);
  const [forcedError, setForcedError] = useState("");
  const [forcedLoading, setForcedLoading] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      router.push("/login");
    }
  };

  // CHANGING USER
  const [actingUserId, setActingUserId] = useState(() => databaseClients.User.getActingUserId());

  useEffect(() => {
    const handleActingUserChanged = () => {
      setActingUserId(databaseClients.User.getActingUserId());
    };

    window.addEventListener('acting-user-changed', handleActingUserChanged);
    return () => window.removeEventListener('acting-user-changed', handleActingUserChanged);
  }, []);

  // END CHANGING USER

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', actingUserId],
    // [ ] Sort user logic and get current user here. For now just getting me manually
    queryFn: () => databaseClients.User.me(),
    staleTime: 30000,
  });

  const { data: accounts = [] } = useQuery({
    queryKey: ['userAccounts', currentUser?.id],
    queryFn: async () => {
      const res = await authClient.listAccounts();
      return res?.data ?? [];
    },
    enabled: !!currentUser?.id,
  });

  const isSSO = accounts.length > 0 && !accounts.some(acc => acc.providerId === 'credential');

  const handleVoluntaryPasswordChange = async (e) => {
    e.preventDefault();
    setChangeError("");
    setChangeSuccess(false);

    if (newPassword.length < 8) {
      setChangeError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangeError("New passwords do not match.");
      return;
    }

    setChangeLoading(true);
    try {
      const res = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      });

      if (res?.error) {
        throw new Error(res.error.message || "Failed to change password.");
      }

      setChangeSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        setChangePasswordOpen(false);
        setChangeSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Change password failed:", err);
      setChangeError(err.message || "Failed to update password. Please check your current password.");
    } finally {
      setChangeLoading(false);
    }
  };

  const handleForcedPasswordChange = async (e) => {
    e.preventDefault();
    setForcedError("");

    if (forcedNewPassword.length < 8) {
      setForcedError("New password must be at least 8 characters long.");
      return;
    }

    if (forcedNewPassword !== forcedConfirmPassword) {
      setForcedError("New passwords do not match.");
      return;
    }

    setForcedLoading(true);
    try {
      const res = await authClient.changePassword({
        currentPassword: forcedCurrentPassword,
        newPassword: forcedNewPassword,
        revokeOtherSessions: false,
      });

      if (res?.error) {
        throw new Error(res.error.message || "Failed to update password.");
      }

      await authUsers.updateMe({ must_change_password: false });
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    } catch (err) {
      console.error("Forced password change failed:", err);
      setForcedError(err.message || "Failed to update password. Please check your temporary password.");
    } finally {
      setForcedLoading(false);
    }
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (currentUser?.must_change_password === true) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1e2548] to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#56C4B7]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#222b57]/30 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10 text-white">
          <div className="text-center mb-8">
            <div className="text-3xl font-extrabold tracking-wider text-white mb-1">
              HENDY
            </div>
            <div className="text-xs text-slate-400 mb-4 font-medium tracking-widest">EST. 1859</div>
            <h2 className="text-xl font-semibold tracking-tight text-white mb-2">
              Update Your Password
            </h2>
            <p className="text-sm text-slate-300">
              For security, you must update your temporary password before you can access the system.
            </p>
          </div>

          <form onSubmit={handleForcedPasswordChange} className="space-y-4">
            {forcedError && (
              <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200 text-sm font-medium leading-relaxed">
                {forcedError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Temporary Password
              </label>
              <div className="relative">
                <input
                  type={forcedShowPasswords ? "text" : "password"}
                  value={forcedCurrentPassword}
                  onChange={(e) => setForcedCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#56C4B7] focus:border-transparent transition-all pr-10 text-sm"
                  placeholder="Enter temporary password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setForcedShowPasswords(!forcedShowPasswords)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {forcedShowPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                New Password
              </label>
              <input
                type={forcedShowPasswords ? "text" : "password"}
                value={forcedNewPassword}
                onChange={(e) => setForcedNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#56C4B7] focus:border-transparent transition-all text-sm"
                placeholder="At least 8 characters"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Confirm New Password
              </label>
              <input
                type={forcedShowPasswords ? "text" : "password"}
                value={forcedConfirmPassword}
                onChange={(e) => setForcedConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#56C4B7] focus:border-transparent transition-all text-sm"
                placeholder="Re-enter new password"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={forcedLoading}
                className="w-full bg-[#56C4B7] hover:bg-[#45b2a5] text-slate-950 font-semibold py-2.5 h-auto transition-colors flex items-center justify-center gap-2"
              >
                {forcedLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
                Save Password & Continue
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 mx-auto font-medium"
            >
              <LogOut className="h-4 w-4" />
              Sign Out from Account
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const allNavItems = [
    { name: 'ClaimForm', label: 'Submit Repair', icon: FileEdit, roles: ['Processor', 'Site Manager', 'Service Manager', 'Owner'] },
    { name: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Processor', 'Site Manager', 'Admin Manager', 'Admin', 'Service Manager', 'Owner'] },
    // { name: 'Reporting', label: 'Reporting', icon: BarChart3, roles: ['Admin Manager', 'Service Manager', 'Owner'] },
    { name: 'Approvals', label: 'Approvals', icon: ShieldCheck, roles: ['Admin Manager', 'Service Manager', 'Owner'] },
    { name: 'Configuration', label: 'Configuration', icon: Settings, roles: ['Service Manager', 'Admin Manager', 'Owner'] }
  ];

  const displayRole = currentUser?.custom_role || currentUser?.role;
  const navItems = currentUser 
    ? allNavItems.filter(item => item.roles.includes(displayRole))
    : allNavItems;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <ApplyPendingUserInfo />
      <style>{`
        :root {
          --hendy-blue: #222b57;
          --hendy-teal: #56C4B7;
          --hendy-grey: #575756;
        }
      `}</style>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-52 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo & Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold tracking-wider" style={{ color: 'var(--hendy-blue)' }}>
              HENDY
            </div>
            <div className="text-xs text-slate-500 mb-1">EST. 1859</div>
            <div className="text-sm font-medium" style={{ color: 'var(--hendy-teal)' }}>
              Warranty Repair Manager
            </div>
            {currentUser && (
              <div className="mt-2">
                <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'var(--hendy-teal)' }}>
                  {displayRole || 'User'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
            MENU
          </div>
          <div className="space-y-1">
            {/* {displayRole !== 'Processor' && displayRole !== 'Site Manager' && ( // Search repairs button
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Search className="h-5 w-5 text-slate-500" />
                <span className="text-sm font-medium">Search Repairs</span>
              </button>
            )} */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPageName === item.name;
              return (
                <Link
                  key={item.name}
                  href={createPageUrl(item.name)}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                  style={isActive ? { backgroundColor: 'var(--hendy-blue)' } : {}}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-500")} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-200">
          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/50 hover:bg-slate-100/80 active:scale-[0.98] transition-all text-left outline-none cursor-pointer">
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: 'var(--hendy-blue)' }}
                  >
                    {currentUser.full_name?.charAt(0).toUpperCase() || currentUser.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {currentUser.full_name || 'User'}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {currentUser.email}
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-1.5 z-50 mb-2" align="start">
                <DropdownMenuLabel className="px-2.5 py-2">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Account</p>
                  <p className="text-sm font-medium text-slate-800 truncate mt-0.5">{currentUser.full_name || 'User'}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />
                {!isSSO && (
                  <DropdownMenuItem 
                    onClick={() => setChangePasswordOpen(true)}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-slate-700 focus:text-slate-900 focus:bg-slate-50 rounded-md cursor-pointer text-sm"
                  >
                    <Key className="h-4 w-4 text-slate-500" />
                    <span>Change Password</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-2.5 py-2 text-rose-600 focus:text-rose-700 focus:bg-rose-50 rounded-md cursor-pointer text-sm"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <HendyLogo size={24} variant="icon" />
            <span className="text-sm font-bold" style={{ color: 'var(--hendy-blue)' }}>HENDY</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Voluntary Change Password Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your password to keep your account secure.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVoluntaryPasswordChange} className="space-y-4 py-2">
            {changeError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
                {changeError}
              </div>
            )}
            {changeSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                Password updated successfully! Closing...
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#56C4B7]"
                  placeholder="Enter current password"
                  required
                  disabled={changeSuccess || changeLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                New Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#56C4B7]"
                placeholder="At least 8 characters"
                required
                disabled={changeSuccess || changeLoading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Confirm New Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#56C4B7]"
                placeholder="Confirm new password"
                required
                disabled={changeSuccess || changeLoading}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setChangePasswordOpen(false)}
                disabled={changeLoading || changeSuccess}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={changeLoading || changeSuccess}
                className="bg-[#222b57] hover:bg-[#1b2246] text-white flex items-center gap-2"
              >
                {changeLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
                Change Password
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}