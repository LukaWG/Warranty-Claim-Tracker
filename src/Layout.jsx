import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Settings, LayoutDashboard, FileEdit, Search, BarChart3, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SearchModal from '@/components/layout/SearchModal';
import HendyLogo from '@/components/layout/HendyLogo';
import ApplyPendingUserInfo from '@/components/auth/ApplyPendingUserInfo';
// import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { databaseClients } from '@/api/databaseClient';

export default function Layout({ children, currentPageName }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleOverride, setRoleOverride] = useState(null);

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    // [ ] Sort user logic and get current user here. For now just getting me manually
    queryFn: () => databaseClients.clients['User'].query('*', 'email=lwilson-green@hendy-group.com'), // Fetch current user
    staleTime: 30000,
  });
  
  const allNavItems = [
    { name: 'ClaimForm', label: 'Submit Repair', icon: FileEdit, roles: ['Processor', 'Site Manager', 'Service Manager', 'Owner'] },
    { name: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Processor', 'Site Manager', 'Admin Manager', 'Admin', 'Service Manager', 'Owner'] },
    { name: 'Reporting', label: 'Reporting', icon: BarChart3, roles: ['Admin Manager', 'Service Manager', 'Owner'] },
    { name: 'Approvals', label: 'Approvals', icon: ShieldCheck, roles: ['Admin Manager', 'Service Manager', 'Owner'] },
    { name: 'Configuration', label: 'Configuration', icon: Settings, roles: ['Service Manager', 'Owner'] }
  ];

  const displayRole = roleOverride || currentUser?.custom_role || currentUser?.role;
  console.log(currentUser?.email + ' - ' + displayRole + ' - ' + currentUser?.custom_role);
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
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0",
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
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
            MENU
          </div>
          <div className="space-y-1">
            {displayRole !== 'Processor' && displayRole !== 'Site Manager' && (
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
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPageName === item.name;
              return (
                <Link
                  key={item.name}
                  to={createPageUrl(item.name)}
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
          {currentUser && import.meta.env.DEV && (
            <select
              value={roleOverride || currentUser.custom_role || currentUser.role || ''}
              onChange={(e) => setRoleOverride(e.target.value || null)}
              className="w-full mb-3 px-3 py-2 rounded-lg text-xs bg-slate-100 text-slate-600 border-0 hover:bg-slate-200 cursor-pointer"
              title="Preview as role"
            >
              <option value="Processor">View as: Processor</option>
              <option value="Site Manager">View as: Site Manager</option>
              <option value="Admin Manager">View as: Admin Manager</option>
              <option value="Admin">View as: Admin</option>
              <option value="Service Manager">View as: Service Manager</option>
              <option value="Owner">View as: Owner</option>
            </select>
          )}
          <button
            onClick={() => {
              // [ ] Implement log out logic
              // localStorage.removeItem('base44_access_token');
              // localStorage.removeItem('base44_token');
              // localStorage.removeItem('token');
              // base44.auth.redirectToLogin();
              alert("Logged out");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors mb-3"
          >
            <LogOut className="h-5 w-5 text-slate-500" />
            <span className="text-sm font-medium">Logout</span>
          </button>
          {currentUser && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50">
              <div 
                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
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
            </div>
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
    </div>
  );
}