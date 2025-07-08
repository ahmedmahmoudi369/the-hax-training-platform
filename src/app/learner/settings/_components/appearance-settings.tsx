'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Loader2, Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

type FontSize = 'small' | 'medium' | 'large';
type Density = 'compact' | 'normal' | 'comfortable';

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [density, setDensity] = useState<Density>('normal');
  const [isSaving, setIsSaving] = useState(false);
  
  const themeValue = theme || 'system';

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
    // TODO: Save to API
  };

  const handleFontSizeChange = (value: FontSize) => {
    setFontSize(value);
    document.documentElement.setAttribute('data-font-size', value);
    localStorage.setItem('fontSize', value);
    // TODO: Save to API
  };

  const handleDensityChange = (value: Density) => {
    setDensity(value);
    document.documentElement.setAttribute('data-density', value);
    localStorage.setItem('density', value);
    // TODO: Save to API
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Save to localStorage
      localStorage.setItem('fontSize', fontSize);
      localStorage.setItem('density', density);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      console.log('Appearance settings saved');
    } catch (error) {
      console.error('Failed to save appearance settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="theme" className="block text-sm font-medium text-gray-900 mb-2">
              Theme
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'light', label: 'Light', icon: <Sun className="h-5 w-5" /> },
                { value: 'dark', label: 'Dark', icon: <Moon className="h-5 w-5" /> },
                { value: 'system', label: 'System', icon: <Monitor className="h-5 w-5" /> },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTheme(item.value as 'light' | 'dark' | 'system')}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${
                    themeValue === item.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {item.icon}
                  <span className="mt-2 text-sm font-medium text-gray-900">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="font-size" className="block text-sm font-medium text-gray-900 mb-2">
              Font Size
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFontSize(item.value as 'small' | 'medium' | 'large')}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 ${
                    fontSize === item.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="density" className="block text-sm font-medium text-gray-900 mb-2">
              Density
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'compact', label: 'Compact' },
                { value: 'normal', label: 'Normal' },
                { value: 'comfortable', label: 'Comfortable' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setDensity(item.value as 'compact' | 'normal' | 'comfortable')}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 ${
                    density === item.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-2">
        <Button 
          onClick={handleSave}
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
