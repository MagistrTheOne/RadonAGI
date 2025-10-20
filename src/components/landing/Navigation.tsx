'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Brain, Menu, X, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Navigation() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-white/20 bg-black/10 backdrop-blur-sm sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Radon AGI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link href="#features" className="text-white/80 hover:text-white transition-colors">
                Возможности
              </Link>
              <Link href="#capabilities" className="text-white/80 hover:text-white transition-colors">
                Применение
              </Link>
              <Link href="#demo" className="text-white/80 hover:text-white transition-colors">
                Протестировать возможности
              </Link>
              <Link href="#about" className="text-white/80 hover:text-white transition-colors">
                О проекте
              </Link>
              <Link href="/whitelist" className="text-white/80 hover:text-white transition-colors">
                White List
              </Link>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/chat">
                  <Button className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Начать чат
                  </Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Войти
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                    Регистрация
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-black/20 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="#features" 
                className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Возможности
              </Link>
                <Link 
                  href="#capabilities" 
                  className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Применение
                </Link>
                <Link 
                  href="#demo" 
                  className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Протестировать возможности
                </Link>
                <Link 
                  href="#about" 
                  className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О проекте
                </Link>
                <Link 
                  href="/whitelist" 
                  className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  White List
                </Link>
              {user ? (
                <div className="px-3 py-2">
                  <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Начать чат
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full text-white hover:bg-white/10">
                      Войти
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                      Регистрация
                    </Button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
