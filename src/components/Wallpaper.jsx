import React from 'react';

const Wallpaper = ({ children }) => {
    return (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Abstract Shapes for visual interest */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

            {children}
        </div>
    );
};

export default Wallpaper;
