import React, { useState } from 'react';
import { MOCK_ROOMS, MOCK_CHAT_MESSAGES } from '../constants';
import { DiscussionRoom, ChatMessage, User } from '../types';
import { UsersIcon, ChevronRightIcon, PaperAirplaneIcon, PlusCircleIcon, ArrowUpCircleIcon } from './Icons';

const RoomListItem: React.FC<{ room: DiscussionRoom; onClick: () => void; isActive: boolean }> = ({ room, onClick, isActive }) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full text-left p-4 rounded-lg flex items-center space-x-4 transition-all duration-200 ${
                isActive ? 'bg-cyan-500/20' : 'hover:bg-navy-700/50'
            }`}
        >
            <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500' : 'bg-navy-700'}`}>
                <room.icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-slate-light">{room.name}</h3>
                <p className="text-sm text-slate-dark truncate">{room.description}</p>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-slate-dark" />
        </button>
    );
};

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isOwn = message.isOwn;
    return (
        <div className={`flex items-start gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
            <img src={message.user.avatarUrl} alt={message.user.name} className="h-8 w-8 rounded-full" />
            <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${isOwn ? 'bg-violet-500 text-white rounded-br-none' : 'bg-navy-700 text-slate-light rounded-bl-none'}`}>
                <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{message.user.name}</p>
                    <p className="text-xs opacity-70">{message.timestamp}</p>
                </div>
                <p className="text-sm">{message.text}</p>
            </div>
             <button className="text-slate-dark hover:text-cyan-400 transition-colors">
                <ArrowUpCircleIcon className="h-5 w-5"/>
            </button>
        </div>
    );
};

interface DiscussionRoomsProps {
    user: User;
}

export const DiscussionRooms: React.FC<DiscussionRoomsProps> = ({ user }) => {
    const [selectedRoom, setSelectedRoom] = useState<DiscussionRoom | null>(MOCK_ROOMS[0]);

    // Make the second message always from the current user for demonstration
    const personalizedMessages = MOCK_CHAT_MESSAGES.map(msg => 
        msg.id === 2 ? { ...msg, user: { name: user.name, avatarUrl: user.avatarUrl }, isOwn: true } : { ...msg, isOwn: false }
    );

    return (
        <div className="animate-fade-in">
            <h1 className="font-display text-4xl font-bold text-gray-800 dark:text-slate-light mb-2">Discussion Rooms</h1>
            <p className="text-lg text-gray-600 dark:text-slate-dark mb-8">Connect, collaborate, and learn with the community.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[70vh]">
                <div className="lg:col-span-1 bg-white dark:bg-navy-800 rounded-lg shadow-lg p-4 space-y-2">
                    {MOCK_ROOMS.map(room => (
                        <RoomListItem 
                            key={room.id} 
                            room={room} 
                            onClick={() => setSelectedRoom(room)} 
                            isActive={selectedRoom?.id === room.id}
                        />
                    ))}
                </div>
                
                <div className="lg:col-span-2 bg-white dark:bg-navy-800 rounded-lg shadow-lg flex flex-col">
                    {selectedRoom ? (
                        <>
                            <div className="p-4 border-b border-navy-700">
                                <h2 className="font-display text-2xl font-bold text-slate-light">{selectedRoom.name}</h2>
                                <div className="flex items-center text-sm text-slate-dark space-x-2">
                                    <UsersIcon className="h-4 w-4" />
                                    <span>{selectedRoom.members.toLocaleString()} Members Online</span>
                                </div>
                            </div>
                            <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                                {personalizedMessages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
                            </div>
                            <div className="p-4 border-t border-navy-700 mt-auto">
                                <div className="flex items-center space-x-2 bg-navy-900 rounded-lg p-2">
                                    <button className="p-2 text-slate-dark hover:text-cyan-400">
                                        <PlusCircleIcon className="h-6 w-6" />
                                    </button>
                                    <input 
                                        type="text" 
                                        placeholder={`Message in #${selectedRoom.name}...`}
                                        className="flex-1 bg-transparent text-slate-light placeholder-slate-dark focus:outline-none"
                                    />
                                    <button className="p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 transition-colors">
                                        <PaperAirplaneIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-dark">
                            <p>Select a room to start discussing.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};