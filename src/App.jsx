import React, { useEffect } from 'react';
import StatusBar from './components/StatusBar';
import Dock from './components/Dock';
import Wallpaper from './components/Wallpaper';
import HomeScreen from './components/HomeScreen';
import Window from './components/Window';
import LockScreen from './components/LockScreen';
import NotificationContainer from './components/NotificationContainer';
import SettingsApp from './apps/SettingsApp';
import ClockApp from './apps/ClockApp';
import CalculatorApp from './apps/CalculatorApp';
import BrowserApp from './apps/BrowserApp';
import { OSProvider, useOS } from './context/OSContext';
import { AnimatePresence } from 'framer-motion';

// Import App Components (Placeholders for now)
const PlaceholderApp = ({ name }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <h2 className="text-2xl font-bold mb-2">{name}</h2>
    <p>This app is under construction.</p>
  </div>
);

function AppContent() {
  const { activeApp, installedApps, isLocked, notifications, addNotification } = useOS();

  useEffect(() => {
    // Simulate a welcome notification
    setTimeout(() => {
      addNotification({
        title: 'Welcome to Gato OS',
        message: 'Experience the cloud phone.',
      });
    }, 2000);
  }, []);

  const getAppContent = (appId) => {
    switch (appId) {
      case 'settings': return <SettingsApp />;
      case 'clock': return <ClockApp />;
      case 'calculator': return <CalculatorApp />;
      case 'browser': return <BrowserApp />;
      default:
        const app = installedApps.find(a => a.id === appId);
        return app ? <PlaceholderApp name={app.name} /> : null;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      {/* Phone Frame */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] shadow-2xl border-[8px] border-gray-800 overflow-hidden ring-4 ring-gray-900/50">

        {/* Dynamic Island / Notch Placeholder */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-[60] pointer-events-none"></div>

        <Wallpaper>
          <StatusBar />

          <NotificationContainer notifications={notifications} />

          <AnimatePresence>
            {isLocked && <LockScreen />}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1 w-full h-full pt-12 pb-24 px-4 flex flex-col relative">
            <HomeScreen />

            <AnimatePresence>
              {activeApp && (
                <Window key={activeApp} appId={activeApp}>
                  {getAppContent(activeApp)}
                </Window>
              )}
            </AnimatePresence>
          </div>

          <Dock />

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/50 rounded-full z-50 pointer-events-none"></div>
        </Wallpaper>
      </div>
    </div>
  );
}

function App() {
  return (
    <OSProvider>
      <AppContent />
    </OSProvider>
  );
}

export default App;
