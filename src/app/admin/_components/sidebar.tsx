'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, FileCheck, BarChart, Settings, User, LogOut, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    name: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Courses',
    href: '/admin/courses',
    icon: BookOpen,
  },
  {
    name: 'Enrollments',
    href: '/admin/enrollments',
    icon: UserPlus,
  },
  {
    name: 'Certifications',
    href: '/admin/certifications',
    icon: FileCheck,
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: BarChart,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r bg-gray-50">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <div className="flex flex-col flex-1 px-3">
            <nav className="flex-1 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center px-4 py-3 text-sm font-medium rounded-md',
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-gray-600 hover:bg-gray-100',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5',
                        isActive ? 'text-primary' : 'text-gray-400',
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="px-3 py-4 border-t">
            <Link
              href="/admin/profile"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
            >
              <User className="w-5 h-5 mr-3 text-gray-400" />
              Profile
            </Link>
            <Link
              href="/logout"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-400" />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
