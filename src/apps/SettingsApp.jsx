import React from 'react';
import { Moon, Sun, Wifi, Bluetooth, Battery, Volume2, Bell, Shield, User } from 'lucide-react';

const SettingsItem = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors border-b border-gray-100 last:border-0">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${color} text-white`}>
                <Icon size={18} />
            </div>
            <span className="font-medium text-gray-900">{label}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
            <span className="text-sm">{value}</span>
            <div className="text-gray-300">›</div>
        </div>
    </div>
);

const SettingsApp = () => {
    return (
        <div className="h-full bg-gray-50">
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-6 px-2">Settings</h1>

                {/* Profile Section */}
                <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        G
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Gato User</h2>
                        <p className="text-gray-500 text-sm">Apple ID, iCloud, Media & Purchases</p>
                    </div>
                </div>

                {/* Connectivity */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
                    <SettingsItem icon={Wifi} label="Wi-Fi" value="Gato-Net 5G" color="bg-blue-500" />
                    <SettingsItem icon={Bluetooth} label="Bluetooth" value="On" color="bg-blue-500" />
                    <SettingsItem icon={Wifi} label="Cellular" value="" color="bg-green-500" />
                </div>

                {/* Notifications & Sounds */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
                    <SettingsItem icon={Bell} label="Notifications" value="" color="bg-red-500" />
                    <SettingsItem icon={Volume2} label="Sounds & Haptics" value="" color="bg-pink-500" />
                    <SettingsItem icon={Moon} label="Focus" value="" color="bg-indigo-500" />
                </div>

                {/* General */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
                    <SettingsItem icon={Shield} label="General" value="" color="bg-gray-500" />
                    <SettingsItem icon={User} label="Privacy & Security" value="" color="bg-blue-600" />
                </div>
            </div>
        </div>
    );
};

export default SettingsApp;
