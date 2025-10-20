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
      "flex gap-4 p-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">R</span>
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%]",
        isUser && "order-first"
      )}>
        <div className="text-white whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">U</span>
        </div>
      )}
    </div>
  );
}
