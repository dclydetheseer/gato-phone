import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, List, Music as MusicIcon, User } from 'lucide-react';
import { useOS } from '../context/OSContext';

const MusicApp = () => {
    const { theme } = useOS();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    // Using copyright-free music from standard testing sources or placeholder URLs that work
    const songs = [
        {
            title: "Summer Breeze",
            artist: "Gato Vibes",
            duration: "2:30",
            cover: "bg-purple-500",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        },
        {
            title: "Neon Lights",
            artist: "Synthwave Bot",
            duration: "3:15",
            cover: "bg-red-500",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        },
        {
            title: "Digital Dreams",
            artist: "The Pixels",
            duration: "4:05",
            cover: "bg-blue-500",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        },
    ];

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, currentSong]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextSong = () => {
        setCurrentSong((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
    };

    const prevSong = () => {
        setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    const handleEnded = () => {
        nextSong();
    };

    const formatTime = (time) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <audio
                ref={audioRef}
                src={songs[currentSong].url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <span className="font-bold text-lg">Music</span>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User size={16} />
                </div>
            </div>

            {/* Now Playing */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className={`w-64 h-64 rounded-2xl shadow-2xl mb-8 ${songs[currentSong].cover} flex items-center justify-center relative overflow-hidden`}>
                    <MusicIcon size={64} className="text-white opacity-50" />
                    {isPlaying && (
                        <div className="absolute inset-0 bg-black/10 animate-pulse"></div>
                    )}
                </div>

                <div className="w-full mb-8 text-center">
                    <h2 className="text-2xl font-bold mb-1">{songs[currentSong].title}</h2>
                    <p className="text-lg opacity-60">{songs[currentSong].artist}</p>
                </div>

                {/* Progress */}
                <div className="w-full mb-8">
                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 cursor-pointer" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const width = rect.width;
                        const percent = x / width;
                        if (audioRef.current) {
                            audioRef.current.currentTime = percent * audioRef.current.duration;
                        }
                    }}>
                        <div className="h-full bg-pink-500 rounded-full relative" style={{ width: `${progress}%` }}>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs opacity-50 font-medium">
                        <span>{formatTime(audioRef.current?.currentTime)}</span>
                        <span>{songs[currentSong].duration}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between w-full max-w-xs">
                    <button onClick={prevSong} className="p-2 opacity-70 hover:opacity-100 active:scale-95 transition-transform">
                        <SkipBack size={32} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                    >
                        {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={nextSong} className="p-2 opacity-70 hover:opacity-100 active:scale-95 transition-transform">
                        <SkipForward size={32} />
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

export default MusicApp;
