'use client';

export function About() {
  return (
    <section id="about" className="py-32 lg:py-48 bg-black/10 w-full relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12">
              О проекте
            </h2>
            <div className="w-full max-w-5xl mx-auto">
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Radon AGI — это передовой искусственный интеллект, созданный в Краснодаре в 2025 году. 
                Проект разработан с фокусом на русскоязычную аудиторию и решает широкий спектр задач 
                от творческого письма до сложного анализа данных.
              </p>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Модель с 31.72 миллиардами параметров обеспечивает глубокое понимание контекста 
                и высокое качество ответов на русском языке.
              </p>
              <p className="text-xl text-white/80">
                <strong className="text-white">SOLO разработка</strong> от MagistrTheOne — полный цикл от идеи до реализации.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
