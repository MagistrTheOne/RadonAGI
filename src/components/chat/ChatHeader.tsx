'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface ChatHeaderProps {
  onMenuClick?: () => void;
  sidebarCollapsed?: boolean;
}

export function ChatHeader({ onMenuClick, sidebarCollapsed = false }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-white/20 bg-black/10 backdrop-blur-sm">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Button
            onClick={onMenuClick}
            variant="ghost"
            size="sm"
            className="p-2 text-white/80 hover:text-white hover:bg-white/10"
            title={sidebarCollapsed ? "Показать сайдбар" : "Скрыть сайдбар"}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">R</span>
            </div>
            <h1 className="text-lg font-semibold text-white">Radon AGI</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
