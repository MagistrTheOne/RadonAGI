'use client';

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">
      <div className="bg-white/3 border border-white/5 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-[#a0a0a0] text-sm">Radon is thinking...</span>
        </div>
      </div>
    </div>
  );
}
