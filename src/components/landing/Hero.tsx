'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, ArrowRight, Rocket, Users, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const stats = [
  { number: "31.72B", label: "Параметров модели" },
  { number: "99.9%", label: "Время работы" },
  { number: "24/7", label: "Доступность" },
  { number: "RU", label: "Русский язык" }
];

export function Hero() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhitelistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/whitelist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, company })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setName('');
        setCompany('');
      }
    } catch (error) {
      console.error('Whitelist submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden w-full z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-32 lg:py-48">
        <div className="text-center">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight">
              Radon AGI
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-12 w-full leading-relaxed max-w-5xl mx-auto">
              Продвинутый искусственный интеллект нового поколения. 
              Создан в Краснодаре для решения любых задач.
            </p>
          </div>

          {/* Whitelist Form */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Получить ранний доступ
              </h2>
              <p className="text-white/80 mb-8">
                Оставьте заявку для получения доступа к Radon AGI в числе первых
              </p>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Заявка отправлена!
                  </h3>
                  <p className="text-white/80">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWhitelistSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Компания (необязательно)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white py-4 text-lg min-h-[56px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                        Отправка...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Users className="w-5 h-5 mr-2" />
                        Подать заявку
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Demo Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link href="#demo">
              <Button size="lg" className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg group min-h-[56px] w-full sm:w-auto">
                <MessageSquare className="w-5 h-5 mr-2" />
                Протестировать возможности
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}