import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Building, Bell, Shield, Palette } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { CompanySettings } from '../components/settings/CompanySettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { PrivacySettings } from '../components/settings/PrivacySettings';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';

type SettingsTab = 'profile' | 'company' | 'notifications' | 'privacy' | 'appearance';

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user } = useAuthStore();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings user={user} />;
      case 'company':
        return <CompanySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center space-x-3 mb-8">
        <SettingsIcon className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}