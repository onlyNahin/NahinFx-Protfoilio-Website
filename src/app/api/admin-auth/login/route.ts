import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE = process.env.ADMIN_SESSION_SECRET!;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPassword || !SESSION_VALUE) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  if (email === validEmail && password === validPassword) {
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // 7-day session
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
