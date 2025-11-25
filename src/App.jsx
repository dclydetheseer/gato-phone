import React, { useEffect } from 'react';
import StatusBar from './components/StatusBar';
import GestureBar from './components/GestureBar';
import NotificationShade from './components/NotificationShade';
import BootAnimation from './components/BootAnimation';
import AppDrawer from './components/AppDrawer';
import RecentApps from './components/RecentApps';
import Wallpaper from './components/Wallpaper';
import HomeScreen from './components/HomeScreen';
import Window from './components/Window';
import LockScreen from './components/LockScreen';
import NotificationContainer from './components/NotificationContainer';
import SettingsApp from './apps/SettingsApp';
import ClockApp from './apps/ClockApp';
import CalculatorApp from './apps/CalculatorApp';
import BrowserApp from './apps/BrowserApp';
import PlayStoreApp from './apps/PlayStoreApp';
import CameraApp from './apps/CameraApp';
import GalleryApp from './apps/GalleryApp';
import TerminalApp from './apps/TerminalApp';
import GatoAccountApp from './apps/GatoAccountApp';
import GatoCloudApp from './apps/GatoCloudApp';
import { OSProvider, useOS } from './context/OSContext';
import { FileSystemProvider } from './context/FileSystemContext';
import { AnimatePresence } from 'framer-motion';
import { Power } from 'lucide-react';

// Import App Components (Placeholders for now)
const PlaceholderApp = ({ name }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <h2 className="text-2xl font-bold mb-2">{name}</h2>
    <p>This app is under construction.</p>
  </div>
);

function AppContent() {
  const { activeApp, installedApps, isLocked, notifications, addNotification, openShade, powerState, turnOn, turnOff } = useOS();

  // Initial Boot Logic
  useEffect(() => {
    if (powerState === 'off') {
      turnOn();
    }
  }, []);

  const getAppContent = (appId) => {
    switch (appId) {
      case 'settings': return <SettingsApp />;
      case 'clock': return <ClockApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'browser':
        return <BrowserApp />;
      case 'playstore':
        return <PlayStoreApp />;
      case 'camera':
        return <CameraApp />;
      case 'gallery':
        return <GalleryApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'gatoaccount':
        return <GatoAccountApp />;
      case 'gatocloud':
        return <GatoCloudApp />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            App Content Placeholder
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      {/* Phone Frame */}
      <div className="relative w-[320px] h-[650px] bg-black rounded-[40px] shadow-2xl border-[8px] border-gray-800 overflow-hidden ring-4 ring-gray-900/50">

        {/* Power Button (Side) - Removed for Auto-Boot */}
        {/* <button
          className="absolute -right-3 top-24 w-1 h-12 bg-gray-700 rounded-r-md active:bg-gray-600 transition-colors z-0"
          onClick={powerState === 'on' ? turnOff : turnOn}
          title={powerState === 'on' ? "Turn Off" : "Turn On"}
        ></button> */}

        {/* Dynamic Island / Notch Placeholder */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-[60] pointer-events-none"></div>

        <AnimatePresence>
          {powerState === 'booting' && <BootAnimation onComplete={() => { }} />}
        </AnimatePresence>

        {powerState === 'off' ? (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="text-gray-800 flex flex-col items-center gap-2">
              <Power size={48} />
              <span className="text-xs">Power Off</span>
            </div>
          </div>
        ) : (
          <Wallpaper>
            <StatusBar />

            {/* Swipe Down Trigger Area */}
            <div
              className="absolute top-0 left-0 w-full h-8 z-[55]"
              onClick={() => openShade()}
            ></div>

            <NotificationShade />

            <AppDrawer />

            <RecentApps />

            <NotificationContainer notifications={notifications} />

            <AnimatePresence>
              {isLocked && <LockScreen />}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 w-full h-full pt-8 pb-12 px-0 flex flex-col relative">
              <HomeScreen />

              <AnimatePresence>
                {activeApp && (
                  <Window key={activeApp} appId={activeApp}>
                    {getAppContent(activeApp)}
                  </Window>
                )}
              </AnimatePresence>
            </div>

            {/* <NavigationBar /> */}
            <GestureBar />

            {/* Home Indicator (Removed as GestureBar includes it) */}
            {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/50 rounded-full z-50 pointer-events-none"></div> */}
          </Wallpaper>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <FileSystemProvider>
      <OSProvider>
        <AppContent />
      </OSProvider>
    </FileSystemProvider>
  );
}

export default App;
