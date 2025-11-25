import React, { useRef } from 'react';
import { Wifi, Bluetooth, Battery, Smartphone, Bell, Lock, User, Info, ChevronRight, Search, Moon, Image as ImageIcon } from 'lucide-react';
import { useOS } from '../context/OSContext';

const SettingsItem = ({ icon: Icon, title, subtitle, color = "bg-blue-500", onClick, toggle }) => (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer" onClick={onClick}>
        <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white`}>
            <Icon size={20} />
        </div>
        <div className="flex-1">
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {toggle ? (
            <div className={`w-12 h-6 rounded-full relative transition-colors ${toggle.value ? 'bg-blue-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${toggle.value ? 'left-7' : 'left-1'}`}></div>
            </div>
        ) : (
            <ChevronRight size={20} className="text-gray-400" />
        )}
    </div>
);

const SettingsApp = () => {
    const { theme, toggleTheme, setWallpaper } = useOS();
    const fileInputRef = useRef(null);

    const handleWallpaperChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setWallpaper(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="h-full bg-white flex flex-col">
            {/* Header */}
            <div className="px-4 py-4 bg-white sticky top-0 z-10">
                <h1 className="text-2xl font-medium text-gray-900 mb-4">Settings</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search settings"
                        className="w-full bg-gray-100 h-12 rounded-full pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto pb-8">
                <div className="py-2">
                    <SettingsItem icon={Wifi} title="Network & internet" subtitle="Wi-Fi, Mobile, Data usage" color="bg-blue-600" />
                    <SettingsItem icon={Bluetooth} title="Connected devices" subtitle="Bluetooth, Cast, NFC" color="bg-green-600" />
                    <SettingsItem icon={Smartphone} title="Apps & notifications" subtitle="Recent apps, Default apps" color="bg-orange-500" />
                    <SettingsItem icon={Battery} title="Battery" subtitle="85% - About 12 hr left" color="bg-teal-500" />
                    <SettingsItem
                        icon={Moon}
                        title="Dark Theme"
                        subtitle={theme === 'dark' ? 'On' : 'Off'}
                        color="bg-gray-800"
                        onClick={toggleTheme}
                        toggle={{ value: theme === 'dark' }}
                    />
                    <SettingsItem
                        icon={ImageIcon}
                        title="Wallpaper"
                        subtitle="Choose from Photos"
                        color="bg-purple-500"
                        onClick={() => fileInputRef.current.click()}
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleWallpaperChange}
                    />
                    <SettingsItem icon={Bell} title="Sound" subtitle="Volume, Vibration, Do Not Disturb" color="bg-blue-400" />
                    <SettingsItem icon={Lock} title="Security & location" subtitle="Screen lock, Fingerprint" color="bg-green-500" />
                    <SettingsItem icon={User} title="Accounts" subtitle="Google, Duo, Other accounts" color="bg-pink-500" />
                    <SettingsItem icon={Info} title="About phone" subtitle="Gato OS 1.0" color="bg-gray-500" />
                </div>
            </div>
        </div>
    );
};

export default SettingsApp;
