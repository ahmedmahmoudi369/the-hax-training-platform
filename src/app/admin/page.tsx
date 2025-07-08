'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Award, Activity, Plus } from 'lucide-react';
import Link from 'next/link';
import { LocalizedDate } from '@/components/LocalizedDate';

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
};

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={`text-xs mt-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}
        </p>
      )}
    </CardContent>
  </Card>
);

type ActivityItem = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  action: string;
  timestamp: string;
};

const RecentActivity = () => {
  // Mock data - replace with real data from your API
  const activities: ActivityItem[] = [
    {
      id: '1',
      user: { name: 'Alex Johnson', email: 'alex@example.com' },
      action: 'Completed course "Advanced React"',
      timestamp: '2023-06-15T14:32:00Z',
    },
    {
      id: '2',
      user: { name: 'Sam Wilson', email: 'sam@example.com' },
      action: 'Submitted assignment "Final Project"',
      timestamp: '2023-06-14T09:15:00Z',
    },
    {
      id: '3',
      user: { name: 'Jordan Lee', email: 'jordan@example.com' },
      action: 'Registered for course "UI/UX Design"',
      timestamp: '2023-06-13T16:45:00Z',
    },
    {
      id: '4',
      user: { name: 'Taylor Swift', email: 'taylor@example.com' },
      action: 'Earned certificate "JavaScript Fundamentals"',
      timestamp: '2023-06-12T11:20:00Z',
    },
    {
      id: '5',
      user: { name: 'Chris Evans', email: 'chris@example.com' },
      action: 'Completed course "Node.js Advanced"',
      timestamp: '2023-06-11T18:05:00Z',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions on the platform</CardDescription>
          </div>
          <Link href="/admin/reports">
            <Button variant="outline" size="sm">
              View All Activity
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name} <span className="text-muted-foreground">({activity.user.email})</span>
                </p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <LocalizedDate isoString={activity.timestamp} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

type QuickActionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  href: string;
};

const QuickActionCard = ({
  title,
  description,
  icon,
  buttonText,
  href,
}: QuickActionCardProps) => (
  <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
    <CardHeader className="pb-2">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {icon}
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <div className="mt-auto p-6 pt-0">
      <Link href={href} className="w-full">
        <Button variant="outline" className="w-full">
          {buttonText}
        </Button>
      </Link>
    </div>
  </Card>
);

export default function AdminDashboard() {
  // Mock data - replace with real data from your API
  const stats = [
    {
      title: 'Total Users',
      value: '1,284',
      icon: <Users className="h-4 w-4 text-primary" />,
      trend: { value: '+12% from last month', isPositive: true },
      href: '/admin/users',
    },
    {
      title: 'Total Courses',
      value: '42',
      icon: <BookOpen className="h-4 w-4 text-primary" />,
      trend: { value: '+3 new this month', isPositive: true },
      href: '/admin/courses',
    },
    {
      title: 'Certificates Issued',
      value: '856',
      icon: <Award className="h-4 w-4 text-primary" />,
      trend: { value: '+24% from last month', isPositive: true },
      href: '/admin/certifications',
    },
    {
      title: 'Active Students (7d)',
      value: '342',
      icon: <Activity className="h-4 w-4 text-primary" />,
      trend: { value: '+8.2% from last week', isPositive: true },
      href: '/admin/reports',
    },
  ];

  const quickActions: QuickActionCardProps[] = [
    {
      title: 'Manage Users',
      description: 'View and manage all user accounts and permissions',
      icon: <Users className="h-5 w-5 text-primary" />,
      buttonText: 'View All Users',
      href: '/admin/users',
    },
    {
      title: 'Manage Courses',
      description: 'Upload and manage training content',
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      buttonText: 'View All Courses',
      href: '/admin/courses',
    },
    {
      title: 'Issue Certificates',
      description: 'Manage and issue course completion certificates',
      icon: <Award className="h-5 w-5 text-primary" />,
      buttonText: 'View Certificate Requests',
      href: '/admin/certifications',
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Link href="/admin/courses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href} className="block hover:opacity-80 transition-opacity">
            <StatCard {...stat} />
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {quickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <RecentActivity />
      </div>
    </>
  );
}
