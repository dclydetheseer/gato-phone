import React from 'react';
import { Settings, Clock, Calculator, Globe } from 'lucide-react';

const Dock = () => {
    const dockItems = [
        { icon: Settings, label: 'Settings', color: 'bg-gray-500' },
        { icon: Clock, label: 'Clock', color: 'bg-black' },
        { icon: Calculator, label: 'Calculator', color: 'bg-orange-500' },
        { icon: Globe, label: 'Browser', color: 'bg-blue-500' },
    ];

    return (
        <div className="absolute bottom-4 left-4 right-4 h-20 bg-white/20 backdrop-blur-xl rounded-[30px] flex items-center justify-around px-4 border border-white/10 shadow-lg z-50">
            {dockItems.map((item, index) => (
                <button
                    key={index}
                    className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-200 active:scale-95`}
                >
                    <item.icon size={24} />
                </button>
            ))}
        </div>
    );
};

export default Dock;
