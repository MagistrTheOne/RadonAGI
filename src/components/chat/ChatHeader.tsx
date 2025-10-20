'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface ChatHeaderProps {
  onMenuClick?: () => void;
}

export function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-[#333333] glass">
      <div className="max-w-3xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Button
            onClick={onMenuClick}
            variant="ghost"
            size="sm"
            className="md:hidden p-2 text-[#cccccc] hover:text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-white text-center">Radon AGI</h1>
        </div>
      </div>
    </div>
  );
}
