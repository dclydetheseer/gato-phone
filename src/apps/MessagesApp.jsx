import React, { useState } from 'react';
import { Search, Edit, ArrowLeft, Send, User } from 'lucide-react';
import { useOS } from '../context/OSContext';

const MessagesApp = () => {
    const { theme } = useOS();
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    const [chats, setChats] = useState([
        { id: 1, name: 'Team Gato', lastMessage: 'Welcome to Gato OS!', time: '10:00 AM', unread: true, messages: [{ id: 1, text: 'Welcome to Gato OS! Hope you enjoy the experience.', sender: 'them' }] },
        { id: 2, name: 'Mom', lastMessage: 'Call me when you can', time: 'Yesterday', unread: false, messages: [{ id: 1, text: 'Call me when you can', sender: 'them' }] },
        { id: 3, name: 'Mark', lastMessage: 'See you later!', time: 'Mon', unread: false, messages: [{ id: 1, text: 'See you later!', sender: 'them' }] },
    ]);

    const handleSend = () => {
        if (!messageInput.trim()) return;

        const updatedChats = chats.map(chat => {
            if (chat.id === selectedChat.id) {
                return {
                    ...chat,
                    lastMessage: messageInput,
                    time: 'Now',
                    messages: [...chat.messages, { id: Date.now(), text: messageInput, sender: 'me' }]
                };
            }
            return chat;
        });

        setChats(updatedChats);
        // Update selected chat reference to show new message immediately
        setSelectedChat(updatedChats.find(c => c.id === selectedChat.id));
        setMessageInput('');
    };

    if (selectedChat) {
        return (
            <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                {/* Chat Header */}
                <div className={`p-4 flex items-center gap-3 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                    <button onClick={() => setSelectedChat(null)} className="p-1 -ml-2">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {selectedChat.name[0]}
                    </div>
                    <span className="font-bold">{selectedChat.name}</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedChat.messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg.sender === 'me'
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : `${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-bl-none`
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'} flex items-center gap-2`}>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Text message"
                        className={`flex-1 px-4 py-2 rounded-full outline-none text-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className={`p-2 rounded-full bg-blue-500 text-white ${!messageInput.trim() && 'opacity-50'}`}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="w-full relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={16} />
                    <input
                        type="text"
                        placeholder="Search messages"
                        className={`w-full pl-10 pr-4 py-2 rounded-full outline-none text-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                    />
                </div>
                <div className="w-8 h-8 ml-4 rounded-full overflow-hidden bg-gray-200">
                    {/* Profile placeholder */}
                    <User className="w-full h-full p-1 text-gray-500" />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                <h2 className="px-4 py-2 text-xs font-bold opacity-50 uppercase tracking-wider">Messages</h2>
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`px-4 py-3 flex items-center gap-3 active:bg-gray-500/10 cursor-pointer`}
                    >
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {chat.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className={`font-bold text-sm ${chat.unread ? '' : 'opacity-90'}`}>{chat.name}</span>
                                <span className={`text-xs ${chat.unread ? 'text-blue-500 font-bold' : 'opacity-50'}`}>{chat.time}</span>
                            </div>
                            <p className={`text-xs truncate ${chat.unread ? 'font-bold text-gray-900 dark:text-white' : 'opacity-60'}`}>
                                {chat.lastMessage}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* FAB */}
            <button className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center text-white active:scale-95 transition-transform">
                <Edit size={24} />
            </button>
        </div>
    );
};

export default MessagesApp;
