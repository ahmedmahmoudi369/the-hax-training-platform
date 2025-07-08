// src/app/learner/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Home, BookOpen, BookText, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

const navigation = [
  { name: 'Overview', href: '/learner', icon: Home },
  { name: 'Courses', href: '/learner/courses', icon: BookOpen },
  { name: 'Resources', href: '/learner/resources', icon: BookText },
  { name: 'Profile', href: '/learner/profile', icon: User },
  { name: 'Settings', href: '/learner/settings', icon: Settings },
];

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r">
          <div className="flex items-center h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-indigo-700">THE HAX Platform</h1>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/learner' && pathname?.startsWith(item.href));
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
      </aside>
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}