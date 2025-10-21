'use client';

import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Capabilities } from '@/components/landing/Capabilities';
import { DemoChat } from '@/components/landing/DemoChat';
import { CTA } from '@/components/landing/CTA';
import { About } from '@/components/landing/About';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <Hero />
      <Features />
      <Capabilities />
      <section id="demo" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Протестируйте возможности
            </h2>
            <p className="text-xl text-white/80">
              Попробуйте Radon AGI в действии
            </p>
          </div>
          <DemoChat />
        </div>
      </section>
      <CTA />
      <About />
      <Footer />
    </div>
  );
}