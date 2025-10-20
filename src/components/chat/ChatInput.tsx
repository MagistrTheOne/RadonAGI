'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="border-t border-[#2a2a2a]">
      {/* Radon AGI Info Panel */}
      <div className="px-6 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-sm text-[#a0a0a0]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Radon AGI Online</span>
              </span>
              <span>•</span>
              <span>Краснодар, Россия</span>
              <span>•</span>
              <span>MagistrTheOne, 2025</span>
            </div>
            <div className="text-xs">
              ⚠️ Упоминание других ИИ может вызвать создателя машин.
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Radon AGI..."
                disabled={isLoading}
                className="w-full glass border-[#2a2a2a] text-white placeholder:text-[#a0a0a0] rounded-lg px-4 py-3 pr-12 resize-none focus:border-white/30 focus:outline-none transition-colors min-h-[52px] max-h-[120px]"
                rows={1}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="glass border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
