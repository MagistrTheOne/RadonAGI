'use client';

import { Brain } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/20 bg-black/10 backdrop-blur-sm w-full relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Radon AGI</span>
              </div>
              <p className="text-white/60 text-lg">
                Продвинутый ИИ для решения любых задач
              </p>
            </div>

            {/* Links */}
            <div className="text-center">
              <h3 className="text-white font-semibold mb-6 text-lg">Навигация</h3>
              <div className="space-y-3">
                <Link href="#features" className="block text-white/60 hover:text-white transition-colors text-lg">
                  Возможности
                </Link>
                <Link href="#capabilities" className="block text-white/60 hover:text-white transition-colors text-lg">
                  Применение
                </Link>
                <Link href="#demo" className="block text-white/60 hover:text-white transition-colors text-lg">
                  Протестировать возможности
                </Link>
                <Link href="#about" className="block text-white/60 hover:text-white transition-colors text-lg">
                  О проекте
                </Link>
                <Link href="/whitelist" className="block text-white/60 hover:text-white transition-colors text-lg">
                  White List
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-right">
              <h3 className="text-white font-semibold mb-6 text-lg">Контакты</h3>
              <div className="space-y-3">
                <a 
                  href="https://t.me/MagistrTheOne" 
                  className="block text-white/60 hover:text-white transition-colors text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram: @MagistrTheOne
                </a>
                <p className="text-white/60 text-lg">Krasnodar, 2025</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/60 text-lg">
              &copy; 2025 MagistrTheOne. Radon AGI создан в Краснодаре.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
