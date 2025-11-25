import React, { useState, useEffect } from 'react';
import { Globe, AlarmClock, Timer, Hourglass } from 'lucide-react';

const ClockApp = () => {
    const [time, setTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState('clock');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-full bg-white flex flex-col text-gray-900">
            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                {activeTab === 'clock' && (
                    <div className="text-center">
                        <div className="text-6xl font-light mb-2">
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-xl text-gray-500">
                            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                )}
                {activeTab === 'alarm' && (
                    <div className="text-center text-gray-500">
                        <AlarmClock size={64} className="mx-auto mb-4 opacity-50" />
                        <p>No alarms set</p>
                    </div>
                )}
                {activeTab === 'timer' && (
                    <div className="text-center text-gray-500">
                        <Hourglass size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Timer</p>
                    </div>
                )}
                {activeTab === 'stopwatch' && (
                    <div className="text-center text-gray-500">
                        <Timer size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Stopwatch</p>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="h-16 border-t border-gray-200 flex items-center justify-around px-4">
                <button
                    onClick={() => setActiveTab('alarm')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'alarm' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                    <AlarmClock size={24} />
                    <span className="text-xs font-medium">Alarm</span>
                </button>
                <button
                    onClick={() => setActiveTab('clock')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'clock' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                    <Globe size={24} />
                    <span className="text-xs font-medium">Clock</span>
                </button>
                <button
                    onClick={() => setActiveTab('timer')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'timer' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                    <Hourglass size={24} />
                    <span className="text-xs font-medium">Timer</span>
                </button>
                <button
                    onClick={() => setActiveTab('stopwatch')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'stopwatch' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                    <Timer size={24} />
                    <span className="text-xs font-medium">Stopwatch</span>
                </button>
            </div>
        </div>
    );
};

export default ClockApp;
