import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import { Chat } from '@/lib/types';

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/chats');
      setChats(response.data.chats || []);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch chats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createChat = useCallback(async (title?: string) => {
    try {
      const response = await apiClient.post('/chats', {
        title: title || 'New Chat',
      });
      const newChat = response.data.chat;
      setChats(prev => [newChat, ...prev]);
      return newChat;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create chat');
      throw err;
    }
  }, []);

  const deleteChat = useCallback(async (id: string) => {
    try {
      await apiClient.delete('/chats', { data: { chatId: id } });
      setChats(prev => prev.filter(chat => chat.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete chat');
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { 
    chats, 
    isLoading, 
    error, 
    createChat, 
    deleteChat, 
    refreshChats: fetchChats 
  };
}
