import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, List, Music as MusicIcon } from 'lucide-react';
import { useOS } from '../context/OSContext';

const MusicApp = () => {
    const { theme } = useOS();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [progress, setProgress] = useState(30);

    const songs = [
        { title: "Midnight City", artist: "M83", duration: "4:03", cover: "bg-purple-500" },
        { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", cover: "bg-red-500" },
        { title: "Levitating", artist: "Dua Lipa", duration: "3:23", cover: "bg-blue-500" },
        { title: "Save Your Tears", artist: "The Weeknd", duration: "3:35", cover: "bg-orange-500" },
    ];

    const togglePlay = () => setIsPlaying(!isPlaying);
    const nextSong = () => setCurrentSong((prev) => (prev + 1) % songs.length);
    const prevSong = () => setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <span className="font-bold text-lg">Music</span>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User size={16} />
                </div>
            </div>

            {/* Now Playing */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className={`w-64 h-64 rounded-2xl shadow-2xl mb-8 ${songs[currentSong].cover} flex items-center justify-center`}>
                    <MusicIcon size={64} className="text-white opacity-50" />
                </div>

                <div className="w-full mb-8">
                    <h2 className="text-2xl font-bold mb-1">{songs[currentSong].title}</h2>
                    <p className="text-lg opacity-60">{songs[currentSong].artist}</p>
                </div>

                {/* Progress */}
                <div className="w-full mb-8">
                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
                        <div className="h-full bg-pink-500 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs opacity-50 font-medium">
                        <span>1:12</span>
                        <span>{songs[currentSong].duration}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between w-full max-w-xs">
                    <button onClick={prevSong} className="p-2 opacity-70 hover:opacity-100">
                        <SkipBack size={28} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                    >
                        {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={nextSong} className="p-2 opacity-70 hover:opacity-100">
                        <SkipForward size={28} />
                    </button>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={`h-16 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'} flex items-center justify-around`}>
                <div className="flex flex-col items-center gap-1 text-pink-500">
                    <Heart size={20} fill="currentColor" />
                    <span className="text-[10px] font-bold">For You</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-50">
                    <List size={20} />
                    <span className="text-[10px] font-medium">Library</span>
                </div>
            </div>
        </div>
    );
};

// Helper component for user icon
const User = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default MusicApp;
