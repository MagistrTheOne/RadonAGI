'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import { useChat } from '@/hooks/useChat';
import { useChats } from '@/hooks/useChats';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';

// Lazy load components
const ChatSidebar = lazy(() => import('@/components/chat/ChatSidebar').then(m => ({ default: m.ChatSidebar })));
const ChatHeader = lazy(() => import('@/components/chat/ChatHeader').then(m => ({ default: m.ChatHeader })));
const ChatMessages = lazy(() => import('@/components/chat/ChatMessages').then(m => ({ default: m.ChatMessages })));
const ChatInput = lazy(() => import('@/components/chat/ChatInput').then(m => ({ default: m.ChatInput })));

export default function ChatPage() {
  const { currentChatId } = useChats();
  const { messages, isLoading, error, sendMessage, loadChat } = useChat(currentChatId || undefined);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load chat messages when currentChatId changes
  useEffect(() => {
    if (currentChatId) {
      loadChat(currentChatId);
    } else {
      // If no chatId, keep current messages (they're persisted in Zustand)
      console.log('No chatId, keeping current messages from store');
    }
  }, [currentChatId, loadChat]);

  return (
        <div className="flex h-screen text-white bg-[#0f0f0f]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
          {/* Sidebar */}
          <Suspense fallback={<div className="w-56 bg-black/10 backdrop-blur-sm border-r border-white/20 animate-pulse" />}>
            <ChatSidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
            />
          </Suspense>
          
          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0">
            <Suspense fallback={<div className="p-4 border-b border-white/20 bg-black/10 backdrop-blur-sm animate-pulse" />}>
              <ChatHeader onMenuClick={() => setSidebarOpen(true)} />
            </Suspense>
            <Suspense fallback={<div className="flex-1 bg-black/10 backdrop-blur-sm animate-pulse" />}>
              <ChatMessages messages={messages} isLoading={isLoading} />
            </Suspense>
            {error && (
              <div className="mx-6 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <Suspense fallback={<div className="border-t border-white/20 bg-black/10 backdrop-blur-sm animate-pulse h-20" />}>
              <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
            </Suspense>
          </main>
    </div>
  );
}
