import React from 'react';
import { Search, MapPin, Navigation, Layers, Menu } from 'lucide-react';
import { useOS } from '../context/OSContext';

const MapsApp = () => {
    const { theme } = useOS();

    return (
        <div className={`h-full flex flex-col relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {/* Map Background (Simulated) */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
                {/* Grid Pattern to simulate map streets */}
                <div className={`w-full h-full ${theme === 'dark' ? 'bg-[#242f3e]' : 'bg-[#e5e3df]'}`}
                    style={{
                        backgroundImage: `linear-gradient(${theme === 'dark' ? '#333' : '#fff'} 2px, transparent 2px), linear-gradient(90deg, ${theme === 'dark' ? '#333' : '#fff'} 2px, transparent 2px)`,
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                {/* Simulated Roads */}
                <div className="absolute top-1/2 left-0 w-full h-4 bg-yellow-200/50 -translate-y-1/2"></div>
                <div className="absolute top-0 left-1/3 w-4 h-full bg-white/50"></div>

                {/* Simulated Park */}
                <div className="absolute top-20 right-10 w-32 h-32 bg-green-500/20 rounded-xl"></div>

                {/* Current Location Dot */}
                <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
            </div>

            {/* Search Bar */}
            <div className={`relative z-10 m-4 p-3 rounded-full shadow-md flex items-center gap-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <Menu size={20} className="opacity-60" />
                <input
                    type="text"
                    placeholder="Search here"
                    className="flex-1 bg-transparent outline-none text-sm font-medium"
                />
                <div className="w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    F
                </div>
            </div>

            {/* Category Chips */}
            <div className="relative z-10 px-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {['Restaurants', 'Gas', 'Groceries', 'Coffee', 'Hotels'].map(item => (
                    <button key={item} className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm whitespace-nowrap ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                        {item}
                    </button>
                ))}
            </div>

            {/* Bottom Sheet */}
            <div className={`absolute bottom-0 left-0 w-full p-4 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-20 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 opacity-50"></div>
                <h3 className="font-bold text-lg mb-1">Explore Gato City</h3>
                <div className="flex items-center gap-2 text-xs opacity-60 mb-4">
                    <MapPin size={12} />
                    <span>Current Location • 72°F</span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`min-w-[120px] h-32 rounded-xl bg-gray-200 dark:bg-gray-700 relative overflow-hidden`}>
                            <img src={`https://picsum.photos/seed/${i}/200/200`} alt="Place" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-bold">
                                Place {i}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAB */}
            <button className="absolute bottom-48 right-4 w-12 h-12 bg-white text-blue-500 rounded-full shadow-lg flex items-center justify-center z-10 active:scale-95 transition-transform">
                <Navigation size={20} fill="currentColor" />
            </button>
        </div>
    );
};

export default MapsApp;
