'use client';

export function TypingIndicator() {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0">
        <span className="text-white text-sm font-bold">R</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <span className="text-[#a0a0a0] text-sm">Radon is thinking...</span>
      </div>
    </div>
  );
}
