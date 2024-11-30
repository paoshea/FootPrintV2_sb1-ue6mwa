import React from 'react';
import { Users, Plus, Filter } from 'lucide-react';
import { TeamOverview } from '../components/team/TeamOverview';
import { TeamMemberGrid } from '../components/team/TeamMemberGrid';
import { TeamCalendar } from '../components/team/TeamCalendar';
import { useTeamStore } from '../store/useTeamStore';

const mockTeamMembers = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'online' as const,
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    currentProject: 'Platform Migration',
    joinedAt: new Date('2022-03-15'),
    badges: [
      { id: '1', name: 'Tech Lead', icon: '🚀' },
      { id: '2', name: 'Mentor', icon: '👨‍🏫' },
    ],
  },
  {
    id: '2',
    name: 'Michael Park',
    email: 'michael.park@company.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'away' as const,
    location: 'New York, NY',
    phone: '+1 (555) 234-5678',
    currentProject: 'Q3 Roadmap',
    joinedAt: new Date('2021-11-01'),
    badges: [
      { id: '3', name: 'Product Strategy', icon: '📊' },
    ],
  },
  // Add more team members...
];

const mockEvents = [
  {
    id: '1',
    title: 'Team Standup',
    type: 'meeting' as const,
    startTime: new Date(new Date().setHours(10, 0)),
    endTime: new Date(new Date().setHours(10, 30)),
    attendees: ['1', '2', '3'],
  },
  {
    id: '2',
    title: 'Project Deadline',
    type: 'deadline' as const,
    startTime: new Date(new Date().setHours(17, 0)),
    attendees: ['1', '2'],
  },
  // Add more events...
];

export function TeamDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const handleMemberClick = (memberId: string) => {
    // Handle member click
    console.log('Member clicked:', memberId);
  };

  const handleEventClick = (eventId: string) => {
    // Handle event click
    console.log('Event clicked:', eventId);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Team Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="product">Product</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <Plus className="h-5 w-5 mr-2" />
            Add Team Member
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <TeamOverview
          stats={{
            totalMembers: 12,
            activeProjects: 5,
            upcomingMilestones: 8,
            teamVelocity: 42,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TeamMemberGrid
              members={mockTeamMembers}
              onMemberClick={handleMemberClick}
            />
          </div>
          <div>
            <TeamCalendar
              events={mockEvents}
              onEventClick={handleEventClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}