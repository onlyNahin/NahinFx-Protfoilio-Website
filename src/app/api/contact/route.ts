import { NextResponse } from 'next/server';
import { getCmsData, saveCmsData } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const data = await getCmsData();
    const newMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'No Subject',
      message,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      read: false,
    };

    data.messages = [newMessage, ...(data.messages || [])];
    await saveCmsData(data);

    return NextResponse.json({ success: true, message: 'Message received!' });
  } catch (err) {
    console.error('Contact POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
