import { create } from 'zustand';

interface ChatStore {
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  currentChatId: null,
  setCurrentChatId: (id) => set({ currentChatId: id }),
}));
