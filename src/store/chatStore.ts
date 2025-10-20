import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '@/lib/types';

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  // Message actions
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
  
  // Loading and error states
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,
      
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      
      setMessages: (messages) => set({ messages }),
      
      updateMessage: (id, updates) => set((state) => ({
        messages: state.messages.map(message => 
          message.id === id ? { ...message, ...updates } : message
        )
      })),
      
      removeMessage: (id) => set((state) => ({
        messages: state.messages.filter(message => message.id !== id)
      })),
      
      clearMessages: () => set({ messages: [], error: null }),
      
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ 
        messages: state.messages 
      }),
    }
  )
);
