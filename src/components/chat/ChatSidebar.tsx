'use client';

import { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useChats } from '@/hooks/useChats';
import { useChatStore } from '@/store/chatStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MessageSquare, Trash2, LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatSidebar({ isOpen = true, onClose }: ChatSidebarProps) {
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
    <div className="w-56 glass border-r border-[#333333] flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-[#333333]">
        <Button
          onClick={handleNewChat}
          disabled={isCreating}
          className="w-full glass border-white/20 text-white hover:bg-white/10 hover:border-white/30 text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? 'Creating...' : 'New Chat'}
        </Button>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={cn(
                "group flex items-center justify-between p-2 rounded-md cursor-pointer transition-all",
                currentChatId === chat.id
                  ? "bg-white/10"
                  : "hover:bg-white/5"
              )}
            >
              <div className="flex items-center min-w-0 flex-1">
                <MessageSquare className="w-4 h-4 mr-2 text-[#a0a0a0] shrink-0" />
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

      {/* User Info Footer */}
      <div className="p-3 border-t border-[#333333]">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-1">
            <div className="w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center mr-2 shrink-0">
              <span className="text-white text-sm font-bold">
                {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-medium truncate">
                {user?.firstName || 'User'}
              </p>
              <p className="text-[#cccccc] text-xs truncate">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="p-1 h-6 w-6 text-[#cccccc] hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
