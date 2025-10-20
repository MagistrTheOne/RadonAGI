export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  generationTime?: number;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RadonAPIRequest {
  message: string;
  max_tokens?: number;
  temperature?: number;
  do_sample?: boolean;
}

export interface RadonAPIResponse {
  response: string;
  tokens_generated: number;
  generation_time: number;
  model_info: {
    model: string;
    device: string;
    dtype: string;
  };
}
