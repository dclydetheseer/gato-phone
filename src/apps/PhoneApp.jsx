import React, { useState, useEffect } from 'react';
import { Phone, Clock, User, Delete, PhoneCall, ArrowDownLeft } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { useSystemSound } from '../hooks/useSystemSound';

const PhoneApp = () => {
    const { theme } = useOS();
    const { playClick, playType } = useSystemSound();
    const [activeTab, setActiveTab] = useState('keypad');
    const [number, setNumber] = useState('');
    const [isCalling, setIsCalling] = useState(false);

    // Load history from localStorage
    const [recents, setRecents] = useState(() => {
        const saved = localStorage.getItem('gato_call_history');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('gato_call_history', JSON.stringify(recents));
    }, [recents]);

    const handleNumberClick = (num) => {
        playType(); // Dial sound
        if (number.length < 15) {
            setNumber(prev => prev + num);
        }
    };

    const handleDelete = () => {
        playClick();
        setNumber(prev => prev.slice(0, -1));
    };

    const handleCall = () => {
        if (number) {
            playClick();
            setIsCalling(true);

            // Add to recents
            const newCall = {
                id: Date.now(),
                number: number,
                type: 'outgoing',
                time: new Date().toLocaleString(),
                duration: '0:00' // Placeholder
            };
            setRecents(prev => [newCall, ...prev]);

            // Simulate call ending
            setTimeout(() => {
                setIsCalling(false);
            }, 3000);
        }
    };

    if (isCalling) {
        return (
            <div className="h-full bg-gray-900 text-white flex flex-col items-center justify-between py-12">
                <div className="flex flex-col items-center mt-12">
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                        <User size={48} />
                    </div>
                    <h2 className="text-2xl font-bold">{number}</h2>
                    <p className="text-sm opacity-60 animate-pulse">Calling...</p>
                </div>
                <button
                    onClick={() => setIsCalling(false)}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                    <PhoneCall size={32} className="rotate-[135deg]" />
                </button>
            </div>
        );
    }

    const renderRecents = () => (
        <div className="flex-1 overflow-y-auto">
            <h2 className="px-4 py-2 text-xs font-bold opacity-50 uppercase tracking-wider">Recent Calls</h2>
            {recents.length === 0 && (
                <div className="text-center opacity-50 mt-10 text-sm">No recent calls</div>
            )}
            {recents.map(call => (
                <div key={call.id} className="px-4 py-3 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Phone size={18} className="opacity-50" />
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-sm">{call.number}</div>
                        <div className="flex items-center gap-1 text-xs opacity-60">
                            <ArrowDownLeft size={12} className="text-green-500" />
                            <span>Outgoing</span>
                            <span>•</span>
                            <span>{call.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Content based on Tab */}
            {activeTab === 'keypad' && (
                <>
                    {/* Display */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <div className="text-3xl font-bold mb-2 h-10">{number}</div>
                        {number && (
                            <button onClick={() => setNumber('')} className="text-xs text-blue-500 font-medium">
                                Add to Contacts
                            </button>
                        )}
                    </div>

                    {/* Keypad */}
                    <div className="pb-8 px-8">
                        <div className="grid grid-cols-3 gap-x-6 gap-y-4 mb-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleNumberClick(item.toString())}
                                    className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-colors ${theme === 'dark' ? 'bg-gray-800 active:bg-gray-700' : 'bg-gray-100 active:bg-gray-200'}`}
                                >
                                    <span className="text-2xl font-medium">{item}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-center gap-8">
                            <div className="w-16" /> {/* Spacer */}
                            <button
                                onClick={handleCall}
                                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform text-white"
                            >
                                <Phone size={28} />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-16 h-16 flex items-center justify-center text-gray-400 active:text-gray-600"
                            >
                                {number && <Delete size={24} />}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'recents' && renderRecents()}

            {(activeTab === 'favorites' || activeTab === 'contacts') && (
                <div className="flex-1 flex items-center justify-center opacity-50 text-sm">
                    No contacts yet
                </div>
            )}

            {/* Tabs */}
            <div className={`flex items-center justify-around py-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                <button
                    onClick={() => setActiveTab('favorites')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'favorites' ? 'text-blue-500' : 'opacity-50'}`}
                >
                    <User size={20} />
                    <span className="text-[10px] font-medium">Favorites</span>
                </button>
                <button
                    onClick={() => setActiveTab('recents')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'recents' ? 'text-blue-500' : 'opacity-50'}`}
                >
                    <Clock size={20} />
                    <span className="text-[10px] font-medium">Recents</span>
                </button>
                <button
                    onClick={() => setActiveTab('contacts')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'contacts' ? 'text-blue-500' : 'opacity-50'}`}
                >
                    <User size={20} />
                    <span className="text-[10px] font-medium">Contacts</span>
                </button>
                <button
                    onClick={() => setActiveTab('keypad')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'keypad' ? 'text-blue-500' : 'opacity-50'}`}
                >
                    <Phone size={20} />
                    <span className="text-[10px] font-medium">Keypad</span>
                </button>
            </div>
        </div>
    );
};

export default PhoneApp;
