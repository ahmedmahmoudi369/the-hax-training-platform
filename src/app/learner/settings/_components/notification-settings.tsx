'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

type NotificationType = 'email' | 'inApp' | 'activity' | 'newsletter';

interface NotificationSettingsState {
  email: boolean;
  inApp: boolean;
  activity: boolean;
  newsletter: boolean;
}

export function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationSettingsState>({
    email: true,
    inApp: true,
    activity: true,
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async (type: NotificationType, checked: boolean) => {
    try {
      setIsLoading(true);
      // Optimistic update
      setNotifications(prev => ({ ...prev, [type]: checked }));
      
      // TODO: Implement API call to update notification settings
      console.log(`Updating ${type} notifications:`, checked);
      await new Promise(resolve => setTimeout(resolve, 500));
      // TODO: Show success toast
    } catch (error) {
      console.error(`Error updating ${type} notifications:`, error);
      // Revert on error
      setNotifications(prev => ({ ...prev, [type]: !checked }));
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      // TODO: Implement API call to save all notification settings
      console.log('Saving notification settings:', notifications);
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Show success toast
    } catch (error) {
      console.error('Error saving notification settings:', error);
      // TODO: Show error toast
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Notification Preferences</CardTitle>
          <CardDescription>
            Manage what email notifications you receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
            <div className="space-y-1">
              <Label htmlFor="email-notifications" className="text-sm font-medium text-gray-900">
                Email Notifications
              </Label>
              <p className="text-sm text-gray-500">
                Receive email notifications about your account.
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={(checked) => handleToggle('email', checked)}
              disabled={isLoading}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
            <div className="space-y-1">
              <Label htmlFor="in-app-notifications" className="text-sm font-medium text-gray-900">
                In-App Notifications
              </Label>
              <p className="text-sm text-gray-500">
                Receive notifications within the application.
              </p>
            </div>
            <Switch
              id="in-app-notifications"
              checked={notifications.inApp}
              onCheckedChange={(checked) => handleToggle('inApp', checked)}
              disabled={isLoading}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
            <div className="space-y-1">
              <Label htmlFor="activity-alerts" className="text-sm font-medium text-gray-900">
                Activity Alerts
              </Label>
              <p className="text-sm text-gray-500">
                Get notified about important account activity.
              </p>
            </div>
            <Switch
              id="activity-alerts"
              checked={notifications.activity}
              onCheckedChange={(checked) => handleToggle('activity', checked)}
              disabled={isLoading}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
            <div className="space-y-1">
              <Label htmlFor="newsletter" className="text-sm font-medium text-gray-900">
                Newsletter
              </Label>
              <p className="text-sm text-gray-500">
                Receive our monthly newsletter with updates.
              </p>
            </div>
            <Switch
              id="newsletter"
              checked={notifications.newsletter}
              onCheckedChange={(checked) => handleToggle('newsletter', checked)}
              disabled={isLoading}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-2">
        <Button 
          onClick={handleSaveAll}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
}
