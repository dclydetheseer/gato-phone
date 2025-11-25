import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';
import { format } from 'date-fns';

const StatusBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-12 w-full flex items-center justify-between px-6 text-white z-50 absolute top-0 left-0">
            <span className="text-sm font-semibold tracking-wide">
                {format(time, 'h:mm')}
            </span>

            <div className="flex items-center gap-2">
                <Signal size={16} fill="currentColor" />
                <Wifi size={16} />
                <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">100%</span>
                    <Battery size={18} fill="currentColor" />
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
