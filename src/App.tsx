import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { InstallPrompt } from './components/install/InstallPrompt';
import { AndroidInstallPrompt } from './components/install/AndroidInstallPrompt';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { MemoryFeed } from './pages/MemoryFeed';
import { Timeline } from './pages/Timeline';
import { TeamStories } from './pages/TeamStories';
import { Achievements } from './pages/Achievements';
import { Knowledge } from './pages/Knowledge';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { useAuthStore } from './store/useAuthStore';
import { useIOSDetection } from './hooks/useIOSDetection';
import { useAndroidDetection } from './hooks/useAndroidDetection';
import './styles/ios.css';
import './styles/android.css';

function App() {
  const { isAuthenticated } = useAuthStore();
  const isIOS = useIOSDetection();
  const isAndroid = useAndroidDetection();

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 ${isIOS ? 'pt-safe' : ''} ${isAndroid ? 'android-status-bar' : ''}`}>
        {isAuthenticated && <Header />}
        <div className="flex">
          {isAuthenticated && <Sidebar />}
          <main className={`flex-1 overflow-auto ${isIOS ? 'scroll-momentum' : 'android-scroll'} ${!isAuthenticated ? 'w-full' : ''} lg:ml-64`}>
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <MemoryFeed />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/timeline"
                  element={
                    <PrivateRoute>
                      <Timeline />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/team"
                  element={
                    <PrivateRoute>
                      <TeamStories />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/achievements"
                  element={
                    <PrivateRoute>
                      <Achievements />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <PrivateRoute requiredRole="team_leader">
                      <Analytics />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/knowledge"
                  element={
                    <PrivateRoute>
                      <Knowledge />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
        {isIOS ? <InstallPrompt /> : <AndroidInstallPrompt />}
      </div>
    </Router>
  );
}

export default App;