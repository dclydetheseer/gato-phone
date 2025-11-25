import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

const NotificationContainer = ({ notifications }) => {
    return (
        <div className="absolute top-14 left-0 w-full px-4 flex flex-col gap-2 z-[70] pointer-events-none">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/20 flex items-start gap-3 pointer-events-auto"
                    >
                        <div className="p-2 bg-gray-100 rounded-xl">
                            <Bell size={16} className="text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{notification.message}</p>
                        </div>
                        <span className="text-[10px] text-gray-400">Now</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationContainer;
