// src/app/learner/settings/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Settings, Bell, Lock, Palette, FileText, CreditCard, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileSettings } from './_components/profile-settings';
import { NotificationSettings } from './_components/notification-settings';
import { PrivacySettings } from './_components/privacy-settings';
import { AppearanceSettings } from './_components/appearance-settings';
import { BillingSettings } from './_components/billing-settings';
import { TeamSettings } from './_components/team-settings';

type TabValue = 'profile' | 'notifications' | 'billing' | 'team' | 'certification' | 'appearance' | 'privacy';

const tabs: { value: TabValue; icon: React.ReactNode; label: string }[] = [
  { value: 'profile', icon: <Settings className="h-4 w-4 mr-2" />, label: 'Profile' },
  { value: 'certification', icon: <FileText className="h-4 w-4 mr-2" />, label: 'Certification' },
  { value: 'billing', icon: <CreditCard className="h-4 w-4 mr-2" />, label: 'Billing' },
  { value: 'team', icon: <Users className="h-4 w-4 mr-2" />, label: 'Team' },
  { value: 'notifications', icon: <Bell className="h-4 w-4 mr-2" />, label: 'Notifications' },
  { value: 'appearance', icon: <Palette className="h-4 w-4 mr-2" />, label: 'Appearance' },
  { value: 'privacy', icon: <Lock className="h-4 w-4 mr-2" />, label: 'Privacy & Security' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabValue>('profile');

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-2">Manage your THE HAX Training Platform account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.value
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card className="overflow-hidden">
            <div className="p-6">
              {activeTab === 'profile' && <ProfileSettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'privacy' && <PrivacySettings />}
              {activeTab === 'appearance' && <AppearanceSettings />}
              {activeTab === 'billing' && <BillingSettings />}
              {activeTab === 'team' && <TeamSettings />}
              {activeTab === 'certification' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Drone Certification</h2>
                    <p className="text-gray-500 mt-1">Manage your drone pilot certification and documents</p>
                  </div>
                  <div className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Remote Pilot Certificate</h3>
                        <p className="text-sm text-gray-500">Upload and manage your drone pilot license</p>
                      </div>
                      <Button variant="outline">Upload Certificate</Button>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <h3 className="font-medium">Medical Certificate</h3>
                        <p className="text-sm text-gray-500">Upload your medical certificate if required</p>
                      </div>
                      <Button variant="outline">Upload Document</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
