import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Circle } from 'lucide-react';
import { useFileSystem } from '../context/FileSystemContext';

const CameraApp = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [facingMode, setFacingMode] = useState('user');
    const { saveFile } = useFileSystem();
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, [facingMode]);

    const startCamera = async () => {
        try {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facingMode }
            });
            setStream(newStream);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            setFlash(true);
            setTimeout(() => setFlash(false), 100);

            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (facingMode === 'user') {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
            }
            ctx.drawImage(video, 0, 0);

            const imageData = canvas.toDataURL('image/jpeg');

            saveFile('/storage/emulated/0/DCIM/Camera', {
                id: Date.now(),
                name: `IMG_${Date.now()}.jpg`,
                data: imageData,
                date: new Date().toISOString()
            });
        }
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    return (
        <div className="h-full bg-black flex flex-col relative overflow-hidden">
            {/* Viewfinder */}
            <div className="flex-1 relative">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Flash Effect */}
                {flash && <div className="absolute inset-0 bg-white z-50 animate-fade-out" />}
            </div>

            {/* Controls */}
            <div className="h-32 bg-black/50 absolute bottom-0 w-full flex items-center justify-around pb-8 backdrop-blur-sm">
                <button className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center text-white">
                    <div className="w-10 h-10 bg-gray-900 rounded-md border border-gray-600"></div>
                </button>

                <button
                    onClick={takePhoto}
                    className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-transform"
                >
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                </button>

                <button
                    onClick={toggleCamera}
                    className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center text-white active:rotate-180 transition-transform duration-500"
                >
                    <RefreshCw size={24} />
                </button>
            </div>
        </div>
    );
};

export default CameraApp;
