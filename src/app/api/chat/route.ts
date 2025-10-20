import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { chats, messages } from '@/db/schema';
import { eq } from 'drizzle-orm';

const RADON_API_URL = process.env.RADON_API_URL;

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { message, chatId, max_tokens = 512, temperature = 0.7, do_sample = true } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!RADON_API_URL) {
      return NextResponse.json({ error: 'RADON_API_URL not configured' }, { status: 500 });
    }

    let currentChatId = chatId;

    // Create new chat if no chatId provided
    if (!currentChatId) {
      const [newChat] = await db.insert(chats).values({
        userId,
        title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
      }).returning();
      currentChatId = newChat.id;
    }

    // Save user message
    await db.insert(messages).values({
      chatId: currentChatId,
      role: 'user',
      content: message,
    });

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
      throw new Error('Failed to get response from Radon API');
    }

    const radonData = await radonResponse.json();

    // Save assistant message
    await db.insert(messages).values({
      chatId: currentChatId,
      role: 'assistant',
      content: radonData.response,
      tokens: radonData.tokens_generated,
      generationTime: radonData.generation_time,
    });

    // Update chat timestamp
    await db.update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, currentChatId));

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
