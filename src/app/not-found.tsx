'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center bg-[#0f0f0f]">
      <div className="max-w-2xl mx-auto text-center px-4">

        <div className="relative z-10">
          {/* Radon Avatar */}
          <div className="mb-8">
            <div 
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg ring-4 ring-cyan-400/30"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2, #0e7490)' }}
            >
              <span className="text-white text-3xl font-bold">R</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="glass-accent rounded-2xl p-8 mb-8">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
            <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
              🤖 Radon не пал, но наблюдает...
            </h2>
            <p className="text-lg text-[#a0a0a0] mb-6">
              Страница, которую вы ищете, не существует в моей базе данных.
              <br />
              Возможно, она была удалена или перемещена.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button 
                variant="outline" 
                size="lg"
                className="glass-accent border-cyan-400/30 text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200"
              >
                <Home className="w-5 h-5 mr-2" />
                На главную
              </Button>
            </Link>
            <Link href="/chat">
              <Button 
                variant="outline" 
                size="lg"
                className="glass-accent border-cyan-400/30 text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Начать чат
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-12 text-[#666] text-sm">
            <p>© 2025 MagistrTheOne. Radon AGI Project</p>
          </div>
        </div>
      </div>
    </div>
  );
}
