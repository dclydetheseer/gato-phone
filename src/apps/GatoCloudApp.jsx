import React, { useState, useEffect } from 'react';
import { Cloud, File, Image as ImageIcon, MoreVertical, RefreshCw, Check, HardDrive } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { useFileSystem } from '../context/FileSystemContext';

const GatoCloudApp = () => {
    const { theme, gatoAccount } = useOS();
    const { getFiles } = useFileSystem();
    const [files, setFiles] = useState([]);
    const [syncing, setSyncing] = useState(false);
    const [usedStorage, setUsedStorage] = useState(5.2); // GB

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = () => {
        const allFiles = getFiles('/storage/emulated/0/DCIM/Camera');
        setFiles(allFiles);
    };

    const handleSync = () => {
        setSyncing(true);
        setTimeout(() => {
            setSyncing(false);
        }, 3000);
    };

    if (!gatoAccount) {
        return (
            <div className={`h-full flex flex-col items-center justify-center p-6 text-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-500">
                    <Cloud size={40} />
                </div>
                <h2 className="text-xl font-bold mb-2">Welcome to Gato Cloud</h2>
                <p className="opacity-60 mb-6">Sign in with your Gato ID to back up your photos and files.</p>
                <div className="p-4 bg-blue-500/10 rounded-xl text-blue-500 text-sm font-medium">
                    Please sign in via the Gato ID app.
                </div>
            </div>
        );
    }

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <div className={`p-4 flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm z-10`}>
                <div className="flex items-center gap-3">
                    <Cloud className="text-blue-500" />
                    <span className="font-bold text-lg">Gato Cloud</span>
                </div>
                <button onClick={handleSync} className={`p-2 rounded-full ${syncing ? 'animate-spin text-blue-500' : 'opacity-60'}`}>
                    <RefreshCw size={20} />
                </button>
            </div>

            {/* Storage Status */}
            <div className="p-6">
                <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-6`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium opacity-70">Storage Used</span>
                        <span className="text-sm font-bold text-blue-500">{usedStorage} GB / 15 GB</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[35%] rounded-full"></div>
                    </div>
                </div>

                <h3 className="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">Recent Backups</h3>

                {files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 opacity-50">
                        <HardDrive size={48} className="mb-2" />
                        <p>No files backed up yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {files.map((file, index) => (
                            <div key={index} className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm flex flex-col gap-2`}>
                                <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative">
                                    <img src={file.content} alt="Cloud File" className="w-full h-full object-cover" />
                                    <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ImageIcon size={14} className="opacity-50" />
                                    <span className="text-xs font-medium truncate flex-1">{file.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GatoCloudApp;
