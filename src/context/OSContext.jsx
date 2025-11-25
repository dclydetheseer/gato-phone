import React, { createContext, useContext, useState } from 'react';
import { Settings, Clock, Calculator, Globe, Mail, Calendar, Camera, Music, Map, MessageSquare, Phone, User } from 'lucide-react';

const OSContext = createContext();

export const useOS = () => useContext(OSContext);

export const OSProvider = ({ children }) => {
    const [installedApps, setInstalledApps] = useState([
        { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-gray-500' },
        { id: 'clock', name: 'Clock', icon: Clock, color: 'bg-black' },
        { id: 'calculator', name: 'Calculator', icon: Calculator, color: 'bg-orange-500' },
        { id: 'browser', name: 'Browser', icon: Globe, color: 'bg-blue-500' },
        { id: 'mail', name: 'Mail', icon: Mail, color: 'bg-blue-400' },
        { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'bg-red-500' },
        { id: 'camera', name: 'Camera', icon: Camera, color: 'bg-gray-800' },
        { id: 'music', name: 'Music', icon: Music, color: 'bg-pink-500' },
        { id: 'maps', name: 'Maps', icon: Map, color: 'bg-green-500' },
        { id: 'messages', name: 'Messages', icon: MessageSquare, color: 'bg-green-400' },
        { id: 'phone', name: 'Phone', icon: Phone, color: 'bg-green-500' },
        { id: 'contacts', name: 'Contacts', icon: User, color: 'bg-gray-400' },
    ]);

    const [openApps, setOpenApps] = useState([]);
    const [activeApp, setActiveApp] = useState(null);
    const [isLocked, setIsLocked] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { ...notification, id }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    };

    const unlock = () => setIsLocked(false);
    const lock = () => setIsLocked(true);

    const launchApp = (appId) => {
        if (!openApps.includes(appId)) {
            setOpenApps([...openApps, appId]);
        }
        setActiveApp(appId);
    };

    const closeApp = (appId) => {
        setOpenApps(openApps.filter(id => id !== appId));
        if (activeApp === appId) {
            setActiveApp(null);
        }
    };

    return (
        <OSContext.Provider value={{ installedApps, openApps, activeApp, isLocked, notifications, launchApp, closeApp, unlock, lock, addNotification }}>
            {children}
        </OSContext.Provider>
    );
};
