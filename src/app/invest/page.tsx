'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';
import Link from 'next/link';

const investmentTiers = [
  {
    name: "Seed Round",
    amount: "$500K ",
    description: "Начальное финансирование для MVP и команды",
    benefits: [
      "Доля в компании 2%",
      "Участие в стратегических решениях",
      "Приоритетный доступ к продукту",
      "Ежемесячные отчеты"
    ],
    minAmount: 50000,
    maxAmount: 200000
  },
  {
    name: "Series A",
    amount: "$500K - $2M",
    description: "Масштабирование и развитие продукта",
    benefits: [
      "Доля в компании 10-25%",
      "Место в совете директоров",
      "Эксклюзивные функции",
      "Еженедельные отчеты"
    ],
    minAmount: 500000,
    maxAmount: 2000000
  },
  {
    name: "Strategic Partner",
    amount: "$1M+",
    description: "Стратегическое партнерство",
    benefits: [
      "Доля в компании 20-40%",
      "Совместное развитие технологий",
      "Эксклюзивные права на регион",
      "Ежедневные отчеты"
    ],
    minAmount: 1000000,
    maxAmount: 10000000
  }
];

const milestones = [
  {
    quarter: "Q1 2026",
    goals: ["Запуск MVP", "Первые 100 пользователей", "Базовая функциональность"]
  },
  {
    quarter: "Q2 2026", 
    goals: ["1000+ пользователей", "Мобильное приложение", "API для разработчиков"]
  },
  {
    quarter: "Q3 2026",
    goals: ["10K+ пользователей", "Корпоративные клиенты", "Международная экспансия"]
  },
  {
    quarter: "Q4 2026",
    goals: ["100K+ пользователей", "IPO подготовка", "Глобальное присутствие"]
  }
];

const team = [
  {
    name: "MagistrTheOne",
    role: "Founder & CEO",
    description: "Эксперт в области ИИ и машинного обучения",
    experience: "10+ лет в технологиях"
  },

];

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-32 lg:py-48">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Инвестиции в Radon AGI
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Присоединяйтесь к революции искусственного интеллекта. 
              Инвестируйте в будущее технологий.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg">
                <DollarSign className="w-5 h-5 mr-2" />
                Инвестировать сейчас
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Возможности инвестирования
            </h2>
            <p className="text-xl text-white/80">
              Выберите подходящий уровень участия в проекте
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentTiers.map((tier, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-sm border border-white/20 p-8 hover:bg-black/30 transition-all duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-white mb-2">{tier.amount}</div>
                  <p className="text-white/80">{tier.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-white/80">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                  Выбрать план
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Дорожная карта развития
            </h2>
            <p className="text-xl text-white/80">
              Планы развития проекта на 2025 год
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-sm border border-white/20 p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{milestone.quarter}</h3>
                </div>
                
                <ul className="space-y-2">
                  {milestone.goals.map((goal, goalIndex) => (
                    <li key={goalIndex} className="text-white/80 text-sm flex items-start">
                      <Target className="w-4 h-4 text-blue-400 mr-2 mt-0.5 shrink-0" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Команда проекта
            </h2>
            <p className="text-xl text-white/80">
              Опытные специалисты в области ИИ и технологий
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-sm border border-white/20 p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-black/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-white/80 mb-2">{member.role}</p>
                  <p className="text-white/60 mb-4">{member.description}</p>
                  <div className="flex items-center justify-center text-white/60">
                    <Star className="w-4 h-4 mr-1" />
                    {member.experience}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-black/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Готовы инвестировать?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Свяжитесь с нами для обсуждения условий инвестирования
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center">
              <Mail className="w-6 h-6 text-white mr-3" />
              <span className="text-white">maxonyushko71@gmail.com</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="w-6 h-6 text-white mr-3" />
              <span className="text-white">+7 (XXX) XXX-XX-XX</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white mr-3" />
              <span className="text-white">Краснодар, Россия</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg">
              <Mail className="w-5 h-5 mr-2" />
              Написать нам
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                <ArrowRight className="w-5 h-5 mr-2" />
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
