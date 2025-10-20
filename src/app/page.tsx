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
      <DemoChat />
      <CTA />
      <About />
      <Footer />
    </div>
  );
}