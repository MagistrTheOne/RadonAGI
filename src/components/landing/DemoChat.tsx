'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Моковые ответы для демо
const mockResponses = [
  "Отлично! Я Radon AGI, готов помочь вам с любыми вопросами. Что вас интересует?",
  "Это интересный вопрос! Как ИИ нового поколения, я могу помочь с анализом данных, написанием текстов, решением задач и многим другим.",
  "Спасибо за вопрос! Я создан в Краснодаре и специализируюсь на работе с русским языком. Могу помочь с бизнес-задачами, творчеством, обучением.",
  "Рад помочь! Я использую передовые технологии машинного обучения и могу адаптироваться под ваши потребности.",
  "Отличный вопрос! Я могу работать с различными типами данных, анализировать информацию и предоставлять структурированные ответы.",
  "Спасибо за интерес к проекту! Radon AGI - это результат многолетней работы над созданием интеллектуальной системы нового поколения.",
  "Понял ваш запрос! Я готов помочь с решением сложных задач, анализом информации и генерацией контента.",
  "Интересно! Как ИИ, я могу помочь с планированием, анализом, творческими задачами и техническими вопросами."
];

export function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я Radon AGI. Задайте мне любой вопрос, и я помогу вам!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Имитация задержки API
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000); // Случайная задержка 1.5-2.5 секунды
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Radon AGI Demo</h3>
              <p className="text-white/60 text-sm">Протестируйте возможности ИИ (демо режим)</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-black/30 border border-white/20 text-white'
                    : 'bg-black/10 border border-white/10 text-white'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.role === 'assistant' && (
                    <Bot className="w-4 h-4 text-white/60 mt-1 shrink-0" />
                  )}
                  {message.role === 'user' && (
                    <User className="w-4 h-4 text-white/60 mt-1 shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {isClient && (
                      <p className="text-xs text-white/40 mt-2">
                        {message.timestamp.toLocaleTimeString('ru-RU')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-black/10 border border-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-white/60" />
                  <Loader2 className="w-4 h-4 text-white/60 animate-spin" />
                  <span className="text-white/60">Radon печатает...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/20">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите ваше сообщение..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none disabled:opacity-50"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="mt-2 text-xs text-white/40 text-center">
            Демо режим: ответы генерируются локально
          </div>
        </div>
      </div>
    </div>
  );
}