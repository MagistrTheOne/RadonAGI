'use client';

import { memo } from 'react';

export const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="flex gap-4 p-4 animate-in fade-in duration-300">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-black/20 backdrop-blur-sm border border-white/20 animate-pulse">
        <span className="text-white text-sm font-semibold">R</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span className="text-white/80 text-sm font-medium animate-pulse">Radon печатает...</span>
      </div>
    </div>
  );
});
