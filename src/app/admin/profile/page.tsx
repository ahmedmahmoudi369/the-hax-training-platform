// src/app/admin/profile/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Mail, Phone, Shield, Settings, Activity, Users, Bell, Key } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'learner';
  phone: string;
  lastLogin: string;
  avatar?: string;
  department: string;
  permissions: string[];
};

type ActivityLog = {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  status: 'success' | 'failed' | 'warning';
};

const AdminProfilePage = () => {
  const [user, setUser] = useState<User>({
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@thehax.com',
    role: 'admin',
    phone: '+1 (555) 123-4567',
    lastLogin: new Date().toISOString(),
    department: 'Administration',
    permissions: [
      'manage_users',
      'manage_courses',
      'manage_content',
      'view_reports',
      'system_settings'
    ]
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 'log-001',
      action: 'Logged in',
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.1',
      status: 'success'
    },
    {
      id: 'log-002',
      action: 'Updated user permissions',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ipAddress: '192.168.1.1',
      status: 'success'
    },
    {
      id: 'log-003',
      action: 'Created new course',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      ipAddress: '192.168.1.2',
      status: 'success'
    },
    {
      id: 'log-004',
      action: 'Failed login attempt',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      ipAddress: '203.0.113.5',
      status: 'failed'
    },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New user registration', description: 'John Doe has registered for an account', read: false, timestamp: '2 minutes ago' },
    { id: 2, title: 'System Update', description: 'Scheduled maintenance this weekend', read: false, timestamp: '1 hour ago' },
    { id: 3, title: 'New message', description: 'You have a new message from Support Team', read: true, timestamp: '3 hours ago' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    department: user.department,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUser(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
    // Here you would typically make an API call to update the user
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <Settings className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="h-4 w-4 mr-2" />
            Activity Log
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-lg font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                  </div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Last login: {new Date(user.lastLogin).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account information and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={isEditing ? formData.name : user.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={isEditing ? formData.email : user.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={isEditing ? formData.phone : user.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={isEditing ? formData.department : user.department}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Role & Permissions</Label>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-indigo-500" />
                      <span className="font-medium">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Permissions
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user.permissions.map(permission => (
                        <span 
                          key={permission}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
                        >
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>View your recent account activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map(log => (
                  <div key={log.id} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(log.status).split(' ')[0]}`} />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {log.action}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          IP: {log.ipAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Update your password regularly to keep your account secure
                    </p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-4">Active Sessions</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Chrome on Windows</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleString()} • 192.168.1.1
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Sign out</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Safari on iPhone</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(Date.now() - 86400000).toLocaleString()} • 203.0.113.5
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Sign out</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about account activities
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get push notifications on our website
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via SMS
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Recent Notifications</h4>
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-800'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                      </div>
                      {!notification.read && (
                        <div className="mt-2 flex justify-end">
                          <Button variant="ghost" size="sm" className="h-7">
                            Mark as read
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProfilePage;
