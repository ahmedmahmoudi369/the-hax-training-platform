'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, BookCheck, BarChart, Settings, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Enrollments', href: '/admin/enrollments', icon: BookCheck },
  { name: 'Certifications', href: '/admin/certifications', icon: BookCheck },
  { name: 'Reports', href: '/admin/reports', icon: BarChart },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r bg-white">
        <div className="flex items-center h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-indigo-700">THE HAX Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 mt-4 border-t">
            <button className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 rounded-md hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3 text-red-500" />
              Sign Out
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
