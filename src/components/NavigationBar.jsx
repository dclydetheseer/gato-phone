import React from 'react';
import { Triangle, Circle, Square } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { useSystemSound } from '../hooks/useSystemSound';
import Ripple from './Ripple';

const NavigationBar = () => {
    const { closeApp, activeApp, toggleRecents, closeRecents, closeAppDrawer } = useOS();
    const { playClick } = useSystemSound();

    const handleBack = () => {
        playClick();
        if (activeApp) {
            closeApp(activeApp);
        } else {
            closeRecents();
            closeAppDrawer();
        }
    };

    const handleHome = () => {
        playClick();
        if (activeApp) {
            closeApp(activeApp); // Minimize
        }
        closeRecents();
        closeAppDrawer();
    };

    const handleRecents = () => {
        playClick();
        toggleRecents();
    };

    return (
        <div className="h-12 w-full bg-black flex items-center justify-around px-12 z-50 absolute bottom-0 left-0">
            <button
                onClick={handleBack}
                className="p-4 rounded-full transition-colors relative overflow-hidden"
            >
                <Triangle size={20} fill="white" className="text-white -rotate-90" />
                <Ripple />
            </button>

            <button
                onClick={handleHome}
                className="p-4 rounded-full transition-colors relative overflow-hidden"
            >
                <Circle size={18} fill="white" className="text-white" />
                <Ripple />
            </button>

            <button
                onClick={handleRecents}
                className="p-4 rounded-full transition-colors relative overflow-hidden"
            >
                <Square size={18} fill="white" className="text-white" />
                <Ripple />
            </button>
        </div>
    );
};

export default NavigationBar;
