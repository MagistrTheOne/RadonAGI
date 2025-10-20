'use client';

import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex mb-6",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-4",
        isUser
          ? "bg-white/8 border border-white/10"
          : "bg-white/3 border border-white/5"
      )}>
        <div className="text-white whitespace-pre-wrap">
          {message.content}
        </div>
        
        {/* Metadata */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
          <div className="text-xs text-[#a0a0a0]">
            {message.timestamp.toLocaleTimeString()}
          </div>
          {!isUser && (message.tokens || message.generationTime) && (
            <div className="text-xs text-[#a0a0a0] space-x-2">
              {message.tokens && (
                <span>{message.tokens} tokens</span>
              )}
              {message.generationTime && (
                <span>{message.generationTime.toFixed(2)}s</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
