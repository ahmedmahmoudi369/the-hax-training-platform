// src/app/learner/courses/[id]/certificate/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, CheckCircle, ArrowLeft, Mail, Share2 } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import Link from 'next/link';

// Mock certificate data
const certificateData = {
  id: 'CERT-2023-001',
  courseName: 'Aerial Photography & Videography Techniques',
  studentName: 'Ahmed Mahmoudi',
  completionDate: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  instructor: 'Dr. Sarah Johnson',
  credentialId: 'APVT-2023-001'
};

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const handleDownloadCertificate = () => {
    // In a real app, this would trigger a PDF download
    alert('Certificate download started!');
  };

  const handleBackToCourses = () => {
    router.push('/learner/courses');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <BackButton label="Back to course" />
        <Button 
          variant="outline" 
          onClick={handleBackToCourses}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Courses
        </Button>
      </div>
      
      <div className="text-center mb-12">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Congratulations! 🎉</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          You've successfully completed the course and earned your certificate of completion.
        </p>
      </div>

      <Card className="mb-8 border-2 border-blue-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-800">Certificate of Completion</h2>
            <p className="text-blue-600">This is to certify that</p>
            <h3 className="text-3xl font-bold my-4 text-gray-900">{certificateData.studentName}</h3>
            <p className="text-muted-foreground">has successfully completed the course</p>
            <h4 className="text-xl font-semibold mt-2 text-blue-700">{certificateData.courseName}</h4>
          </div>
        </CardHeader>
        <CardContent className="py-8">
          <div className="grid gap-6 md:grid-cols-2 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Issued on</p>
              <p className="font-medium">{certificateData.completionDate}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Instructor</p>
              <p className="font-medium">{certificateData.instructor}</p>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Credential ID</div>
              <div className="font-mono text-sm">{certificateData.credentialId}</div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Button onClick={handleDownloadCertificate}>
              <Mail className="h-4 w-4 mr-2" />
              Request Certificate
            </Button>
            {/* <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Certificate
            </Button> */}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>This certificate verifies that the above named student has completed the course.</p>
        <p>For verification, please contact admin@hax-training.com</p>
      </div>
    </div>
  );
}
