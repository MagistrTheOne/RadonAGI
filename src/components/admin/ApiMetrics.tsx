'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trash2, Activity, Database, Zap } from 'lucide-react';

interface ApiMetrics {
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  average_response_time: number;
  cache_hits: number;
  cache_misses: number;
  active_clients: number;
  gpu_memory_usage: number;
}

interface CacheStats {
  size: number;
  max_size: number;
  hit_rate: number;
  ttl_minutes: number;
}

export function ApiMetrics() {
  const [metrics, setMetrics] = useState<ApiMetrics | null>(null);
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const [metricsRes, cacheRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_RADON_API_URL || 'http://213.219.215.235'}/metrics`),
        fetch(`${process.env.NEXT_PUBLIC_RADON_API_URL || 'http://213.219.215.235'}/cache/stats`)
      ]);

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      }

      if (cacheRes.ok) {
        const cacheData = await cacheRes.json();
        setCacheStats(cacheData);
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RADON_API_URL || 'http://213.219.215.235'}/cache/clear`,
        { method: 'DELETE' }
      );
      
      if (response.ok) {
        await fetchMetrics(); // Refresh stats
      }
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (!metrics && !cacheStats) {
    return (
      <div className="text-center p-8">
        <Activity className="w-12 h-12 mx-auto mb-4 text-white/60" />
        <p className="text-white/80">Загрузка метрик...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">API Метрики v5.0.0</h2>
        <div className="flex gap-2">
          <Button
            onClick={fetchMetrics}
            disabled={loading}
            variant="outline"
            size="sm"
            className="bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
          <Button
            onClick={clearCache}
            variant="outline"
            size="sm"
            className="bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Очистить кэш
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Requests */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Всего запросов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics?.total_requests || 0}</div>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Успешность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {metrics ? Math.round((metrics.successful_requests / metrics.total_requests) * 100) : 0}%
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80 flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Время ответа
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metrics ? `${metrics.average_response_time.toFixed(2)}s` : '0s'}
            </div>
          </CardContent>
        </Card>

        {/* Active Clients */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Активные клиенты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{metrics?.active_clients || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Cache Stats */}
      {cacheStats && (
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Статистика кэша
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-white/60">Размер кэша</p>
                <p className="text-lg font-semibold text-white">
                  {cacheStats.size}/{cacheStats.max_size}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">Hit Rate</p>
                <p className="text-lg font-semibold text-green-400">
                  {Math.round(cacheStats.hit_rate * 100)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">TTL</p>
                <p className="text-lg font-semibold text-white">
                  {cacheStats.ttl_minutes} мин
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">GPU память</p>
                <p className="text-lg font-semibold text-orange-400">
                  {metrics?.gpu_memory_usage.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
