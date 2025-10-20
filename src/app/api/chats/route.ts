import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { chats } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { CreateChatSchema, DeleteChatSchema } from '@/lib/validations';
import { generateId } from '@/lib/id-utils';

export async function GET() {
  try {
    console.log('GET /api/chats called');
    
    const { userId } = await auth();
    console.log('Auth userId:', userId);
    
    if (!userId) {
      console.log('No userId found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Fetching chats for userId:', userId);
    
    // Try direct query first
    try {
      const userChats = await db.select().from(chats).where(eq(chats.userId, userId));
      console.log('Found chats (direct query):', userChats.length);
      return NextResponse.json({ chats: userChats });
    } catch (queryError) {
      console.error('Direct query failed, trying relational query:', queryError);
      
      // Fallback to relational query
      const userChats = await db.query.chats.findMany({
        where: eq(chats.userId, userId),
        orderBy: (chats, { desc }) => [desc(chats.updatedAt)],
      });
      console.log('Found chats (relational query):', userChats.length);
      return NextResponse.json({ chats: userChats });
    }

  } catch (error: any) {
    console.error('Get chats error:', error);
    console.error('Error details:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace',
      name: error?.name || 'Unknown error type'
    });
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/chats called');
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    const { userId } = await auth();
    console.log('Auth userId:', userId);
    
    if (!userId) {
      console.log('No userId found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Request body:', body);
    console.log('Body type:', typeof body);
    console.log('Body keys:', Object.keys(body));
    
    // Validate request body
    const validationResult = CreateChatSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error.issues);
      return NextResponse.json({ 
        error: 'Invalid request data', 
        details: validationResult.error.issues 
      }, { status: 400 });
    }

    const { title = 'New Chat' } = validationResult.data;
    console.log('Creating chat with title:', title);

    const chatData = {
      userId,
      title,
    };
    console.log('Chat data to insert:', chatData);

    const [newChat] = await db.insert(chats).values(chatData).returning();
    console.log('Created chat:', newChat);
    
    return NextResponse.json({ chat: newChat });

  } catch (error: any) {
    console.error('Create chat error:', error);
    console.error('Error details:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace',
      name: error?.name || 'Unknown error type'
    });
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate request body
    const validationResult = DeleteChatSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: 'Invalid request data', 
        details: validationResult.error.issues 
      }, { status: 400 });
    }

    const { chatId } = validationResult.data;

    // Verify ownership
    const chat = await db.query.chats.findFirst({
      where: eq(chats.id, chatId),
    });

    if (!chat || chat.userId !== userId) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    // Delete chat (messages will be deleted by cascade)
    await db.delete(chats).where(eq(chats.id, chatId));

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
