import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await fetch(
      "https://send-to-telegram.hamednourzaie1.workers.dev/",
      {
        method: "preflight",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json({ success: data.success });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
