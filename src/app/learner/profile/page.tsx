// src/app/learner/profile/page.tsx
'use client';

import { User, Mail, Phone, MapPin, Edit, Calendar, Lock, Globe, Award, BookOpen, Flame} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Ahmed Mahmoudi',
    email: 'ahmed@the-hax.com',
    phone: '+212 612-345678',
    location: 'Rabat, Morocco',
    bio: 'Passionate drone expert focused on autonomous systems, pilot education, and mission-ready performance. Currently leading the development of the HAX training ecosystem.',
    joinDate: 'July 2024',
    role: 'Drone Training Director',
    company: 'THE HAX',
    skills: ['Autonomous Drones', 'Aerial Mapping', 'AI in Aviation', 'Drone Compliance', 'Pilot Education', 'Python', 'Systems Engineering'],
  });

  const stats = [
    { label: 'Courses Completed', value: '12', icon: BookOpen },
    { label: 'Certificates', value: '5', icon: Award },
    { label: 'Learning Streak', value: '7 days', icon: Flame },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and account settings
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your personal details and contact information
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row">
            <div className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-6 flex flex-col items-center">
              <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/ahmed-mahmoudi.png"
                  alt={`${user.name}'s profile`}
                  fill
                  className="object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white py-1 text-xs">
                    Change
                  </button>
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="mt-3 text-xl font-semibold text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <h3 className="mt-3 text-xl font-semibold text-gray-900">{user.name}</h3>
              )}
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label="Email"
                  value={user.email}
                  icon={Mail}
                  isEditing={isEditing}
                  onChange={(value) => setUser({ ...user, email: value })}
                />
                <InfoField
                  label="Phone"
                  value={user.phone}
                  icon={Phone}
                  isEditing={isEditing}
                  onChange={(value) => setUser({ ...user, phone: value })}
                />
                <InfoField
                  label="Location"
                  value={user.location}
                  icon={MapPin}
                  isEditing={isEditing}
                  onChange={(value) => setUser({ ...user, location: value })}
                />
                <InfoField
                  label="Member Since"
                  value={user.joinDate}
                  icon={Calendar}
                  isEditing={false}
                />
                <InfoField
                  label="Company"
                  value={user.company || 'Not specified'}
                  icon={Globe}
                  isEditing={isEditing}
                  onChange={(value) => setUser({ ...user, company: value })}
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                {isEditing ? (
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <p className="text-gray-700">{user.bio}</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills & Expertise
                </label>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <div key={index} className="relative group">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {skill}
                          <button
                            onClick={() => {
                              const newSkills = [...user.skills];
                              newSkills.splice(index, 1);
                              setUser({ ...user, skills: newSkills });
                            }}
                            className="ml-1.5 text-indigo-500 hover:text-indigo-900"
                          >
                            &times;
                          </button>
                        </span>
                      </div>
                    ))}
                    <button className="inline-flex items-center px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50">
                      + Add Skill
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.label}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Security</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account security settings
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Password</h3>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
              Change Password
            </button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value, icon: Icon, isEditing, onChange }: {
  label: string;
  value: string;
  icon: any;
  isEditing: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500">{label}</label>
      <div className="mt-1 flex items-center">
        <Icon className="h-4 w-4 text-gray-400 mr-2" />
        {isEditing && onChange ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        ) : (
          <span className="text-gray-900">{value}</span>
        )}
      </div>
    </div>
  );
}