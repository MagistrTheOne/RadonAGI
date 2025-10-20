'use client';

import { Brain, Cpu, Zap, MessageSquare, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Продвинутое мышление",
    description: "Глубокий анализ с пошаговым рассуждением и логическими выводами"
  },
  {
    icon: Cpu,
    title: "31.72B параметров",
    description: "Мощная нейронная сеть с 31.72 миллиардами параметров для превосходного понимания"
  },
  {
    icon: Zap,
    title: "Мгновенные ответы",
    description: "Быстрая обработка запросов с высокой точностью и контекстным пониманием"
  },
  {
    icon: MessageSquare,
    title: "Контекстная память",
    description: "Запоминает историю диалога для более точных и релевантных ответов"
  },
  {
    icon: Globe,
    title: "Русскоязычный AI",
    description: "Специально обучен для работы с русским языком и культурным контекстом"
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Защищенная архитектура с соблюдением принципов этичного ИИ"
  }
];

export function Features() {
  return (
    <section id="features" className="py-32 lg:py-48 w-full relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Возможности Radon AGI
            </h2>
            <p className="text-xl md:text-2xl text-white/80 w-full max-w-4xl mx-auto leading-relaxed">
              Передовые технологии искусственного интеллекта для решения сложных задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-10 hover:bg-black/30 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-xl bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-6">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
