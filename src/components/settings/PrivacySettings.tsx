import React, { useState } from 'react';
import { Shield, Save } from 'lucide-react';

export function PrivacySettings() {
  const [settings, setSettings] = useState({
    profileVisibility: 'team',
    activityVisibility: 'company',
    searchable: true,
    showEmail: false,
    showDepartment: true,
    twoFactorAuth: false,
    dataSharing: {
      analytics: true,
      thirdParty: false,
      improvements: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle privacy settings update
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Privacy & Security Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-md font-medium mb-4">Visibility Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Visibility
              </label>
              <select
                value={settings.profileVisibility}
                onChange={(e) =>
                  setSettings({ ...settings, profileVisibility: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="private">Private</option>
                <option value="team">Team Only</option>
                <option value="company">Company Wide</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Visibility
              </label>
              <select
                value={settings.activityVisibility}
                onChange={(e) =>
                  setSettings({ ...settings, activityVisibility: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="private">Private</option>
                <option value="team">Team Only</option>
                <option value="company">Company Wide</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Searchable Profile
                </label>
                <p className="text-sm text-gray-500">
                  Allow others to find your profile through search
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.searchable}
                  onChange={(e) =>
                    setSettings({ ...settings, searchable: e.target.checked })
                  }
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Show Email Address
                </label>
                <p className="text-sm text-gray-500">
                  Display your email address on your profile
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, showEmail: e.target.checked })
                  }
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Show Department
                </label>
                <p className="text-sm text-gray-500">
                  Display your department on your profile
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.showDepartment}
                  onChange={(e) =>
                    setSettings({ ...settings, showDepartment: e.target.checked })
                  }
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium mb-4">Security</h3>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Two-Factor Authentication
              </label>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) =>
                  setSettings({ ...settings, twoFactorAuth: e.target.checked })
                }
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium mb-4">Data Sharing</h3>
          <div className="space-y-4">
            {Object.entries(settings.dataSharing).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <p className="text-sm text-gray-500">
                    Share data for {key.toLowerCase()} purposes
                  </p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        dataSharing: {
                          ...settings.dataSharing,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}