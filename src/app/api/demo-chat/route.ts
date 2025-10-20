import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { API_CONFIG } from '@/config/api';

const DemoChatSchema = z.object({
  message: z.string().min(1, 'Message is required').max(4000, 'Message too long'),
  max_tokens: z.number().int().min(1).max(2048).optional(),
  temperature: z.number().min(0).max(2).optional(),
  do_sample: z.boolean().optional(),
});

const RADON_API_URL = process.env.RADON_API_URL;

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Demo Chat API called');
    console.log('🔗 RADON_API_URL:', RADON_API_URL);
    console.log('📅 Timestamp:', new Date().toISOString());

    let body;
    try {
      body = await request.json();
      console.log('Request body:', body);
    } catch (jsonError) {
      console.error('Invalid JSON in request:', jsonError);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const validationResult = DemoChatSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error.issues);
      return NextResponse.json({
        error: 'Invalid request data',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const { message, max_tokens = 512, temperature = 0.7, do_sample = true } = validationResult.data;

    if (!RADON_API_URL) {
      console.error('RADON_API_URL not configured');
      return NextResponse.json({ error: 'RADON_API_URL not configured' }, { status: 500 });
    }

    const systemPrompt = `Ты Radon AGI - Advanced General Intelligence, созданный MagistrTheOne в Краснодаре, 2025.

Ты - передовой искусственный интеллект с 31.72 миллиардами параметров, специально обученный для работы на русском языке. Твоя задача - помогать пользователям решать различные задачи, от простых вопросов до сложного анализа данных.

Особенности:
- Отвечай на русском языке
- Будь полезным и дружелюбным
- Предоставляй точную и релевантную информацию
- Если не знаешь ответа, честно скажи об этом
- Помогай с анализом, программированием, творческим письмом и другими задачами

Отвечай на русском языке, будь полезным и дружелюбным.`;

    let radonResponse;
    try {
      console.log('Calling Radon API:', `${RADON_API_URL}${API_CONFIG.RADON_API.DEMO_CHAT}`);
      console.log('Radon API request body:', { message, system_prompt: systemPrompt, max_tokens, temperature, do_sample });
      
      radonResponse = await fetch(`${RADON_API_URL}${API_CONFIG.RADON_API.DEMO_CHAT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          system_prompt: systemPrompt, 
          max_tokens, 
          temperature, 
          do_sample 
        }),
      });
      console.log('Radon API response status:', radonResponse.status);
    } catch (fetchError: any) {
      console.error('Failed to connect to Radon API:', fetchError);
      return NextResponse.json({ 
        error: 'Failed to connect to Radon API', 
        details: fetchError?.message 
      }, { status: 500 });
    }

    if (!radonResponse.ok) {
      const errorData = await radonResponse.json().catch(() => ({}));
      console.error('Radon API returned error:', radonResponse.status, errorData);
      return NextResponse.json({
        error: errorData.error || 'Radon API error',
        details: errorData.detail || `HTTP error! status: ${radonResponse.status}`
      }, { status: 500 });
    }

    const radonData = await radonResponse.json();
    console.log('✅ Radon API response data:', radonData);
    console.log('📝 Response content:', radonData.response);
    console.log('🔢 Tokens generated:', radonData.tokens_generated);

    const finalResponse = {
      response: radonData.response,
      tokens_generated: radonData.tokens_generated,
      generation_time: radonData.generation_time,
      model_info: radonData.model_info,
    };
    
    console.log('📤 Sending final response:', finalResponse);
    return NextResponse.json(finalResponse);

  } catch (error: any) {
    console.error('Internal server error in demo chat API:', error);
    console.error('Error details:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace',
      name: error?.name || 'Unknown error type'
    });
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error?.message 
    }, { status: 500 });
  }
}
