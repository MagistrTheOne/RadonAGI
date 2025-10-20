export const API_CONFIG = {
  ENDPOINTS: {
    CHAT: '/api/chat',
    CHATS: '/api/chats',
    CHAT_BY_ID: (id: string) => `/api/chats/${id}`,
  },
  RADON_API: {
    CHAT: '/api/chat',
    DEMO_CHAT: '/api/demo-chat',
  },
} as const;

export const DEFAULT_CHAT_PARAMS = {
  max_tokens: 3000,
  temperature: 0.7,
  do_sample: true,
} as const;
