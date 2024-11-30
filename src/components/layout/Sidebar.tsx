import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Clock, 
  Users, 
  Award, 
  Timeline,
  BookOpen,
  Settings,
  BarChart,
  Menu,
  X
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.memoryFeed'), icon: Home, path: '/' },
    { name: t('nav.timeline'), icon: Timeline, path: '/timeline' },
    { name: t('nav.teamStories'), icon: Users, path: '/team' },
    { name: t('nav.achievements'), icon: Award, path: '/achievements' },
    { name: t('nav.analytics'), icon: BarChart, path: '/analytics' },
    { name: 'History', icon: Clock, path: '/history' },
    { name: t('knowledge.title'), icon: BookOpen, path: '/knowledge' },
  ];

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-screen w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
        <nav className="mt-8 px-4 w-full">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isCurrentPath(item.path)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="absolute bottom-8 px-4 w-56">
            <Link
              to="/settings"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                isCurrentPath('/settings')
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              {t('nav.settings')}
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <nav className="mt-8 px-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                      isCurrentPath(item.path)
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="absolute bottom-8 px-4 w-56">
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isCurrentPath('/settings')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  {t('nav.settings')}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}