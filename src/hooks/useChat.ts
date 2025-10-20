import { useState, useCallback } from 'react';
import { Message } from '@/lib/types';
import { apiClient } from '@/lib/api-client';

export function useChat(chatId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          chatId,
          max_tokens: 512,
          temperature: 0.7,
          do_sample: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        tokens: data.tokens_generated,
        generationTime: data.generation_time,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [chatId]);

  const loadChat = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/chats/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data || []);
    } catch (err: any) {
      console.error('Load chat error:', err);
      setError(err.message || 'Failed to load chat');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    loadChat, 
    clearError 
  };
}
