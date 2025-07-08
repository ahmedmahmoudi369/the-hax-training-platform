// src/app/learner/library/page.tsx
'use client';

import { Download, FileText, FileCode, FileArchive } from 'lucide-react';

type Resource = {
  id: string;
  title: string;
  type: 'Pdf' | 'Code' | 'Archive' | 'Document';
  size: string;
  category: 'Regulations' | 'Tutorials' | 'Templates' | 'References';
  url: string;
};

const resources: Resource[] = [
  {
    id: '1',
    title: 'Moroccan Drone Regulations 2024',
    type: 'Pdf',
    size: '2.4 MB',
    category: 'Regulations',
    url: '#'
  },
  {
    id: '2',
    title: 'Drone Flight Checklist',
    type: 'Document',
    size: '0.5 MB',
    category: 'Templates',
    url: '#'
  },
  {
    id: '3',
    title: 'Aerial Photography Guide',
    type: 'Pdf',
    size: '5.1 MB',
    category: 'Tutorials',
    url: '#'
  },
  {
    id: '4',
    title: 'Drone Maintenance Log Template',
    type: 'Document',
    size: '0.8 MB',
    category: 'Templates',
    url: '#'
  },
  {
    id: '5',
    title: 'Mapping Software Tools',
    type: 'Archive',
    size: '15.2 MB',
    category: 'References',
    url: '#'
  }
];

const getFileIcon = (type: Resource['type']) => {
  switch (type) {
    case 'Pdf':
      return <FileText className="h-5 w-5 text-red-500" />;
    case 'Code':
      return <FileCode className="h-5 w-5 text-blue-500" />;
    case 'Archive':
      return <FileArchive className="h-5 w-5 text-yellow-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
        <p className="mt-1 text-sm text-gray-500">
          Access training materials, templates, and resources
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-100">
          {resources.map((resource) => (
            <li key={resource.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getFileIcon(resource.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {resource.title}
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        {resource.type === 'Pdf' && <FileText className="h-4 w-4 mr-1 text-red-500" />}
                        {resource.type === 'Code' && <FileCode className="h-4 w-4 mr-1 text-blue-500" />}
                        {resource.type === 'Archive' && <FileArchive className="h-4 w-4 mr-1 text-amber-500" />}
                        {resource.type === 'Document' && <FileText className="h-4 w-4 mr-1 text-gray-500" />}
                        <span className="mr-3">{resource.type.toUpperCase()}</span>
                        <span className="mr-3">•</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                      {resource.category}
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Download className="h-3 w-3 mr-1.5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Need more resources?
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Can't find what you're looking for? Contact our support team for
              additional resources and assistance.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
