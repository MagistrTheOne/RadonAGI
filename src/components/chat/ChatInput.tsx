'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { success, error } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      success('Сообщение отправлено', 'Ваше сообщение передано Radon AGI');
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

  // Autofocus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="border-t border-white/20 bg-black/10 backdrop-blur-sm animate-in slide-in-from-bottom duration-300">
      <div className="w-full p-2 md:p-4">
        <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
          <div className="flex-1 relative group">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите ваше сообщение..."
              disabled={isLoading}
              className="w-full bg-black/20 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 rounded-lg px-4 py-3 resize-none focus:border-white/40 focus:ring-1 focus:ring-white/20 focus:outline-none transition-all duration-200 min-h-[48px] max-h-[120px] group-hover:border-white/30 group-hover:bg-black/30"
              rows={1}
            />
            <div className="absolute bottom-2 right-2 text-xs text-white/60 pointer-events-none transition-opacity duration-200">
              {input.length > 0 && (
                <span className="bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                  {input.length}
                </span>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-h-[40px] md:min-h-[48px] hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
