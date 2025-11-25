import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Cloud } from 'lucide-react';
import { useOS } from '../context/OSContext';

const StatusBar = () => {
    const { theme } = useOS();
    const [time, setTime] = useState(new Date());
    const [latency, setLatency] = useState(24);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Simulate fluctuating cloud latency
        const latencyTimer = setInterval(() => {
            setLatency(prev => {
                const change = Math.floor(Math.random() * 10) - 5;
                const newValue = prev + change;
                return Math.max(15, Math.min(80, newValue));
            });
        }, 2000);

        return () => {
            clearInterval(timer);
            clearInterval(latencyTimer);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`w-full h-8 px-5 flex items-center justify-between text-xs font-medium z-50 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <div className="flex items-center gap-2">
                <span>{formatTime(time)}</span>
                <div className="flex items-center gap-1 opacity-60 bg-gray-500/20 px-1.5 py-0.5 rounded text-[10px]">
                    <Cloud size={10} />
                    <span>{latency}ms</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Signal size={14} />
                <Wifi size={14} />
                <Battery size={14} />
            </div>
        </div>
    );
};

export default StatusBar;
