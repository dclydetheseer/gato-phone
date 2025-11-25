import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const BootAnimation = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 1500); // Start logo animation
        const timer2 = setTimeout(() => setStep(2), 3500); // Show "Gato" text
        const timer3 = setTimeout(() => setStep(3), 6000); // Fade out
        const timer4 = setTimeout(onComplete, 8000); // Complete

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="absolute inset-0 bg-black z-[100] flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: step === 3 ? 0 : 1 }}
            transition={{ duration: 1 }}
        >
            <div className="relative">
                {/* Logo Circle */}
                <motion.div
                    className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: step >= 1 ? 1 : 0, rotate: step >= 1 ? 0 : -180 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    <Cpu size={48} className="text-black" strokeWidth={1.5} />
                </motion.div>

                {/* Loading Ring */}
                {step >= 1 && step < 3 && (
                    <motion.div
                        className="absolute -inset-6 border-2 border-t-white/80 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                )}
            </div>

            {/* Text */}
            <div className="mt-12 flex flex-col items-center">
                <motion.h1
                    className="text-white text-4xl font-light tracking-[0.2em]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
                    transition={{ duration: 1 }}
                >
                    GATO
                </motion.h1>

                <motion.div
                    className="h-px w-12 bg-white/30 mt-4"
                    initial={{ width: 0 }}
                    animate={{ width: step >= 2 ? 48 : 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                />

                <motion.p
                    className="text-white/40 text-xs mt-4 font-medium tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step >= 2 ? 1 : 0 }}
                    transition={{ delay: 0.8 }}
                >
                    Powered by React
                </motion.p>
            </div>
        </motion.div>
    );
};

export default BootAnimation;
