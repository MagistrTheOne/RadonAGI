'use client';

import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sparkles, ArrowRight, Rocket } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { number: "31.72B", label: "Параметров модели" },
  { number: "99.9%", label: "Время работы" },
  { number: "24/7", label: "Доступность" },
  { number: "RU", label: "Русский язык" }
];

export function Hero() {
  const { user } = useUser();

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

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            {user ? (
              <Link href="/chat">
                <Button size="lg" className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg group">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Начать диалог
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg group">
                    <Rocket className="w-5 h-5 mr-2" />
                    Начать бесплатно
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                    Уже есть аккаунт?
                  </Button>
                </SignInButton>
              </>
            )}
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
