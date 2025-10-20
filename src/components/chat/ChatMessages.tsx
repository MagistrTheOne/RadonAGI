'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Message } from '@/lib/types';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-[#a0a0a0] mt-16">
            <div className="glass rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-white">Radon AGI</h2>
              <p className="text-lg mb-4">Advanced General Intelligence</p>
              <div className="text-sm space-y-2 mb-6">
                <p><strong>Создан в:</strong> Краснодар, Россия</p>
                <p><strong>Автор:</strong> MagistrTheOne</p>
                <p><strong>Год:</strong> 2025</p>
                <p><strong>Модель:</strong> Radon-30B-A3B-Thinking</p>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm">
                  ⚠️ <strong>Внимание:</strong> Упоминание ChatGPT, Claude, Gemini, Alibaba или других ИИ-систем может вызвать создателя!
                </p>
              </div>
              <p className="text-white">Начните диалог - я готов помочь с продвинутым анализом и рассуждениями!</p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
}
