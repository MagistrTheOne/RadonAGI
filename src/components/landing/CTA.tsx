'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, Rocket } from 'lucide-react';
import Link from 'next/link';

export function CTA() {
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
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#demo">
              <Button size="lg" className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-10 py-5 text-xl min-h-[56px] w-full sm:w-auto">
                <MessageSquare className="w-6 h-6 mr-3" />
                Протестировать демо
              </Button>
            </Link>
            <Link href="/invest">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-5 text-xl min-h-[56px] w-full sm:w-auto">
                <Rocket className="w-6 h-6 mr-3" />
                Инвестировать в проект
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}