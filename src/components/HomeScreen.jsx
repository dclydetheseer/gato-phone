import React from 'react';
import { useOS } from '../context/OSContext';
import AppIcon from './AppIcon';
import { Search, Mic } from 'lucide-react';

const HomeScreen = () => {
    const { installedApps, launchApp, openAppDrawer } = useOS();

    // Show only first 8 apps on home screen
    const homeApps = installedApps.slice(0, 8);

    return (
        <div className="flex flex-col h-full">
            {/* Widgets Area */}
            <div className="mt-8 px-6 mb-auto space-y-4">
                {/* Clock & Weather Widget */}
                <div className="flex flex-col">
                    <div className="text-6xl font-thin text-white tracking-tighter leading-none">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/\s[AP]M/, '')}
                    </div>
                    <div className="flex items-center gap-2 text-white/80 mt-1 font-medium text-sm">
                        <span>{new Date().toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <span className="text-yellow-400">☀</span> 72°F
                        </span>
                    </div>
                </div>

                {/* Search Widget */}
                <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-4 flex items-center gap-3 shadow-lg border border-white/5 cursor-pointer active:scale-95 transition-transform">
                    <div className="w-6 h-6 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                        G
                    </div>
                    <span className="text-white/50 text-sm font-medium">Search Gato...</span>
                    <div className="flex-1"></div>
                    <Mic size={18} className="text-white/50" />
                </div>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-4 gap-x-4 gap-y-8 px-2 mb-8">
                {homeApps.map((app) => (
                    <AppIcon
                        key={app.id}
                        app={app}
                        onClick={() => launchApp(app.id)}
                    />
                ))}
            </div>

            {/* Dock Area (Search Bar moved to widget, this is now just spacing or dock) */}
            <div className="px-4 mb-4">
                {/* We can add a dock background here if desired, or keep it clean */}
            </div>
        </div>
    );
};

export default HomeScreen;
