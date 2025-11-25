import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Battery, Flashlight, Moon, RotateCcw, Settings, Bell, Sun, Volume2 } from 'lucide-react';
import { format } from 'date-fns';
import { useOS } from '../context/OSContext';

const QuickSettingTile = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-2"
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'}`}>
            <Icon size={20} />
        </div>
        <span className="text-xs text-gray-300 font-medium">{label}</span>
    </button>
);

const NotificationShade = () => {
    const { isShadeOpen, closeShade, notifications, theme, toggleTheme } = useOS();
    const time = new Date();
    const [wifi, setWifi] = React.useState(true);
    const [bluetooth, setBluetooth] = React.useState(true);
    const [flashlight, setFlashlight] = React.useState(false);
    const [autoRotate, setAutoRotate] = React.useState(false);
    const [batterySaver, setBatterySaver] = React.useState(false);

    return (
        <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: isShadeOpen ? '0%' : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-black/95 z-[60] text-white flex flex-col"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
                if (offset.y < -50 || velocity.y < -500) {
                    closeShade();
                }
            }}
        >
            {/* Header */}
            <div className="px-6 pt-12 pb-4 flex justify-between items-end">
                <div className="text-4xl font-light">{format(time, 'h:mm')}</div>
                <div className="flex gap-3 text-sm font-medium text-gray-400">
                    <span>{format(time, 'EEE, MMM d')}</span>
                    <Settings size={20} />
                </div>
            </div>

            {/* Quick Settings Grid */}
            <div className="px-6 py-4 grid grid-cols-4 gap-4 border-b border-white/10 pb-8">
                <QuickSettingTile icon={Wifi} label="Wi-Fi" active={wifi} onClick={() => setWifi(!wifi)} />
                <QuickSettingTile icon={Bluetooth} label="Bluetooth" active={bluetooth} onClick={() => setBluetooth(!bluetooth)} />
                <QuickSettingTile icon={Flashlight} label="Flashlight" active={flashlight} onClick={() => setFlashlight(!flashlight)} />
                <QuickSettingTile icon={RotateCcw} label="Auto-rotate" active={autoRotate} onClick={() => setAutoRotate(!autoRotate)} />
                <QuickSettingTile icon={Battery} label="Battery Saver" active={batterySaver} onClick={() => setBatterySaver(!batterySaver)} />
                <QuickSettingTile icon={Moon} label="Dark Mode" active={theme === 'dark'} onClick={toggleTheme} />
            </div>

            {/* Sliders */}
            <div className="px-6 py-4 space-y-4">
                {/* Brightness */}
                <div className="h-12 bg-gray-800/80 backdrop-blur-md rounded-2xl flex items-center px-4 relative overflow-hidden group">
                    <Sun size={20} className="text-white z-10 mr-3" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="absolute left-0 top-0 h-full bg-white/20 w-[70%] rounded-2xl pointer-events-none"></div>
                </div>

                {/* Volume */}
                <div className="h-12 bg-gray-800/80 backdrop-blur-md rounded-2xl flex items-center px-4 relative overflow-hidden group">
                    <Volume2 size={20} className="text-white z-10 mr-3" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="absolute left-0 top-0 h-full bg-white/20 w-[50%] rounded-2xl pointer-events-none"></div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Notifications</h3>

                {notifications.length === 0 && (
                    <div className="text-center text-gray-500 py-8 text-sm">
                        No new notifications
                    </div>
                )}

                {notifications.map((n) => (
                    <div key={n.id} className="bg-gray-900 rounded-2xl p-4 flex gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                            <Bell size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">{n.title}</h4>
                                <span className="text-xs text-gray-500">Now</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{n.message}</p>
                            <div className="flex gap-4 mt-3">
                                <button className="text-xs font-medium text-blue-400 hover:text-blue-300">Reply</button>
                                <button className="text-xs font-medium text-gray-500 hover:text-gray-400">Dismiss</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Handle Bar */}
            <div className="h-6 flex items-center justify-center" onClick={closeShade}>
                <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
            </div>
        </motion.div>
    );
};

export default NotificationShade;
