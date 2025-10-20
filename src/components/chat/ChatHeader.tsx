'use client';

import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

export function ChatHeader() {
  const { user } = useUser();

  return (
    <div className="p-4 border-b border-[#2a2a2a] glass">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Radon AGI</h1>
          <p className="text-sm text-[#a0a0a0]">Advanced General Intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#a0a0a0]">
            {user?.firstName || user?.emailAddresses[0]?.emailAddress}
          </span>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
