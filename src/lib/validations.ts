import { z } from 'zod';

// Chat API validation schemas
export const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Message is required').max(4000, 'Message too long'),
  chatId: z.string().uuid().optional(),
  max_tokens: z.number().int().min(1).max(2048).optional(),
  temperature: z.number().min(0).max(2).optional(),
  do_sample: z.boolean().optional(),
});

export const ChatResponseSchema = z.object({
  response: z.string(),
  tokens_generated: z.number().int().positive(),
  generation_time: z.number().positive(),
  model_info: z.object({
    model: z.string(),
    device: z.string(),
    dtype: z.string(),
  }),
  chatId: z.string().uuid(),
});

// Chats API validation schemas
export const CreateChatSchema = z.object({
  title: z.string().max(100).optional(),
});

export const DeleteChatSchema = z.object({
  chatId: z.string().uuid('Invalid chat ID'),
});

// Message validation
export const MessageSchema = z.object({
  id: z.string().min(1),
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1),
  timestamp: z.date(),
  tokens: z.number().int().positive().optional(),
  generationTime: z.number().positive().optional(),
});

// Chat validation
export const ChatSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  title: z.string().min(1).max(100),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
export type CreateChatRequest = z.infer<typeof CreateChatSchema>;
export type DeleteChatRequest = z.infer<typeof DeleteChatSchema>;
export type ValidatedMessage = z.infer<typeof MessageSchema>;
export type ValidatedChat = z.infer<typeof ChatSchema>;
