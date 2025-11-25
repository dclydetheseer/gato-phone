import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useOS } from '../context/OSContext';

const RecentApps = () => {
    const { openApps, installedApps, isRecentsOpen, launchApp, closeApp, closeRecents } = useOS();

    // Get details for open apps
    const recentAppsList = openApps.map(id => installedApps.find(app => app.id === id)).filter(Boolean).reverse();

    return (
        <AnimatePresence>
            {isRecentsOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[40] flex flex-col items-center justify-center p-8"
                    onClick={closeRecents}
                >
                    <div className="flex gap-4 overflow-x-auto w-full h-full items-center px-8 snap-x snap-mandatory" onClick={e => e.stopPropagation()}>
                        {recentAppsList.length === 0 ? (
                            <div className="text-white/50 text-center w-full">No recent apps</div>
                        ) : (
                            recentAppsList.map((app) => (
                                <motion.div
                                    key={app.id}
                                    layoutId={`recent-${app.id}`}
                                    className="min-w-[250px] h-[450px] bg-white rounded-3xl overflow-hidden shadow-2xl relative snap-center flex flex-col"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                >
                                    {/* App Header */}
                                    <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 border-b border-gray-200">
                                        <app.icon size={16} className="text-gray-600" />
                                        <span className="text-xs font-bold text-gray-700">{app.name}</span>
                                    </div>

                                    {/* App Preview (Placeholder) */}
                                    <div
                                        className="flex-1 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => {
                                            launchApp(app.id);
                                            closeRecents();
                                        }}
                                    >
                                        <app.icon size={48} className="text-gray-300" />
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            closeApp(app.id);
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RecentApps;
