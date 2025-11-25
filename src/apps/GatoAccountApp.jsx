import React, { useState } from 'react';
import { User, Shield, Cloud, LogOut, Loader } from 'lucide-react';
import { useOS } from '../context/OSContext';

const GatoAccountApp = () => {
    const { gatoAccount, loginGatoAccount, logoutGatoAccount, theme } = useOS();
    const [isLoginView, setIsLoginView] = useState(!gatoAccount);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            loginGatoAccount({ username, id: 'gato_' + Math.floor(Math.random() * 10000) });
            setIsLoading(false);
            setIsLoginView(false);
        }, 1500);
    };

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            logoutGatoAccount();
            setIsLoading(false);
            setIsLoginView(true);
            setUsername('');
            setPassword('');
        }, 1000);
    };

    if (isLoading) {
        return (
            <div className={`h-full flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <Loader className="animate-spin mb-4 text-blue-500" size={32} />
                <p className="text-sm font-medium">Connecting to Gato Cloud...</p>
            </div>
        );
    }

    if (isLoginView) {
        return (
            <div className={`h-full flex flex-col p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                        <User size={40} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Gato ID</h1>
                    <p className={`text-center mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Sign in to access Gato Cloud, Find My Device, and more.
                    </p>

                    <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                        <div>
                            <label className="block text-xs font-medium mb-1 ml-1 opacity-70">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl outline-none transition-all ${theme === 'dark' ? 'bg-gray-800 focus:bg-gray-700' : 'bg-white border border-gray-200 focus:border-blue-500'}`}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1 ml-1 opacity-70">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl outline-none transition-all ${theme === 'dark' ? 'bg-gray-800 focus:bg-gray-700' : 'bg-white border border-gray-200 focus:border-blue-500'}`}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 mt-4"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
                <p className="text-center text-xs opacity-50 mt-4">
                    By signing in, you agree to the Gato Ecosystem Terms of Service.
                </p>
            </div>
        );
    }

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <div className={`p-6 pb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-b-[2rem] shadow-sm`}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-inner">
                        {gatoAccount?.username?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{gatoAccount?.username}</h2>
                        <p className="text-sm opacity-60">Gato ID: {gatoAccount?.id}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl flex items-center gap-3 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                        <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
                            <Cloud size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs opacity-60">Cloud Storage</div>
                            <div className="text-sm font-bold">5GB Free</div>
                        </div>
                    </div>
                    <div className={`p-3 rounded-xl flex items-center gap-3 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                        <div className="p-2 bg-green-500/20 text-green-500 rounded-lg">
                            <Shield size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs opacity-60">Security</div>
                            <div className="text-sm font-bold">Protected</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 p-6 space-y-2">
                <h3 className="text-sm font-bold opacity-50 mb-2 uppercase tracking-wider">Account Settings</h3>

                <button className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-white hover:shadow-sm'}`}>
                    <span className="font-medium">Personal Information</span>
                </button>
                <button className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-white hover:shadow-sm'}`}>
                    <span className="font-medium">Sign-In & Security</span>
                </button>
                <button className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-white hover:shadow-sm'}`}>
                    <span className="font-medium">Payment & Subscriptions</span>
                </button>

                <div className="pt-8">
                    <button
                        onClick={handleLogout}
                        className="w-full p-4 rounded-xl flex items-center justify-center gap-2 text-red-500 font-medium hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GatoAccountApp;
