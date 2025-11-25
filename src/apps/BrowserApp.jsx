import React, { useState } from 'react';
import { Search, ArrowLeft, ArrowRight, RotateCw, X } from 'lucide-react';

const BrowserApp = () => {
    const [url, setUrl] = useState('https://google.com');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Basic URL validation/formatting could go here
        setTimeout(() => setIsLoading(false), 1000); // Simulate load time for UX
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Browser Toolbar */}
            <div className="h-14 bg-gray-100 border-b border-gray-200 flex items-center px-2 gap-2">
                <div className="flex items-center gap-1 text-gray-500">
                    <button className="p-2 hover:bg-gray-200 rounded-lg"><ArrowLeft size={18} /></button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg"><ArrowRight size={18} /></button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={14} />
                    </div>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full h-9 pl-9 pr-8 bg-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {isLoading ? <RotateCw size={14} className="animate-spin" /> : <X size={14} onClick={() => setUrl('')} />}
                    </div>
                </form>
            </div>

            {/* Browser Content (Simulated) */}
            <div className="flex-1 bg-white relative overflow-hidden">
                {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-100">
                        <div className="h-full bg-blue-500 animate-progress"></div>
                    </div>
                )}

                <iframe
                    src={url.startsWith('http') ? url : `https://${url}`}
                    title="Browser"
                    className="w-full h-full border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    onError={() => alert("Failed to load site. Some sites block embedding.")}
                />

                {/* Overlay to prevent interaction if needed, or just let it be */}
            </div>
        </div>
    );
};

export default BrowserApp;
