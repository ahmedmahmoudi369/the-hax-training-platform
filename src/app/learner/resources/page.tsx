// src/app/learner/resources/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FileText, Video, Download, BookOpen, File, FileCode, FileImage, FileArchive } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Resource = {
  id: string;
  title: string;
  type: 'document' | 'video' | 'ebook' | 'code' | 'image' | 'archive';
  category: string;
  size: string;
  uploadDate: string;
  url: string;
};

const resources: Resource[] = [
  {
    id: '1',
    title: 'Drone Safety Guidelines',
    type: 'document',
    category: 'Safety',
    size: '2.4 MB',
    uploadDate: '2023-06-15',
    url: '#',
  },
  {
    id: '2',
    title: 'Aerial Photography Techniques',
    type: 'video',
    category: 'Photography',
    size: '45.2 MB',
    uploadDate: '2023-06-10',
    url: '#',
  },
  {
    id: '3',
    title: 'Drone Maintenance Guide',
    type: 'document',
    category: 'Maintenance',
    size: '3.1 MB',
    uploadDate: '2023-06-05',
    url: '#',
  },
  {
    id: '4',
    title: 'Python for Drone Programming',
    type: 'code',
    category: 'Programming',
    size: '1.8 MB',
    uploadDate: '2023-05-28',
    url: '#',
  },
  {
    id: '5',
    title: 'Drone Photography Composition',
    type: 'ebook',
    category: 'Photography',
    size: '5.7 MB',
    uploadDate: '2023-05-22',
    url: '#',
  },
];

const categories = ['All', 'Safety', 'Photography', 'Maintenance', 'Programming'];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'ebook':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'code':
        return <FileCode className="h-5 w-5 text-purple-500" />;
      case 'image':
        return <FileImage className="h-5 w-5 text-yellow-500" />;
      case 'archive':
        return <FileArchive className="h-5 w-5 text-gray-500" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">Access your learning materials and resources</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredResources.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                              {getFileIcon(resource.type)}
                            </div>
                            <div>
                              <h3 className="font-medium">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.category}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {resource.size} • {new Date(resource.uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No resources found matching your search.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Your recent resources will appear here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="favorites">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Your favorite resources will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
