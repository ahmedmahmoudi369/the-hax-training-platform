'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

type PrivacySetting = 'profileVisibility' | 'emailVisibility' | 'dataSharing';

interface PrivacySettingsState {
  profileVisibility: boolean;
  emailVisibility: boolean;
  dataSharing: boolean;
}

export function PrivacySettings() {
  const [privacy, setPrivacy] = useState<PrivacySettingsState>({
    profileVisibility: true,
    emailVisibility: false,
    dataSharing: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async (setting: PrivacySetting, checked: boolean) => {
    try {
      setIsLoading(true);
      // Optimistic update
      setPrivacy(prev => ({ ...prev, [setting]: checked }));
      
      // TODO: Implement API call to update privacy settings
      console.log(`Updating ${setting}:`, checked);
      await new Promise(resolve => setTimeout(resolve, 500));
      // TODO: Show success toast
    } catch (error) {
      console.error(`Error updating ${setting}:`, error);
      // Revert on error
      setPrivacy(prev => ({ ...prev, [setting]: !checked }));
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      // TODO: Implement API call to save all privacy settings
      console.log('Saving privacy settings:', privacy);
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Show success toast
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      // TODO: Show error toast
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Privacy Settings</CardTitle>
          <CardDescription>
            Control your privacy preferences and data sharing settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
            <div className="space-y-1">
              <Label htmlFor="profile-visibility" className="text-sm font-medium text-gray-900">
                Profile Visibility
              </Label>
              <p className="text-sm text-gray-500">
                Make your profile visible to other users.
              </p>
            </div>
            <Switch
              id="profile-visibility"
              checked={privacy.profileVisibility}
              onCheckedChange={(checked) => handleToggle('profileVisibility', checked)}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
            <div className="space-y-1">
              <Label htmlFor="email-visibility" className="text-sm font-medium text-gray-900">
                Email Visibility
              </Label>
              <p className="text-sm text-gray-500">
                Allow other users to see your email address.
              </p>
            </div>
            <Switch
              id="email-visibility"
              checked={privacy.emailVisibility}
              onCheckedChange={(checked) => handleToggle('emailVisibility', checked)}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
            <div className="space-y-1">
              <Label htmlFor="data-sharing" className="text-sm font-medium text-gray-900">
                Data Sharing
              </Label>
              <p className="text-sm text-gray-500">
                Help us improve by sharing anonymous usage data.
              </p>
            </div>
            <Switch
              id="data-sharing"
              checked={privacy.dataSharing}
              onCheckedChange={(checked) => handleToggle('dataSharing', checked)}
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
