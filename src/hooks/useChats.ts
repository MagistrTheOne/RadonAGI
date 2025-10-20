import { useEffect, useCallback } from 'react';
import { API_CONFIG } from '@/config/api';
import { useChatsStore } from '@/store/chatsStore';

export function useChats() {
  const { 
    chats, 
    currentChatId, 
    isLoading, 
    error,
    setChats,
    addChat,
    updateChat,
    removeChat,
    setCurrentChatId,
    setIsLoading,
    setError,
    clearError
  } = useChatsStore();

  const fetchChats = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Fetching chats from:', API_CONFIG.ENDPOINTS.CHATS);
      
      const response = await fetch(API_CONFIG.ENDPOINTS.CHATS);
      console.log('Fetch chats response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Fetch chats API Error:', response.status, errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetch chats data:', data);
      setChats(data.chats || []);
      clearError();
    } catch (err: any) {
      console.error('Fetch chats error:', err);
      setError(err.message || 'Failed to fetch chats');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setChats, setError, clearError]);

  const createChat = useCallback(async (title?: string) => {
    try {
      const requestBody = { title: title || 'New Chat' };
      console.log('Creating chat with:', requestBody);
      
      const response = await fetch(API_CONFIG.ENDPOINTS.CHATS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Create chat response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Create chat API Error:', response.status, errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Create chat data:', data);
      const newChat = data.chat;
      addChat(newChat);
      return newChat;
    } catch (err: any) {
      console.error('Create chat error:', err);
      setError(err.message || 'Failed to create chat');
      throw err;
    }
  }, [addChat, setError]);

  const deleteChat = useCallback(async (id: string) => {
    try {
      const requestBody = { chatId: id };
      console.log('Deleting chat:', requestBody);
      
      const response = await fetch(API_CONFIG.ENDPOINTS.CHATS, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Delete chat response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Delete chat API Error:', response.status, errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      removeChat(id);
    } catch (err: any) {
      console.error('Delete chat error:', err);
      setError(err.message || 'Failed to delete chat');
    }
  }, [removeChat, setError]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { 
    chats, 
    currentChatId,
    isLoading, 
    error, 
    createChat, 
    deleteChat, 
    refreshChats: fetchChats,
    setCurrentChatId,
    clearError
  };
}
