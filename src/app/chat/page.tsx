'use client';

import { useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useChatStore } from '@/store/chatStore';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function ChatPage() {
  const { currentChatId } = useChatStore();
  const { messages, isLoading, error, sendMessage, loadChat } = useChat(currentChatId || undefined);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load chat messages when currentChatId changes
  useEffect(() => {
    if (currentChatId) {
      loadChat(currentChatId);
    }
  }, [currentChatId, loadChat]);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <ChatSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <ChatHeader onMenuClick={() => setSidebarOpen(true)} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        {error && (
          <div className="mx-6 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}
