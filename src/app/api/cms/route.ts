import { NextResponse } from 'next/server';
import { getCmsData, saveCmsData, CmsData } from '@/lib/db';

export async function GET() {
  const data = await getCmsData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentData = await getCmsData();

    // Merge or update whole data structure
    const updatedData: CmsData = {
      ...currentData,
      ...body,
    };

    await saveCmsData(updatedData);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("API POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to update CMS data" }, { status: 500 });
  }
}
