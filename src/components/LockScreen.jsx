import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { format } from 'date-fns';
import { useOS } from '../context/OSContext';

const LockScreen = () => {
    const { unlock } = useOS();
    const [time, setTime] = useState(new Date());

    const [scanning, setScanning] = useState(true);
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Simulate Face ID Scan
        const scanTimer = setTimeout(() => {
            setScanning(false);
            setUnlocked(true);
        }, 1500);

        return () => {
            clearInterval(timer);
            clearTimeout(scanTimer);
        };
    }, []);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: -800, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-md flex flex-col items-center justify-between py-20 text-white"
            onClick={unlocked ? unlock : undefined}
        >
            <div className="flex flex-col items-center mt-12">
                <div className="mb-4 relative">
                    {scanning ? (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            <Lock size={32} className="opacity-50" />
                        </motion.div>
                    ) : unlocked ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-green-400"
                        >
                            <Unlock size={32} />
                        </motion.div>
                    ) : (
                        <Lock size={32} className="opacity-50" />
                    )}

                    {/* Scanning Ring */}
                    {scanning && (
                        <motion.div
                            className="absolute -inset-4 border-2 border-blue-500/50 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </div>

                <h1 className="text-7xl font-thin tracking-tighter">
                    {format(time, 'h:mm')}
                </h1>
                <h2 className="text-xl font-medium opacity-80 mt-2">
                    {format(time, 'EEEE, MMMM d')}
                </h2>
            </div>

            <div className="flex flex-col items-center gap-2">
                {scanning ? (
                    <span className="text-sm font-medium tracking-widest uppercase opacity-60 animate-pulse">
                        Scanning Face...
                    </span>
                ) : unlocked ? (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-sm font-medium tracking-widest uppercase opacity-60">
                            Swipe up to Open
                        </span>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-12 bg-white/20 rounded-full"
                        />
                    </motion.div>
                ) : (
                    <span className="text-sm font-medium tracking-widest uppercase opacity-60">
                        Locked
                    </span>
                )}
            </div>
        </motion.div>
    );
};

export default LockScreen;
