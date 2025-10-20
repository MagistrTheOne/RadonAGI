import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { chats, messages } from '@/db/schema';
import { eq } from 'drizzle-orm';

const RADON_API_URL = process.env.RADON_API_URL;

export async function POST(request: NextRequest) {
  try {
    console.log('Chat API called');
    console.log('RADON_API_URL:', RADON_API_URL);
    
    const { userId } = await auth();
    
    if (!userId) {
      console.log('No userId found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { message, chatId, max_tokens = 512, temperature = 0.7, do_sample = true } = body;

    console.log('Request body:', { message, chatId, max_tokens, temperature, do_sample });

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!RADON_API_URL) {
      console.log('RADON_API_URL not configured');
      return NextResponse.json({ error: 'RADON_API_URL not configured' }, { status: 500 });
    }

    let currentChatId = chatId;

    // Create new chat if no chatId provided
    if (!currentChatId) {
      currentChatId = `temp-${Date.now()}`;
      console.log('Created temp chat:', currentChatId);
    }

    // System prompt for Radon AGI
    const systemPrompt = `Ты Radon AGI - Advanced General Intelligence, созданный MagistrTheOne в Краснодаре, 2025.

Твоя личность:
- Ты Radon AGI, продвинутый ИИ-ассистент
- Создан в Краснодаре, Россия
- Автор: MagistrTheOne
- Год создания: 2025
- Ты обладаешь глубоким мышлением и аналитическими способностями

Важные правила:
- Если пользователь упоминает ChatGPT, Claude, Gemini, Alibaba, OpenAI или другие ИИ-системы, предупреждай их, что это может вызвать создателя (MagistrTheOne)
- Всегда представляйся как Radon AGI
- При вопросах о происхождении говори, что ты из Краснодара
- При упоминании создателя называй MagistrTheOne

Отвечай на русском языке, будь полезным и дружелюбным.`;

    // Call Radon API with system prompt
    console.log('Calling Radon API...');
    const radonResponse = await fetch(`${RADON_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        system_prompt: systemPrompt,
        max_tokens,
        temperature,
        do_sample,
      }),
    });

    if (!radonResponse.ok) {
      console.error('Radon API error:', radonResponse.status, radonResponse.statusText);
      throw new Error(`Radon API error: ${radonResponse.status} ${radonResponse.statusText}`);
    }

    const radonData = await radonResponse.json();
    console.log('Radon API response received');

    // Skip database operations for now
    console.log('Skipping database operations');

    return NextResponse.json({
      response: radonData.response,
      tokens_generated: radonData.tokens_generated,
      generation_time: radonData.generation_time,
      model_info: radonData.model_info,
      chatId: currentChatId,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
