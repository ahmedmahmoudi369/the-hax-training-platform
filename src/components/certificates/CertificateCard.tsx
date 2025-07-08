//src/components/certificates/CertificateCard.tsx

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface Certificate {
  id: string;
  verificationCode: string;
  status: 'PENDING' | 'ISSUED' | 'REVOKED';
  issuedAt: string | null;
  expiresAt: string | null;
  downloadUrl: string | null;
  course: {
    title: string;
  };
  user: {
    name: string;
  };
}

interface CertificateCardProps {
  certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{certificate.course.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Issued to: {certificate.user.name}
            </p>
          </div>
          <Badge
            variant={
              certificate.status === 'ISSUED'
                ? 'default'
                : certificate.status === 'PENDING'
                ? 'secondary'
                : 'destructive'
            }
          >
            {certificate.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Issued On</p>
            <p>
              {certificate.issuedAt
                ? format(new Date(certificate.issuedAt), 'MMMM d, yyyy')
                : 'Not issued yet'}
            </p>
          </div>
          {certificate.expiresAt && (
            <div>
              <p className="text-muted-foreground">Expires On</p>
              <p>{format(new Date(certificate.expiresAt), 'MMMM d, yyyy')}</p>
            </div>
          )}
          <div className="col-span-2">
            <p className="text-muted-foreground">Verification Code</p>
            <p className="font-mono bg-muted p-2 rounded-md mt-1">
              {certificate.verificationCode}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a
            href={`/certificates/verify/${certificate.verificationCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Verify
          </a>
        </Button>
        {certificate.downloadUrl && (
          <Button asChild>
            <a href={certificate.downloadUrl} download>
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}