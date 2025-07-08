//app/setup-profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Skill = {
  id: string;
  value: string;
};

export default function SetupProfilePage() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [formData, setFormData] = useState({
    name: 'Ahmed Mahmoudi',
    email: 'ahmed@the-hax.com',
    phone: '',
    location: '',
    bio: '',
    role: '',
    company: '',
  });

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      router.push('/learner/profile');
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      const newSkill = {
        id: Date.now().toString(),
        value: currentSkill.trim(),
      };
      setSkills([...skills, newSkill]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const fillDemoData = () => {
    const demoData = {
      name: 'Ahmed Mahmoudi',
      email: 'ahmed@the-hax.com',
      phone: '+212 612-345678',
      location: 'Rabat, Morocco',
      bio: 'Passionate drone expert focused on autonomous systems, pilot education, and mission-ready performance. Currently leading the development of the HAX training ecosystem.',
      role: 'Drone Training Director',
      company: 'THE HAX',
    };
    
    const demoSkills = [
      'Autonomous Drones',
      'Aerial Mapping',
      'AI in Aviation',
      'Drone Compliance',
      'Pilot Education',
      'Python',
      'Systems Engineering'
    ].map((skill, index) => ({
      id: `skill-${index}`,
      value: skill
    }));
    
    setFormData(demoData);
    setSkills(demoSkills);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">Tell us more about yourself to get started</p>
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={fillDemoData}
              className="text-sm"
            >
              Fill Demo Data
            </Button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+212 612-345678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Rabat, Morocco"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Job Title</Label>
              <Input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                placeholder="Drone Training Director"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="THE HAX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map(skill => (
                <div key={skill.id} className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {skill.value}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Type a skill and press Enter"
            />
            <p className="text-xs text-gray-500 mt-1">Press Enter to add a skill</p>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
