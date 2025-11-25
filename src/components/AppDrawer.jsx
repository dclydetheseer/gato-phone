import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useOS } from '../context/OSContext';
import AppIcon from './AppIcon';

const AppDrawer = () => {
    const { installedApps, launchApp, isAppDrawerOpen, closeAppDrawer } = useOS();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredApps = installedApps.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: isAppDrawerOpen ? '0%' : '100%', opacity: isAppDrawerOpen ? 1 : 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-xl z-[45] flex flex-col pt-12 px-4 pb-20"
        >
            {/* Search Bar */}
            <div className="mb-6 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 bg-gray-100 rounded-full pl-12 pr-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Apps Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-x-4 gap-y-8 pb-8 content-start">
                {filteredApps.map((app) => (
                    <div key={app.id} className="flex flex-col items-center gap-1">
                        <button
                            onClick={() => {
                                launchApp(app.id);
                                closeAppDrawer();
                            }}
                            className={`w-14 h-14 ${app.color} rounded-full flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform`}
                        >
                            <app.icon size={28} />
                        </button>
                        <span className="text-xs text-gray-700 font-medium text-center leading-tight">
                            {app.name}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default AppDrawer;
