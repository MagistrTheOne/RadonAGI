'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Страница не найдена</h1>
          <p className="text-white/80 text-lg">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
              <Home className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
          
          <Button 
            onClick={() => window.history.back()}
            variant="ghost"
            className="w-full text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-white/60">
          <p>Если проблема повторяется, обратитесь в поддержку</p>
        </div>
      </div>
    </div>
  );
}