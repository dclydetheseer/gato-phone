import React from 'react';
import { motion } from 'framer-motion';

const AppIcon = ({ app, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center gap-1"
        >
            <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <app.icon size={28} />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md">{app.name}</span>
        </motion.button>
    );
};

export default AppIcon;
