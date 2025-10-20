import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { chats, messages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ChatRequestSchema } from '@/lib/validations';
import { SYSTEM_PROMPTS, DEFAULT_CHAT_CONFIG } from '@/config/prompts';
import { API_CONFIG } from '@/config/api';
import { generateId } from '@/lib/id-utils';

const RADON_API_URL = process.env.RADON_API_URL;

export async function POST(request: NextRequest) {
  try {
    console.log('Chat API called');
    console.log('RADON_API_URL:', RADON_API_URL);
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
      RADON_API_URL: RADON_API_URL ? 'Set' : 'Not set'
    });
    
    const authResult = await auth();
    console.log('Auth result:', authResult);
    
    const { userId } = authResult;
    
    if (!userId) {
      console.log('No userId found in auth result:', authResult);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.log('User authenticated:', userId);

    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully:', body);
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Validate request body
    const validationResult = ChatRequestSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return NextResponse.json({ 
        error: 'Invalid request data', 
        details: validationResult.error.issues 
      }, { status: 400 });
    }

    const { message, chatId, max_new_tokens, temperature, do_sample, top_p, top_k, system_prompt } = validationResult.data;
    const finalConfig = {
      max_new_tokens: max_new_tokens ?? DEFAULT_CHAT_CONFIG.max_new_tokens,
      temperature: temperature ?? DEFAULT_CHAT_CONFIG.temperature,
      do_sample: do_sample ?? DEFAULT_CHAT_CONFIG.do_sample,
      top_p: top_p ?? DEFAULT_CHAT_CONFIG.top_p,
      top_k: top_k ?? DEFAULT_CHAT_CONFIG.top_k,
    };

    console.log('Request body:', { message, chatId, ...finalConfig });

    if (!RADON_API_URL) {
      console.log('RADON_API_URL not configured');
      return NextResponse.json({ error: 'RADON_API_URL not configured' }, { status: 500 });
    }

    let currentChatId = chatId;

    // Create new chat if no chatId provided
    if (!currentChatId) {
      try {
        console.log('Attempting to create chat with:', { userId, title: message.slice(0, 50) });
        
        const chatTitle = message.slice(0, 50) + (message.length > 50 ? '...' : '');
        const newChatId = generateId();
        
        const [newChat] = await db.insert(chats).values({
          id: newChatId,
          userId,
          title: chatTitle,
        }).returning();
        
        currentChatId = newChat.id;
        console.log('Created new chat successfully with Drizzle:', currentChatId);
      } catch (dbError: any) {
        console.error('Error creating chat:', dbError);
        console.error('Error details:', {
          message: dbError?.message || 'Unknown error',
          stack: dbError?.stack || 'No stack trace',
          name: dbError?.name || 'Unknown error type'
        });
        return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 });
      }
    }

    // Use system prompt from request or default
    const systemPrompt = system_prompt || SYSTEM_PROMPTS.RADON_AGI;

    // Call Radon API with system prompt and Bearer Token
    console.log('Calling Radon API...');
    let radonResponse;
    try {
      // Get Bearer Token from environment or use default
      const bearerToken = process.env.RADON_BEARER_TOKEN || 'demo-token';
      
      radonResponse = await fetch(`${RADON_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          message,
          system_prompt: systemPrompt,
          max_new_tokens: finalConfig.max_new_tokens,
          temperature: finalConfig.temperature,
          do_sample: finalConfig.do_sample,
          top_p: finalConfig.top_p,
          top_k: finalConfig.top_k,
        }),
      });
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json({ error: 'Failed to connect to Radon API' }, { status: 500 });
    }

    if (!radonResponse.ok) {
      console.error('Radon API error:', radonResponse.status, radonResponse.statusText);
      const errorText = await radonResponse.text().catch(() => 'Unknown error');
      console.error('Radon API error response:', errorText);
      return NextResponse.json({ error: `Radon API error: ${radonResponse.status}` }, { status: 500 });
    }

    let radonData;
    try {
      radonData = await radonResponse.json();
      console.log('Radon API response received:', radonData);
    } catch (jsonError) {
      console.error('Error parsing Radon API response:', jsonError);
      return NextResponse.json({ error: 'Invalid response from Radon API' }, { status: 500 });
    }

    // Save user message to database
    try {
      await db.insert(messages).values({
        id: generateId(),
        chatId: currentChatId,
        role: 'user',
        content: message,
      });
      console.log('User message saved to database');
    } catch (dbError: any) {
      console.error('Error saving user message:', dbError);
    }

    // Save assistant response to database
    try {
      await db.insert(messages).values({
        id: generateId(),
        chatId: currentChatId,
        role: 'assistant',
        content: radonData.response,
        tokens: radonData.tokens_generated,
        generationTime: radonData.generation_time,
      });
      console.log('Assistant message saved to database');
    } catch (dbError: any) {
      console.error('Error saving assistant message:', dbError);
    }

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
