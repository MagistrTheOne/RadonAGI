import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chat } from '@/lib/types';

interface ChatsStore {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  updateChat: (id: string, updates: Partial<Chat>) => void;
  removeChat: (id: string) => void;
  setCurrentChatId: (id: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useChatsStore = create<ChatsStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      isLoading: false,
      error: null,
      
      setChats: (chats) => set({ chats }),
      
      addChat: (chat) => set((state) => ({ 
        chats: [chat, ...state.chats] 
      })),
      
      updateChat: (id, updates) => set((state) => ({
        chats: state.chats.map(chat => 
          chat.id === id ? { ...chat, ...updates } : chat
        )
      })),
      
      removeChat: (id) => set((state) => ({
        chats: state.chats.filter(chat => chat.id !== id),
        currentChatId: state.currentChatId === id ? null : state.currentChatId
      })),
      
      setCurrentChatId: (id) => set({ currentChatId: id }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'chats-storage',
      partialize: (state) => ({ 
        chats: state.chats,
        currentChatId: state.currentChatId
      }),
    }
  )
);
