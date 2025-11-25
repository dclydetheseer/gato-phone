import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings, Clock, Calculator, Globe, Mail, Calendar, Camera, Music, Map, MessageSquare, Phone, User, ShoppingBag, Image, Terminal } from 'lucide-react';
import { useFileSystem } from './FileSystemContext';

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
        { id: 'playstore', name: 'Play Store', icon: ShoppingBag, color: 'bg-gradient-to-br from-green-400 to-blue-500' },
        { id: 'gallery', name: 'Gallery', icon: Image, color: 'bg-purple-500' },
        { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'bg-black' },
    ]);

    const [openApps, setOpenApps] = useState([]);
    const [activeApp, setActiveApp] = useState(null);
    const [isLocked, setIsLocked] = useState(true);
    const [isShadeOpen, setIsShadeOpen] = useState(false);
    const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
    const [isRecentsOpen, setIsRecentsOpen] = useState(false);

    // Persistence for Theme
    const [theme, setTheme] = useState(() => localStorage.getItem('gato_os_theme') || 'light');
    const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('gato_os_wallpaper') || 'default');

    // Power State: 'off', 'booting', 'on'
    const [powerState, setPowerState] = useState('off');

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        localStorage.setItem('gato_os_theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('gato_os_wallpaper', wallpaper);
    }, [wallpaper]);

    const turnOn = () => {
        if (powerState === 'off') {
            setPowerState('booting');
            setTimeout(() => {
                setPowerState('on');
            }, 4500); // Match boot animation duration
        }
    };

    const turnOff = () => {
        setPowerState('off');
        setOpenApps([]);
        setActiveApp(null);
        setIsLocked(true);
    };

    const openShade = () => setIsShadeOpen(true);
    const closeShade = () => setIsShadeOpen(false);
    const toggleShade = () => setIsShadeOpen(prev => !prev);

    const openAppDrawer = () => setIsAppDrawerOpen(true);
    const closeAppDrawer = () => setIsAppDrawerOpen(false);
    const toggleAppDrawer = () => setIsAppDrawerOpen(prev => !prev);

    const openRecents = () => setIsRecentsOpen(true);
    const closeRecents = () => setIsRecentsOpen(false);
    const toggleRecents = () => setIsRecentsOpen(prev => !prev);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
        <OSContext.Provider value={{
            installedApps, openApps, activeApp, isLocked, isShadeOpen, isAppDrawerOpen, isRecentsOpen, notifications, theme, powerState, wallpaper,
            launchApp, closeApp, unlock, lock, openShade, closeShade, toggleShade,
            openAppDrawer, closeAppDrawer, toggleAppDrawer,
            openRecents, closeRecents, toggleRecents, toggleTheme, addNotification,
            turnOn, turnOff, setWallpaper
        }}>
            {children}
        </OSContext.Provider>
    );
};
