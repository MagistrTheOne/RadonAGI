'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Mail, Building, User, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WhitelistPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ companyName: '', contactName: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">
              Заявка отправлена!
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Спасибо за интерес к Radon AGI! Мы свяжемся с вами в ближайшее время для обсуждения возможностей сотрудничества.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-8 py-3">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  На главную
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Попробовать чат
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Navigation */}
      <nav className="border-b border-white/20 bg-black/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Radon AGI</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              White List
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Присоединяйтесь к эксклюзивному списку компаний, которые первыми получат доступ к Radon AGI
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    <Building className="w-5 h-5 inline mr-2" />
                    Название компании *
                  </label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                    placeholder="Введите название вашей компании"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">
                    <User className="w-5 h-5 inline mr-2" />
                    Контактное лицо *
                  </label>
                  <Input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                    placeholder="Ваше имя и должность"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    <Mail className="w-5 h-5 inline mr-2" />
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                    placeholder="your@company.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">
                    <MessageSquare className="w-5 h-5 inline mr-2" />
                    Телефон
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  <MessageSquare className="w-5 h-5 inline mr-2" />
                  Сообщение
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40 resize-none"
                  placeholder="Расскажите о ваших потребностях в ИИ, размере компании, ожиданиях от Radon AGI..."
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white px-12 py-4 text-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mr-3" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-3" />
                      Подать заявку
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center text-white/60 text-sm">
                <p>
                  Отправляя заявку, вы соглашаетесь на обработку персональных данных.
                  <br />
                  Мы свяжемся с вами в течение 24 часов.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
