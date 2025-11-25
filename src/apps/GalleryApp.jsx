import React from 'react';
import { ArrowLeft, MoreVertical, Share2, Trash2, Info } from 'lucide-react';
import { useFileSystem } from '../context/FileSystemContext';

const GalleryApp = () => {
    const { getFiles, deleteFile } = useFileSystem();
    const photos = getFiles('/storage/emulated/0/DCIM/Camera').sort((a, b) => b.id - a.id);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null);

    if (selectedPhoto) {
        return (
            <div className="h-full bg-black flex flex-col z-50">
                {/* Photo View Header */}
                <div className="h-14 flex items-center justify-between px-4 bg-black/50 absolute top-0 w-full z-10">
                    <button onClick={() => setSelectedPhoto(null)} className="text-white">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex gap-4 text-white">
                        <Share2 size={24} />
                        <MoreVertical size={24} />
                    </div>
                </div>

                {/* Photo */}
                <div className="flex-1 flex items-center justify-center">
                    <img src={selectedPhoto.data} alt={selectedPhoto.name} className="max-w-full max-h-full object-contain" />
                </div>

                {/* Photo View Footer */}
                <div className="h-16 bg-black/50 absolute bottom-0 w-full flex items-center justify-around text-white pb-4">
                    <div className="flex flex-col items-center gap-1" onClick={() => {
                        deleteFile('/storage/emulated/0/DCIM/Camera', selectedPhoto.id);
                        setSelectedPhoto(null);
                    }}>
                        <Trash2 size={20} />
                        <span className="text-xs">Delete</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Info size={20} />
                        <span className="text-xs">Details</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-white flex flex-col">
            {/* Header */}
            <div className="h-16 px-4 flex items-center justify-between bg-white sticky top-0 z-10">
                <h1 className="text-xl font-medium text-gray-900">Photos</h1>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                    F
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-1">
                {photos.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 border-2 border-gray-300 rounded-lg"></div>
                        </div>
                        <p>No photos yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-1">
                        {photos.map(photo => (
                            <div
                                key={photo.id}
                                className="aspect-square bg-gray-200 cursor-pointer overflow-hidden relative"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <img src={photo.data} alt={photo.name} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryApp;
