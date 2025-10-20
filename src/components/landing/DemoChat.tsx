'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

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

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('🚀 Sending demo chat request to:', '/api/demo-chat');
      console.log('📝 Message:', input.trim());
      
      // Отправляем запрос на демо API (без авторизации)
      const response = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          max_new_tokens: 500,
          temperature: 0.7,
          do_sample: true,
          top_p: 0.9,
          top_k: 50,
        }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Извините, произошла ошибка при обработке запроса.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Demo chat error:', error);
      
      // Fallback ответ при ошибке
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Извините, в данный момент сервис недоступен. Попробуйте позже или зарегистрируйтесь для полного доступа.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="demo" className="py-32 lg:py-48 w-full relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Протестируйте возможности Radon AGI
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Задайте любой вопрос и получите ответ от нашего ИИ. Никакой регистрации не требуется!
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
            {/* Chat Header */}
            <div className="border-b border-white/20 bg-black/30 backdrop-blur-sm p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Radon AGI</h3>
                  <p className="text-white/60 text-sm">Протестируйте прямо сейчас</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`px-4 py-3 rounded-xl border backdrop-blur-sm ${
                        message.role === 'user'
                          ? 'bg-black/30 border-white/20 text-white'
                          : 'bg-black/20 border-white/10 text-white'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-white/40 mt-1">
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-black/20 border border-white/10 text-white px-4 py-3 rounded-xl backdrop-blur-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/20 bg-black/30 backdrop-blur-sm p-6">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Задайте вопрос Radon AGI..."
                    disabled={isLoading}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 rounded-xl px-4 py-3 focus:border-white/40 focus:ring-1 focus:ring-white/20 focus:outline-none transition-all duration-200"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="text-white/50 text-sm mt-3 text-center">
                Это демо-версия. Для полного доступа зарегистрируйтесь
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
