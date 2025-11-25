import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BootAnimation = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 1000); // Start logo animation
        const timer2 = setTimeout(() => setStep(2), 2500); // Show "Gato" text
        const timer3 = setTimeout(() => setStep(3), 4000); // Fade out
        const timer4 = setTimeout(onComplete, 4500); // Complete

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
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                {/* Logo Circle */}
                <motion.div
                    className="w-24 h-24 bg-white rounded-full flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: step >= 1 ? 1 : 0, rotate: step >= 1 ? 0 : -180 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <span className="text-4xl">🐱</span>
                </motion.div>

                {/* Loading Ring */}
                {step >= 1 && step < 3 && (
                    <motion.div
                        className="absolute -inset-4 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                )}
            </div>

            {/* Text */}
            <motion.h1
                className="text-white text-3xl font-bold mt-8 tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
                transition={{ duration: 0.8 }}
            >
                GATO OS
            </motion.h1>

            <motion.p
                className="text-gray-500 text-sm mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 2 ? 1 : 0 }}
                transition={{ delay: 0.5 }}
            >
                Powered by React
            </motion.p>
        </motion.div>
    );
};

export default BootAnimation;
