'use client';

import { memo } from 'react';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = memo(function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  // Hide <think> blocks for better UX
  const cleanContent = message.content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  return (
    <div className="w-full px-2 md:px-4 py-2 md:py-3 animate-in fade-in slide-in-from-bottom-2 duration-500 group">
      <div className={cn(
        "flex gap-3 items-start",
        isUser ? "justify-end" : "justify-start"
      )}>
        {!isUser && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-black/20 backdrop-blur-sm border border-white/20 transition-all duration-200 group-hover:scale-105">
            <span className="text-white text-sm font-semibold">R</span>
          </div>
        )}
        
        <div className={cn(
          "flex-1 max-w-none transition-all duration-200",
          isUser && "order-first"
        )}>
          <div className={cn(
            "whitespace-pre-wrap px-4 py-3 rounded-lg border transition-all duration-200 backdrop-blur-sm w-full group-hover:shadow-lg",
            isUser
              ? "bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
              : "bg-black/10 border-white/10 text-white hover:bg-black/20 hover:border-white/20"
          )}>
            {cleanContent}
          </div>
          <div className="text-xs text-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-black/30 backdrop-blur-sm border border-white/20 transition-all duration-200 group-hover:scale-105">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
        )}
      </div>
    </div>
  );
});
