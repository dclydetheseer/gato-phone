import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';
import { format } from 'date-fns';

const StatusBar = ({ theme = 'light' }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

    return (
        <div className={`h-8 w-full flex items-center justify-between px-4 ${textColor} z-50 absolute top-0 left-0 text-sm font-medium`}>
            {/* Time on the left for Android 10+ */}
            <span className="tracking-wide">
                {format(time, 'h:mm')}
            </span>

            <div className="flex items-center gap-1.5">
                <Wifi size={16} strokeWidth={2.5} />
                <Signal size={16} strokeWidth={2.5} />
                <div className="relative">
                    <Battery size={18} strokeWidth={2.5} className="rotate-0" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-current rounded-[1px]"></div>
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
