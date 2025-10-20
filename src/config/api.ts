export const API_CONFIG = {
  ENDPOINTS: {
    CHAT: '/api/chat',
    CHATS: '/api/chats',
    CHAT_BY_ID: (id: string) => `/api/chats/${id}`,
  },
  RADON_API: {
    CHAT: '/api/chat',
    DEMO_CHAT: '/api/demo-chat',
    WHITELIST: '/api/whitelist',
  },
} as const;

export const DEFAULT_CHAT_PARAMS = {
  max_new_tokens: 500,
  temperature: 0.7,
  do_sample: true,
  top_p: 0.9,
  top_k: 50,
} as const;
