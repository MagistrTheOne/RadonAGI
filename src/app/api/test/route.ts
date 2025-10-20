import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('🧪 Test API called');
  return NextResponse.json({ 
    message: 'Test API working',
    timestamp: new Date().toISOString(),
    url: request.url 
  });
}

export async function POST(request: NextRequest) {
  console.log('🧪 Test API POST called');
  const body = await request.json();
  return NextResponse.json({ 
    message: 'Test API POST working',
    received: body,
    timestamp: new Date().toISOString()
  });
}
