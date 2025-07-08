//src/components/certificates/CertificateRequestButton.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Award } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CertificateRequestButtonProps {
  courseId: string;
  isCompleted: boolean;
}

export function CertificateRequestButton({
  courseId,
  isCompleted,
}: CertificateRequestButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async () => {
    if (!isCompleted) {
      toast.error('Please complete the course to request a certificate');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/certificates/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      toast.success('Certificate requested successfully!');
      window.location.href = `/dashboard/certificates/${data.id}`;
    } catch (error) {
      console.error('Certificate request failed:', error);
      toast.error('Failed to request certificate');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleRequest}
      disabled={isLoading || !isCompleted}
      className="w-full sm:w-auto"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Award className="mr-2 h-4 w-4" />
          {isCompleted ? 'Request Certificate' : 'Complete Course to Request'}
        </>
      )}
    </Button>
  );
}