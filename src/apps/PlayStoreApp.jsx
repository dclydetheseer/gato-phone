import React from 'react';
import { Search, Star, Download } from 'lucide-react';

const AppCard = ({ name, developer, rating, image, color }) => (
    <div className="flex gap-4 mb-6 cursor-pointer active:opacity-70 transition-opacity">
        <div className={`w-16 h-16 ${color} rounded-2xl shadow-sm flex-shrink-0`}></div>
        <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-900 truncate">{name}</h3>
            <p className="text-sm text-gray-500 truncate">{developer}</p>
            <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-600">{rating}</span>
                <Star size={10} className="text-gray-600 fill-gray-600" />
            </div>
        </div>
    </div>
);

const PlayStoreApp = () => {
    return (
        <div className="h-full bg-white flex flex-col">
            {/* Search Header */}
            <div className="px-4 py-3 sticky top-0 bg-white z-10 shadow-sm">
                <div className="bg-gray-100 h-12 rounded-lg flex items-center px-4 gap-3 shadow-sm border border-gray-200">
                    <Search size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search for apps & games"
                        className="bg-transparent flex-1 focus:outline-none text-gray-900 placeholder-gray-500"
                    />
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        F
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recommended for you</h2>

                <AppCard name="Instagram" developer="Instagram" rating="4.5" color="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600" />
                <AppCard name="WhatsApp Messenger" developer="WhatsApp LLC" rating="4.3" color="bg-green-500" />
                <AppCard name="Spotify: Music and Podcasts" developer="Spotify AB" rating="4.6" color="bg-green-400" />
                <AppCard name="Netflix" developer="Netflix, Inc." rating="4.2" color="bg-red-600" />
                <AppCard name="TikTok" developer="TikTok Pte. Ltd." rating="4.4" color="bg-black" />
                <AppCard name="Snapchat" developer="Snap Inc" rating="4.1" color="bg-yellow-400" />

                <h2 className="text-lg font-medium text-gray-900 mt-6 mb-4">New & updated games</h2>
                <AppCard name="Subway Surfers" developer="SYBO Games" rating="4.6" color="bg-blue-500" />
                <AppCard name="Candy Crush Saga" developer="King" rating="4.7" color="bg-pink-500" />
            </div>

            {/* Bottom Nav */}
            <div className="h-14 border-t border-gray-200 flex items-center justify-around px-4 bg-white">
                <div className="flex flex-col items-center gap-1 text-green-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Download size={16} />
                    </div>
                    <span className="text-xs font-medium">Games</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500">
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Search size={20} />
                    </div>
                    <span className="text-xs font-medium">Apps</span>
                </div>
            </div>
        </div>
    );
};

export default PlayStoreApp;
