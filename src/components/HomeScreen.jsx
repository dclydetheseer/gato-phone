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
            {/* Date/Weather Widget Placeholder */}
            <div className="mt-8 px-6 mb-auto">
                <div className="text-5xl font-thin text-white tracking-tighter">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-sm text-white/80 mt-1 font-medium">
                    {new Date().toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
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

            {/* Search Bar / App Drawer Trigger */}
            <div className="px-4 mb-4">
                <div
                    className="bg-white/90 backdrop-blur-md rounded-full h-12 flex items-center px-4 shadow-lg gap-3"
                    onClick={openAppDrawer}
                >
                    <div className="text-xl font-bold">
                        <span className="text-blue-500">G</span>
                        <span className="text-red-500">o</span>
                        <span className="text-yellow-500">o</span>
                        <span className="text-blue-500">g</span>
                        <span className="text-green-500">l</span>
                        <span className="text-red-500">e</span>
                    </div>
                    <div className="flex-1"></div>
                    <Mic size={20} className="text-gray-500" />
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
