'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, User, BookOpen, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function EnrollmentsPage() {
  // Mock data - replace with real data from your API
  const enrollments = [
    { 
      id: '1', 
      user: { name: 'Alex Johnson', email: 'alex@example.com' },
      course: 'Introduction to React',
      date: '2023-06-10',
      status: 'active',
      progress: 75
    },
    { 
      id: '2', 
      user: { name: 'Sam Wilson', email: 'sam@example.com' },
      course: 'Advanced JavaScript',
      date: '2023-06-12',
      status: 'pending',
      progress: 0
    },
    { 
      id: '3', 
      user: { name: 'Jordan Lee', email: 'jordan@example.com' },
      course: 'UI/UX Design',
      date: '2023-06-15',
      status: 'completed',
      progress: 100
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" /> Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Enrollments</h1>
          <p className="text-muted-foreground mt-1">Manage student enrollments and course assignments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Enroll Student
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="w-full pl-9"
            placeholder="Search enrollments..."
            type="search"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Enrollments</CardTitle>
              <CardDescription>View and manage all course enrollments</CardDescription>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="mr-2">
                Export
              </Button>
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{enrollment.user.name}</div>
                        <div className="text-sm text-muted-foreground">{enrollment.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      {enrollment.course}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(enrollment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          enrollment.progress === 100 ? 'bg-green-500' : 
                          enrollment.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{enrollment.progress}% complete</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page 1 of 1 • {enrollments.length} enrollments
        </div>
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>
    </div>
  );
}
