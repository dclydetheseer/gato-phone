import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const ClockApp = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Analog Clock Face (Simple CSS implementation) */}
            <div className="w-64 h-64 rounded-full border-4 border-orange-500 relative flex items-center justify-center mb-12 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
                {/* Hour Hand */}
                <div
                    className="absolute w-2 h-16 bg-white rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
                    style={{ transform: `translateX(-50%) rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}
                ></div>
                {/* Minute Hand */}
                <div
                    className="absolute w-1.5 h-24 bg-white rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
                    style={{ transform: `translateX(-50%) rotate(${time.getMinutes() * 6}deg)` }}
                ></div>
                {/* Second Hand */}
                <div
                    className="absolute w-0.5 h-28 bg-orange-500 rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
                    style={{ transform: `translateX(-50%) rotate(${time.getSeconds() * 6}deg)` }}
                ></div>
                {/* Center Dot */}
                <div className="w-3 h-3 bg-orange-500 rounded-full z-10"></div>
            </div>

            <h1 className="text-6xl font-thin tracking-wider mb-2">
                {format(time, 'h:mm')}
            </h1>
            <p className="text-xl text-gray-400 uppercase tracking-widest">
                {format(time, 'a')}
            </p>

            <div className="absolute bottom-12 flex gap-8 text-orange-500">
                <span className="font-bold border-b-2 border-orange-500 pb-1">World Clock</span>
                <span className="text-gray-600">Alarm</span>
                <span className="text-gray-600">Stopwatch</span>
                <span className="text-gray-600">Timer</span>
            </div>
        </div>
    );
};

export default ClockApp;
