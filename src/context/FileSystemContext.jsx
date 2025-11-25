import React, { createContext, useContext, useState, useEffect } from 'react';

const FileSystemContext = createContext();

export const useFileSystem = () => useContext(FileSystemContext);

export const FileSystemProvider = ({ children }) => {
    const [fs, setFs] = useState(() => {
        try {
            const savedFs = localStorage.getItem('gato_os_fs');
            return savedFs ? JSON.parse(savedFs) : {
                '/storage/emulated/0/DCIM/Camera': [],
                '/storage/emulated/0/Pictures': [],
                '/storage/emulated/0/Downloads': [],
            };
        } catch (e) {
            console.error("Failed to parse file system", e);
            return {
                '/storage/emulated/0/DCIM/Camera': [],
                '/storage/emulated/0/Pictures': [],
                '/storage/emulated/0/Downloads': [],
            };
        }
    });

    useEffect(() => {
        localStorage.setItem('gato_os_fs', JSON.stringify(fs));
    }, [fs]);

    const saveFile = (path, data) => {
        setFs(prev => {
            const dir = prev[path] || [];
            return {
                ...prev,
                [path]: [...dir, data]
            };
        });
    };

    const getFiles = (path) => {
        return fs[path] || [];
    };

    const deleteFile = (path, fileId) => {
        setFs(prev => {
            const dir = prev[path] || [];
            return {
                ...prev,
                [path]: dir.filter(f => f.id !== fileId)
            };
        });
    };

    return (
        <FileSystemContext.Provider value={{ fs, saveFile, getFiles, deleteFile }}>
            {children}
        </FileSystemContext.Provider>
    );
};
