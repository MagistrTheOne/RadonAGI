'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Возможности', href: '#features' },
    { name: 'Применение', href: '#capabilities' },
    { name: 'О проекте', href: '#about' },
    { name: 'Инвестиции', href: '/invest' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">R</span>
            </div>
            <span className="text-white font-bold text-lg">Radon AGI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Theme & Demo */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="#demo">
              <Button className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                Демо
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-black/20 hover:bg-black/30 border border-white/20 text-white"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-sm rounded-lg mt-2 border border-white/20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/20">
                <div className="px-3 py-2">
                  <ThemeToggle />
                </div>
                <Link 
                  href="#demo" 
                  className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Демо
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}