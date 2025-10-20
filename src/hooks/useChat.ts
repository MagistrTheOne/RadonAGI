import { useCallback, useMemo } from 'react';
import { Message } from '@/lib/types';
import { useChatStore } from '@/store/chatStore';
import { generateMessageId } from '@/lib/id-utils';
import { API_CONFIG, DEFAULT_CHAT_PARAMS } from '@/config/api';

export function useChat(chatId?: string) {
  const { 
    messages, 
    isLoading, 
    error, 
    addMessage, 
    setMessages, 
    setIsLoading, 
    setError 
  } = useChatStore();

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setIsLoading(true);
    setError(null);

    try {
      console.log('Sending message:', { content, chatId, ...DEFAULT_CHAT_PARAMS });
      
      const response = await fetch(API_CONFIG.ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          chatId,
          ...DEFAULT_CHAT_PARAMS,
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', response.status, errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      const assistantMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        tokens: data.tokens_generated,
        generationTime: data.generation_time,
      };

      addMessage(assistantMessage);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [chatId, addMessage, setIsLoading, setError]);

  const loadChat = useCallback(async (id: string) => {
    try {
      console.log('Loading chat:', id);
      const response = await fetch(API_CONFIG.ENDPOINTS.CHAT_BY_ID(id));
      console.log('Load chat response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Load chat API Error:', response.status, errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Load chat data:', data);
      setMessages(data.messages || []);
    } catch (err: any) {
      console.error('Load chat error:', err);
      setError(err.message || 'Failed to load chat');
    }
  }, [setMessages, setError]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

      return useMemo(() => ({ 
        messages, 
        isLoading, 
        error, 
        sendMessage, 
        loadChat, 
        clearError 
      }), [messages, isLoading, error, sendMessage, loadChat, clearError]);
}
