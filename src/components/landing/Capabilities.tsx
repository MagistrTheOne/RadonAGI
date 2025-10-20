'use client';

import { CheckCircle } from 'lucide-react';

const capabilities = [
  "Творческое письмо и редактирование",
  "Анализ данных и создание отчетов", 
  "Программирование и код-ревью",
  "Образовательная поддержка",
  "Бизнес-консультации",
  "Исследовательская работа"
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-32 lg:py-48 bg-black/10 w-full relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Области применения
            </h2>
            <p className="text-xl md:text-2xl text-white/80 w-full max-w-4xl mx-auto leading-relaxed">
              Radon AGI может помочь в различных сферах деятельности
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-center space-x-4 bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-black/30 transition-all duration-300">
                <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                <span className="text-white text-lg font-medium">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
