'use client';

import { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
  role?: 'admin' | 'learner';
}

export function AppLayout({ children, role = 'learner' }: AppLayoutProps) {
  // Define navigation items based on user role
  const navItems = [
    {
      name: 'Dashboard',
      href: role === 'admin' ? '/admin/dashboard' : '/learner/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Courses',
      href: role === 'admin' ? '/admin/courses' : '/learner/courses',
      icon: <BookOpen size={20} />,
    },
  ];

  // Add admin-only items
  if (role === 'admin') {
    navItems.push(
      {
        name: 'Users',
        href: '/admin/users',
        icon: <Users size={20} />,
      },
      {
        name: 'Settings',
        href: '/admin/settings',
        icon: <Settings size={20} />,
      }
    );
  }

  // Add sign out button
  navItems.push({
    name: 'Sign Out',
    href: '/signin',
    icon: <LogOut size={20} />,
  });

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar items={navItems} />
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto md:ml-16 lg:ml-64 transition-all duration-300">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
