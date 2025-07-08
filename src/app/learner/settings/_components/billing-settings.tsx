'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Plus } from 'lucide-react';

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Billing & Plans</h2>
        <p className="text-gray-500 mt-1">Manage your subscription and payment methods</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You're currently on the Professional plan</CardDescription>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Billing Information</h3>
              <p className="text-sm text-gray-500">Next billing date: January 15, 2024</p>
              <p className="text-sm text-gray-500">$29.99/month</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Payment Method</h3>
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Monthly Subscription</p>
                  <p className="text-sm text-gray-500">December 15, 2023</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$29.99</p>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
