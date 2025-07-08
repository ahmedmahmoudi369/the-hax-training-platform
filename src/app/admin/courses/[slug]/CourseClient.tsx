'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Settings, BookOpen, BarChart, FileText } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface Module {
  id: string;
  title: string;
  lessons?: any[];  // Replace 'any' with a proper Lesson type if available
  duration?: string;
}

interface Course {
  title: string;
  description: string;
  longDescription?: string;
  instructor?: string;
  duration?: string;
  students: number;
  status: string;
  slug: string;
  modules?: Module[];
}

interface Props {
  course: Course;
};

export default function CourseClient({ course }: Props) {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/courses">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/courses/${course.slug}/edit`}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/courses/${course.slug}/quiz`}>
                <FileText className="mr-2 h-4 w-4" /> Manage Quiz
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground max-w-3xl">
          {course.description}
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview"><BookOpen className="mr-2 h-4 w-4" />Overview</TabsTrigger>
          <TabsTrigger value="content"><BookOpen className="mr-2 h-4 w-4" />Content</TabsTrigger>
          <TabsTrigger value="analytics"><BarChart className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4" />Settings</TabsTrigger>
        </TabsList>

        <div className="py-6">
          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Instructor</h3>
                  <p className="text-muted-foreground">{course.instructor || 'Not assigned'}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Duration</h3>
                  <p className="text-muted-foreground">{course.duration || 'Not specified'}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Students</h3>
                  <p className="text-muted-foreground">{course.students} enrolled</p>
                </div>
              </div>
              <div className="rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Course Description</h2>
                <div className="prose max-w-none">
                  {course.longDescription || 'No detailed description available.'}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Course Content</h2>
                <Button>Add Module</Button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                {course.modules?.length ? (
                  course.modules.map((module, index) => (
                    <div key={module.id} className="border-b last:border-b-0">
                      <div className="p-4 hover:bg-muted/50 cursor-pointer">
                        <h3 className="font-medium">{index + 1}. {module.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {module.lessons?.length || 0} lessons • {module.duration || 'No duration'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">No modules added yet.</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Course Analytics</h2>
              <p className="text-muted-foreground">Analytics data will be displayed here.</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Course Settings</h2>
              <p className="text-muted-foreground">Course settings will be managed here.</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
