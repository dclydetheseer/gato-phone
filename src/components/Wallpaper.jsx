import React from 'react';
import { useOS } from '../context/OSContext';

const Wallpaper = ({ children }) => {
    const { wallpaper } = useOS();

    const getWallpaperStyle = () => {
        if (wallpaper === 'default') {
            return { background: 'linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%)' };
        } else if (wallpaper.startsWith('data:')) {
            return { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' };
        }
        return { background: 'linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%)' };
    };

    return (
        <div className="w-full h-full relative overflow-hidden" style={getWallpaperStyle()}>
            {children}
        </div>
    );
};

export default Wallpaper;
