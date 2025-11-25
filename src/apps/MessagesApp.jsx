import React, { useState, useEffect, useRef } from 'react';
import { Search, Edit, ArrowLeft, Send, User } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { useSystemSound } from '../hooks/useSystemSound';

const MessagesApp = () => {
    const { theme } = useOS();
    const { playType, playNotification } = useSystemSound();
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef(null);

    // Initial dummy data
    const initialChats = [
        { id: 1, name: 'Team Gato', lastMessage: 'Welcome to Gato OS!', time: '10:00 AM', unread: true, messages: [{ id: 1, text: 'Welcome to Gato OS! Hope you enjoy the experience.', sender: 'them' }] },
        { id: 2, name: 'Mom', lastMessage: 'Call me when you can', time: 'Yesterday', unread: false, messages: [{ id: 1, text: 'Call me when you can', sender: 'them' }] },
        { id: 3, name: 'Mark', lastMessage: 'See you later!', time: 'Mon', unread: false, messages: [{ id: 1, text: 'See you later!', sender: 'them' }] },
    ];

    // Load from localStorage or use initial
    const [chats, setChats] = useState(() => {
        const saved = localStorage.getItem('gato_messages');
        return saved ? JSON.parse(saved) : initialChats;
    });

    // Persist chats
    useEffect(() => {
        localStorage.setItem('gato_messages', JSON.stringify(chats));
    }, [chats]);

    // Scroll to bottom
    useEffect(() => {
        if (selectedChat) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChat, chats]);

    const handleSend = () => {
        if (!messageInput.trim()) return;

        playType(); // Sound effect

        const newMessage = { id: Date.now(), text: messageInput, sender: 'me' };
        const updatedChats = chats.map(chat => {
            if (chat.id === selectedChat.id) {
                return {
                    ...chat,
                    lastMessage: messageInput,
                    time: 'Now',
                    messages: [...chat.messages, newMessage]
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setSelectedChat(updatedChats.find(c => c.id === selectedChat.id));
        setMessageInput('');

        // Auto-reply Bot Logic
        setTimeout(() => {
            const replyText = getAutoReply(messageInput);
            const replyMessage = { id: Date.now() + 1, text: replyText, sender: 'them' };

            const botUpdatedChats = updatedChats.map(chat => {
                if (chat.id === selectedChat.id) {
                    return {
                        ...chat,
                        lastMessage: replyText,
                        time: 'Now',
                        messages: [...chat.messages, newMessage, replyMessage],
                        unread: true
                    };
                }
                return chat;
            });

            setChats(botUpdatedChats);
            // If still looking at this chat, update view and play sound
            if (selectedChat.id === selectedChat.id) {
                setSelectedChat(botUpdatedChats.find(c => c.id === selectedChat.id));
                playNotification();
            }
        }, 2000);
    };

    const getAutoReply = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('hello') || lower.includes('hi')) return "Hey there! How's it going?";
        if (lower.includes('gato')) return "Gato OS is the best, right?";
        if (lower.includes('time')) return `It's currently ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
        return "That's interesting! Tell me more.";
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
                    <div ref={messagesEndRef} />
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
