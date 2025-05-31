import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://send-to-telegram.hamednourzaie1.workers.dev/",
      {
        method: "POST", // تغییر به POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Worker error:", { status: response.status, data });
      return NextResponse.json(
        { success: false, error: data.error },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: data.success });
  } catch (error) {
    console.error("API Route error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
