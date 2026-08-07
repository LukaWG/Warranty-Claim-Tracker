import React, { useState } from 'react';
import Link from 'next/link';
import { createPageUrl } from './utils';
import {
  Settings,
  LayoutDashboard,
  FileEdit,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Key,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  MessageSquare
} from 'lucide-react';
import UnreadBadge from '@/components/messages/UnreadBadge';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SearchModal from '@/components/layout/SearchModal';
import HendyLogo from '@/components/layout/HendyLogo';
import ApplyPendingUserInfo from '@/components/auth/ApplyPendingUserInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';
import { currentUser as currentUserClient } from '@/api/currentUser';
import { authClient, signOut } from "@/lib/auth-client";
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

// Roles allowed to view each page. Pages omitted here have no role
// restriction (any authenticated user may view them). Shared between nav
// rendering and route-level access enforcement so they can't drift apart.
const PAGE_ROLES = {
  ClaimForm: ['Location', 'Administrator', 'Group Manager', 'Owner'],
  Dashboard: ['Location', 'Group Manager', 'Administrator', 'Owner'],
  Approvals: ['Group Manager', 'Owner'],
  ApprovalMessages: ['Group Manager', 'Owner'],
  Messages: ['Location', 'Administrator', 'Group Manager', 'Owner'],
  Configuration: ['Group Manager', 'Owner'],
};

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
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
    } finally {
      setIsLoggingOut(false);
    }
  };

  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    refetch: refetchCurrentUser,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => currentUserClient.me(),
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

  // Must run on every render (including auth pages) — a hook below the
  // isAuthPage early return crashes React on client-side navigation to /login.
  const { data: pendingApprovals = [] } = useQuery({
    queryKey: ['pending-approvals', currentUser?.email],
    queryFn: () => databaseClients.WarrantyClaim.filter({ approval_status: 'pending_approval' }),
    enabled: !isAuthPage && !!currentUser?.email,
    refetchInterval: 30000,
  });

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

  const displayRole = currentUser?.custom_role || currentUser?.role;
  const requiredRoles = PAGE_ROLES[currentPageName];
  // Fail closed: a restricted page is "authorized" only once the role fetch has
  // positively succeeded and the role is on the allow-list. Still loading, a
  // failed fetch, or an unrecognized role are all treated as NOT authorized —
  // never render restricted content on the strength of an absent/slow answer.
  const isRoleKnown = !isCurrentUserLoading && !isCurrentUserError && !!currentUser;
  const isRolePermitted = isRoleKnown && !!requiredRoles?.includes(displayRole);
  const isAuthorized = !requiredRoles || isRolePermitted;

  React.useEffect(() => {
    if (isAuthPage || !requiredRoles) return;
    if (isCurrentUserError) {
      // Can't confirm identity/role at all — deny and force re-auth rather than
      // leaving the page hanging or, worse, rendering it.
      router.replace(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
      return;
    }
    if (isRoleKnown && !isRolePermitted) {
      router.replace(createPageUrl('ClaimForm'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthPage, requiredRoles, isCurrentUserError, isRoleKnown, isRolePermitted, router]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  const pendingApprovalsCount = pendingApprovals.length;

  const allNavItems = [
    { name: 'ClaimForm', label: 'Submit Repair', icon: FileEdit, roles: PAGE_ROLES.ClaimForm },
    { name: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: PAGE_ROLES.Dashboard },
    { name: 'Approvals', label: 'Approvals', icon: ShieldCheck, roles: PAGE_ROLES.Approvals },
    { name: 'Messages', label: 'Messages', icon: MessageSquare, roles: PAGE_ROLES.Messages },
    { name: 'Configuration', label: 'Configuration', icon: Settings, roles: PAGE_ROLES.Configuration }
  ];

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
              Group Warranty Portal
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
            {/* {displayRole !== 'Location' && ( // Search repairs button
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
                  {item.name === 'Messages' && currentUser && (
                    <UnreadBadge currentUser={currentUser} />
                  )}
                  {item.name === 'Approvals' && pendingApprovalsCount > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full text-white text-xs font-bold px-1" style={{backgroundColor: 'var(--hendy-teal)'}}>
                      {pendingApprovalsCount > 99 ? '99+' : pendingApprovalsCount}
                    </span>
                  )}
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
                  disabled={isLoggingOut}
                  className="flex items-center gap-2.5 px-2.5 py-2 text-rose-600 focus:text-rose-700 focus:bg-rose-50 rounded-md cursor-pointer text-sm"
                >
                  {isLoggingOut ? (
                    <Loader2 className="h-4 w-4 text-rose-500 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4 text-rose-500" />
                  )}
                  <span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
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
          {isAuthorized ? children : isCurrentUserError ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-center px-4">
              <p className="text-sm text-slate-600 max-w-sm">
                We couldn&apos;t verify your access to this page. Redirecting you to sign in…
              </p>
              <Button variant="outline" size="sm" onClick={() => refetchCurrentUser()}>
                Try again
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          )}
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