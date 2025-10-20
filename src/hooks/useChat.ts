import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import { Message } from '@/lib/types';

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
      const response = await apiClient.post('/chat', {
        message: content,
        chatId,
        max_tokens: 512,
        temperature: 0.7,
        do_sample: true,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        tokens: response.data.tokens_generated,
        generationTime: response.data.generation_time,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [chatId]);

  const loadChat = useCallback(async (id: string) => {
    try {
      const response = await apiClient.get(`/chats/${id}`);
      setMessages(response.data.messages || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load chat');
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
