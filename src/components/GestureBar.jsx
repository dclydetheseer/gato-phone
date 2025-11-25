import React from 'react';
import { useOS } from '../context/OSContext';
import { useSystemSound } from '../hooks/useSystemSound';

const GestureBar = () => {
    const { closeApp, activeApp, toggleRecents, closeRecents, closeAppDrawer } = useOS();
    const { playClick } = useSystemSound();
    const startY = React.useRef(0);
    const startX = React.useRef(0);

    const handlePointerDown = (e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        startY.current = e.clientY;
        startX.current = e.clientX;
    };

    const handlePointerUp = (e) => {
        const endY = e.clientY;
        const endX = e.clientX;
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

        // Swipe Up and Hold (Simplified)
        if (diffY > 150) {
            toggleRecents();
        }
    };

    // Click fallback for quick taps
    const handleClick = () => {
        // Only trigger if it wasn't a drag
        // We can check if startY and endY are close
        // For now, let's keep it simple. If the user clicks without dragging much, it's a home action.
    };

    return (
        <div className="h-8 w-full absolute bottom-1 left-0 z-50 flex items-center justify-center pointer-events-auto">
            <div
                className="w-32 h-1.5 bg-white/50 rounded-full cursor-pointer active:bg-white transition-colors touch-none"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            ></div>
        </div>
    );
};

export default GestureBar;
