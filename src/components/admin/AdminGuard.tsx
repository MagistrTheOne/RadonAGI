'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID || 'user_34Kw4u2OBwyZNx3BZqnIL04HMKD';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      // Пользователь не авторизован - перенаправляем на главную
      router.push('/');
    }
  }, [isLoaded, user, router]);

  // Показываем загрузку пока проверяем авторизацию
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-white/60 animate-pulse" />
          <p className="text-white/80">Проверка доступа...</p>
        </div>
      </div>
    );
  }

  // Пользователь не авторизован
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 max-w-md">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <CardTitle className="text-white">Доступ запрещен</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-white/80">
              Для доступа к админ панели необходимо авторизоваться
            </p>
            <Link href="/">
              <Button className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Проверяем права администратора
  if (user.id !== ADMIN_USER_ID) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <CardTitle className="text-white">Недостаточно прав</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-white/80">
              У вас нет прав для доступа к админ панели
            </p>
            <p className="text-sm text-white/60">
              ID пользователя: {user.id}
            </p>
            <Link href="/">
              <Button className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Пользователь авторизован и имеет права администратора
  return <>{children}</>;
}
