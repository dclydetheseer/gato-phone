import React from 'react';
import { useOS } from '../context/OSContext';
import { useSystemSound } from '../hooks/useSystemSound';

const GestureBar = () => {
    const { closeApp, activeApp, toggleRecents, closeRecents, closeAppDrawer } = useOS();
    const { playClick } = useSystemSound();
    const startY = React.useRef(0);
    const startX = React.useRef(0);

    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const diffY = startY.current - endY;
        const diffX = startX.current - endX;

        // Swipe Up
        if (diffY > 50 && Math.abs(diffX) < 30) {
            playClick();
            if (activeApp) {
                closeApp(activeApp); // Go Home
            } else {
                closeRecents();
                closeAppDrawer();
            }
        }

        // Swipe Up and Hold (Simplified as just a long swipe for now or we need a timer)
        // For web simulation, let's make a "Long Swipe Up" trigger Recents
        if (diffY > 150) {
            toggleRecents();
        }
    };

    // Click fallback for desktop users
    const handleClick = () => {
        playClick();
        if (activeApp) {
            closeApp(activeApp);
        } else {
            closeRecents();
            closeAppDrawer();
        }
    };

    return (
        <div className="h-8 w-full absolute bottom-1 left-0 z-50 flex items-center justify-center pointer-events-auto">
            <div
                className="w-32 h-1.5 bg-white/50 rounded-full cursor-pointer active:bg-white transition-colors"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={handleClick}
            ></div>
        </div>
    );
};

export default GestureBar;
