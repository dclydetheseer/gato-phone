import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { format } from 'date-fns';
import { useOS } from '../context/OSContext';

const LockScreen = () => {
    const { unlock } = useOS();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: -800, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-md flex flex-col items-center justify-between py-20 text-white"
            onClick={unlock} // Simple tap to unlock for now, or swipe
        >
            <div className="flex flex-col items-center mt-12">
                <Lock size={32} className="mb-4 opacity-50" />
                <h1 className="text-7xl font-thin tracking-tighter">
                    {format(time, 'h:mm')}
                </h1>
                <h2 className="text-xl font-medium opacity-80 mt-2">
                    {format(time, 'EEEE, MMMM d')}
                </h2>
            </div>

            <div className="flex flex-col items-center gap-2 animate-pulse">
                <span className="text-sm font-medium tracking-widest uppercase opacity-60">
                    Click to Unlock
                </span>
                <div className="w-1 h-12 bg-white/20 rounded-full"></div>
            </div>
        </motion.div>
    );
};

export default LockScreen;
