// app/api/send-to-telegram/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  const TELEGRAM_BOT_TOKEN = "8194844221:AAG_5NV9rnuGuU4taD9UCWJUaWCgqc_nSRo"; // نذار پابلیک بمونه
  const TELEGRAM_CHAT_ID = "-1002299835664"; // آیدی عددی گروه (با -100 شروع میشه)

  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const text = `📩 درخواست جدید:\n\n👤 نام: ${name}\n📧 ایمیل: ${email}\n📝 موضوع: ${subject}\n💬 پیام:\n${message}`;

  try {
    const telegramRes = await fetch(TELEGRAM_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    const data = await telegramRes.json();

    if (!telegramRes.ok || !data.ok) {
      console.error("Telegram Error Response:", data);
      return NextResponse.json(
        { error: "Telegram API error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "درخواست به تلگرام ارسال شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Telegram Server Error:", error);
    return NextResponse.json(
      { error: "خطا در ارسال به تلگرام" },
      { status: 500 }
    );
  }
}
