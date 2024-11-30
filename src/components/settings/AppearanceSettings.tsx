import React, { useState } from 'react';
import { Palette, Save } from 'lucide-react';

export function AppearanceSettings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    compactMode: false,
    accentColor: 'indigo',
    showAvatars: true,
    animationsEnabled: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle appearance settings update
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Appearance Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['light', 'dark', 'system'].map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => setSettings({ ...settings, theme })}
                className={`p-4 border rounded-lg text-center ${
                  settings.theme === theme
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="block text-sm font-medium">
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            value={settings.fontSize}
            onChange={(e) =>
              setSettings({ ...settings, fontSize: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accent Color
          </label>
          <div className="grid grid-cols-4 gap-4">
            {['indigo', 'blue', 'green', 'purple', 'red', 'orange', 'pink', 'teal'].map(
              (color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSettings({ ...settings, accentColor: color })}
                  className={`p-4 border rounded-lg text-center ${
                    settings.accentColor === color
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-sm font-medium">
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Compact Mode
              </label>
              <p className="text-sm text-gray-500">
                Reduce spacing between elements
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={settings.compactMode}
                onChange={(e) =>
                  setSettings({ ...settings, compactMode: e.target.checked })
                }
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Show Avatars
              </label>
              <p className="text-sm text-gray-500">
                Display user avatars in the interface
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={settings.showAvatars}
                onChange={(e) =>
                  setSettings({ ...settings, showAvatars: e.target.checked })
                }
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Enable Animations
              </label>
              <p className="text-sm text-gray-500">
                Show interface animations and transitions
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={settings.animationsEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, animationsEnabled: e.target.checked })
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