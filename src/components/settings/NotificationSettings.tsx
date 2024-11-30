import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: {
      newMemories: true,
      mentions: true,
      comments: true,
      teamUpdates: true,
      achievements: true,
      weeklyDigest: false,
    },
    pushNotifications: {
      newMemories: true,
      mentions: true,
      comments: false,
      teamUpdates: false,
      achievements: true,
    },
    notificationSound: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle notification settings update
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Notification Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-md font-medium mb-4">Email Notifications</h3>
          <div className="space-y-4">
            {Object.entries(settings.emailNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive email notifications for {key.split(/(?=[A-Z])/).join(' ').toLowerCase()}
                  </p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emailNotifications: {
                          ...settings.emailNotifications,
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

        <div>
          <h3 className="text-md font-medium mb-4">Push Notifications</h3>
          <div className="space-y-4">
            {Object.entries(settings.pushNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive push notifications for {key.split(/(?=[A-Z])/).join(' ').toLowerCase()}
                  </p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        pushNotifications: {
                          ...settings.pushNotifications,
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

        <div>
          <h3 className="text-md font-medium mb-4">Sound Settings</h3>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Notification Sound
              </label>
              <p className="text-sm text-gray-500">
                Play a sound when receiving notifications
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={settings.notificationSound}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notificationSound: e.target.checked,
                  })
                }
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
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