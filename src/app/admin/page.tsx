'use client';

import { ApiMetrics } from '@/components/admin/ApiMetrics';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Link>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <h1 className="text-2xl font-bold">Админ панель</h1>
            </div>
          </div>
        </div>

        {/* API Status Card */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Статус API v5.0.0
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">Активен</div>
                <div className="text-sm text-white/60">API сервер</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">Radon-35B-Ultra-X-RU</div>
                <div className="text-sm text-white/60">Модель загружена</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">Rate Limited</div>
                <div className="text-sm text-white/60">10 req/min</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Metrics */}
        <ApiMetrics />

        {/* Features List */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 mt-6">
          <CardHeader>
            <CardTitle className="text-white">Новые возможности v5.0.0</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">🔧 Исправления</h4>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Улучшенная обработка JSON ошибок</li>
                  <li>• Валидация Content-Type</li>
                  <li>• Детальные сообщения об ошибках</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">🚀 Новые фичи</h4>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Rate Limiting (10 req/min)</li>
                  <li>• Response Caching (TTL 5 мин)</li>
                  <li>• Подробная статистика</li>
                  <li>• GPU мониторинг</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </AdminGuard>
  );
}
