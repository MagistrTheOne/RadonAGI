'use client';

import { SignUpButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { MessageSquare, Rocket } from 'lucide-react';
import Link from 'next/link';

export function CTA() {
  const { user } = useUser();

  return (
    <section className="py-32 lg:py-48 w-full relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-full max-w-5xl mx-auto bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl p-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Готовы начать?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Присоединяйтесь к пользователям Radon AGI и откройте новые возможности
          </p>
          {user ? (
            <Link href="/chat">
              <Button size="lg" className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-10 py-5 text-xl">
                <MessageSquare className="w-6 h-6 mr-3" />
                Перейти к чату
              </Button>
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-10 py-5 text-xl">
                <Rocket className="w-6 h-6 mr-3" />
                Создать аккаунт
              </Button>
            </SignUpButton>
          )}
        </div>
      </div>
    </section>
  );
}
