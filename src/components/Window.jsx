import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useOS } from '../context/OSContext';

const Window = ({ children, appId }) => {
    const { closeApp } = useOS();

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-white z-40 flex flex-col overflow-hidden"
        >
            {/* App Header / Status Bar Area */}
            <div className="h-12 w-full bg-gray-100 flex items-center justify-between px-4 pt-2 border-b border-gray-200">
                <span className="font-semibold text-sm capitalize">{appId}</span>
                <button
                    onClick={() => closeApp(appId)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                >
                    <X size={20} />
                </button>
            </div>

            {/* App Content */}
            <div className="flex-1 overflow-auto bg-white relative">
                {children}
            </div>

            {/* Home Indicator Area (to prevent content overlap) */}
            <div className="h-6 w-full bg-white"></div>
        </motion.div>
    );
};

export default Window;
