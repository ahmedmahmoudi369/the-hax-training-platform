import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, CheckCircle, Clock, X, Search, Download, FileText } from 'lucide-react';

export default function CertificationsPage() {
  // Mock data - replace with real data from your API
  const pendingRequests = [
    { id: '1', user: 'Alex Johnson', course: 'Advanced React', requestedAt: '2023-06-14T10:30:00Z' },
    { id: '2', user: 'Sam Wilson', course: 'Node.js Fundamentals', requestedAt: '2023-06-15T14:45:00Z' },
  ];

  const issuedCertificates = [
    { id: 'CERT-001', user: 'Jordan Lee', course: 'Introduction to React', issuedAt: '2023-06-10T09:15:00Z', expiresAt: '2024-06-10T23:59:59Z' },
    { id: 'CERT-002', user: 'Taylor Swift', course: 'JavaScript Fundamentals', issuedAt: '2023-06-05T11:20:00Z', expiresAt: '2024-06-05T23:59:59Z' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Certificate Management</h1>
        <p className="text-muted-foreground mt-1">Manage certificate requests and issued certificates</p>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending Requests
            {pendingRequests.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="issued" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Issued Certificates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Pending Certificate Requests</CardTitle>
                  <CardDescription>
                    Review and approve or reject certificate requests
                  </CardDescription>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Search requests..."
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.user}</TableCell>
                        <TableCell>{request.course}</TableCell>
                        <TableCell>
                          {new Date(request.requestedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <Check className="mr-2 h-4 w-4 text-green-600" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <X className="mr-2 h-4 w-4 text-red-600" />
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium">No pending requests</h3>
                  <p className="text-muted-foreground mt-1">All certificate requests have been processed.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issued">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Issued Certificates</CardTitle>
                  <CardDescription>
                    View and manage all issued certificates
                  </CardDescription>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Search certificates..."
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Issued On</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issuedCertificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-mono font-medium">{cert.id}</TableCell>
                      <TableCell>{cert.user}</TableCell>
                      <TableCell>{cert.course}</TableCell>
                      <TableCell>{new Date(cert.issuedAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(cert.expiresAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
