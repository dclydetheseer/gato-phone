import React, { useState } from 'react';
import { Phone, Clock, User, Delete, PhoneCall } from 'lucide-react';
import { useOS } from '../context/OSContext';

const PhoneApp = () => {
    const { theme } = useOS();
    const [activeTab, setActiveTab] = useState('keypad');
    const [number, setNumber] = useState('');
    const [isCalling, setIsCalling] = useState(false);

    const handleNumberClick = (num) => {
        if (number.length < 15) {
            setNumber(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setNumber(prev => prev.slice(0, -1));
    };

    const handleCall = () => {
        if (number) {
            setIsCalling(true);
            setTimeout(() => {
                setIsCalling(false);
            }, 3000); // Simulate call ending
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

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
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
