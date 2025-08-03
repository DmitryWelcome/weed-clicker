import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET - получение всех сессий
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default_user';

    const sessions = await sql`
      SELECT * FROM sessions 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

// POST - создание новой сессии
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 'default_user', date, time, amount, type } = body;

    const result = await sql`
      INSERT INTO sessions (user_id, date, time, amount, type)
      VALUES (${userId}, ${date}, ${time}, ${amount}, ${type})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
