import React from 'react';
import { Menu, Search, Star, Edit, Mail as MailIcon } from 'lucide-react';
import { useOS } from '../context/OSContext';

const MailApp = () => {
    const { theme } = useOS();

    const emails = [
        { id: 1, sender: "Gato Team", subject: "Welcome to your new Gato Phone", preview: "Get started with your new device by setting up...", time: "10:00 AM", unread: true, color: "bg-orange-500" },
        { id: 2, sender: "Security Alert", subject: "New sign-in detected", preview: "We noticed a new sign-in to your Gato Account...", time: "Yesterday", unread: false, color: "bg-red-500" },
        { id: 3, sender: "Newsletter", subject: "Weekly Tech Digest", preview: "Top stories: The future of web-based operating systems...", time: "Mon", unread: false, color: "bg-blue-500" },
        { id: 4, sender: "Mom", subject: "Recipe", preview: "Here is the recipe you asked for! Love you.", time: "Sun", unread: false, color: "bg-purple-500" },
        { id: 5, sender: "Work", subject: "Meeting Reminder", preview: "Don't forget about the sync at 2 PM tomorrow.", time: "Fri", unread: false, color: "bg-green-500" },
    ];

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Search Bar */}
            <div className={`p-4 mx-4 mt-2 mb-2 rounded-full flex items-center gap-3 shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <Menu size={20} className="opacity-60" />
                <input
                    type="text"
                    placeholder="Search in mail"
                    className="flex-1 bg-transparent outline-none text-sm"
                />
                <div className="w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    F
                </div>
            </div>

            {/* Inbox Label */}
            <div className="px-4 py-2 text-xs font-bold opacity-50 uppercase tracking-wider">Inbox</div>

            {/* Email List */}
            <div className="flex-1 overflow-y-auto">
                {emails.map(email => (
                    <div key={email.id} className="flex gap-4 p-4 active:bg-gray-500/10 transition-colors cursor-pointer">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${email.color}`}>
                            {email.sender[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className={`text-sm ${email.unread ? 'font-bold' : 'font-medium'}`}>{email.sender}</span>
                                <span className={`text-xs ${email.unread ? 'font-bold text-blue-500' : 'opacity-60'}`}>{email.time}</span>
                            </div>
                            <div className={`text-xs mb-1 truncate ${email.unread ? 'font-bold' : ''}`}>{email.subject}</div>
                            <div className="text-xs opacity-60 truncate">{email.preview}</div>
                        </div>
                        <div className="flex flex-col items-center justify-start pt-1">
                            <Star size={16} className="opacity-20" />
                        </div>
                    </div>
                ))}
            </div>

            {/* FAB */}
            <button className={`absolute bottom-6 right-6 px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2 active:scale-95 transition-transform ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>
                <Edit size={20} />
                <span className="font-bold text-sm">Compose</span>
            </button>
        </div>
    );
};

export default MailApp;
