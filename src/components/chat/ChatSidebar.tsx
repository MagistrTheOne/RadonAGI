'use client';

import { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useChats } from '@/hooks/useChats';
import { useChatStore } from '@/store/chatStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MessageSquare, Trash2, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatSidebar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { chats, createChat, deleteChat } = useChats();
  const { currentChatId, setCurrentChatId } = useChatStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleNewChat = async () => {
    try {
      setIsCreating(true);
      const newChat = await createChat();
      setCurrentChatId(newChat.id);
    } catch (error) {
      console.error('Failed to create chat:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteChat(chatId);
      if (currentChatId === chatId) {
        setCurrentChatId(null);
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  return (
    <div className="w-80 glass border-r border-[#2a2a2a] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <h1 className="text-xl font-bold text-white mb-4">Radon AGI</h1>
        <Button
          onClick={handleNewChat}
          disabled={isCreating}
          variant="outline"
          className="w-full glass border-white/20 text-white hover:bg-white/10 hover:border-white/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? 'Creating...' : 'New Chat'}
        </Button>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={cn(
                "group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                currentChatId === chat.id
                  ? "bg-white/10 border border-white/20"
                  : "hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center min-w-0 flex-1">
                <MessageSquare className="w-4 h-4 mr-3 text-[#a0a0a0] shrink-0" />
                <span className="text-white text-sm truncate">
                  {chat.title}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDeleteChat(chat.id, e)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 text-[#a0a0a0] hover:text-white hover:bg-white/10"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-1">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 shrink-0">
              <span className="text-white text-sm font-medium">
                {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm truncate">
                {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="p-1 h-6 w-6 text-[#a0a0a0] hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
