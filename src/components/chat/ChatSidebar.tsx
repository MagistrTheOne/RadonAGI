'use client';

import { useState } from 'react';
import { useUser, useClerk, UserButton } from '@clerk/nextjs';
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
  const { 
    chats, 
    currentChatId, 
    createChat, 
    deleteChat, 
    setCurrentChatId 
  } = useChats();
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
    <div className={cn(
      "bg-black/10 backdrop-blur-sm border-r border-white/20 flex flex-col h-full transition-all duration-300",
      "md:w-56 md:relative",
      isOpen ? "fixed inset-y-0 left-0 w-80 z-50" : "hidden md:flex"
    )}>
      {/* Header */}
      <div className="p-3 border-b border-white/20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">Чаты</h2>
          {onClose && (
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="md:hidden p-1 h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <Button
          onClick={handleNewChat}
          disabled={isCreating}
          className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? 'Создание...' : 'Новый чат'}
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
                "group flex items-center justify-between p-2 rounded-md cursor-pointer transition-all border",
                currentChatId === chat.id
                  ? "bg-black/30 border-white/20"
                  : "hover:bg-black/20 border-transparent"
              )}
            >
              <div className="flex items-center min-w-0 flex-1">
                <MessageSquare className="w-4 h-4 mr-2 text-white/80 shrink-0" />
                <span className="text-white text-sm truncate">
                  {chat.title}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDeleteChat(chat.id, e)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Info Footer */}
      <div className="p-3 border-t border-white/20">
        <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0 flex-1">
              <div className="mr-3 shrink-0">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-lg border border-white/20",
                      userButtonPopoverCard: "bg-black/20 backdrop-blur-sm border-white/20",
                      userButtonPopoverActionButton: "text-white hover:bg-white/10",
                      userButtonPopoverFooter: "hidden"
                    }
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium truncate">
                  {user?.firstName || 'Пользователь'}
                </p>
                <p className="text-white/60 text-xs truncate">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
