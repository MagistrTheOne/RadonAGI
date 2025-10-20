import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const WhitelistSchema = z.object({
  companyName: z.string().min(1, 'Название компании обязательно'),
  contactName: z.string().min(1, 'Контактное лицо обязательно'),
  email: z.string().email('Некорректный email'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валидация данных
    const validationResult = WhitelistSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Invalid data',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const { companyName, contactName, email, phone, message } = validationResult.data;

    // Отправляем email на maxonyushko71@gmail.com
    const emailData = {
      to: 'maxonyushko71@gmail.com',
      subject: `Новая заявка в White List - ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Новая заявка в White List Radon AGI
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Информация о компании:</h3>
            <p><strong>Название компании:</strong> ${companyName}</p>
            <p><strong>Контактное лицо:</strong> ${contactName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Телефон:</strong> ${phone}</p>` : ''}
          </div>

          ${message ? `
            <div style="background: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Сообщение:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          ` : ''}

          <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #155724;">
              <strong>Дата подачи заявки:</strong> ${new Date().toLocaleString('ru-RU')}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <p style="color: #6c757d; font-size: 14px;">
            Это автоматическое уведомление с сайта Radon AGI.<br>
            Свяжитесь с компанией в течение 24 часов для обсуждения возможностей сотрудничества.
          </p>
        </div>
      `,
      text: `
Новая заявка в White List Radon AGI

Информация о компании:
- Название компании: ${companyName}
- Контактное лицо: ${contactName}
- Email: ${email}
${phone ? `- Телефон: ${phone}` : ''}

${message ? `Сообщение:\n${message}\n` : ''}

Дата подачи заявки: ${new Date().toLocaleString('ru-RU')}

---
Это автоматическое уведомление с сайта Radon AGI.
Свяжитесь с компанией в течение 24 часов для обсуждения возможностей сотрудничества.
      `
    };

    // Здесь можно добавить реальную отправку email через сервис типа SendGrid, Nodemailer и т.д.
    // Пока что просто логируем в консоль
    console.log('=== WHITE LIST APPLICATION ===');
    console.log('Company:', companyName);
    console.log('Contact:', contactName);
    console.log('Email:', email);
    console.log('Phone:', phone || 'Not provided');
    console.log('Message:', message || 'No message');
    console.log('Date:', new Date().toISOString());
    console.log('==============================');

    // В реальном проекте здесь был бы код отправки email:
    // await sendEmail(emailData);

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена'
    });

  } catch (error: any) {
    console.error('Whitelist API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error?.message
    }, { status: 500 });
  }
}
