// app/api/course/route.ts
import crypto from "crypto";
import { createClient } from "@/app/api/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { to, from, text } = body;

  if (!to || !from || !text) {
    return NextResponse.json(
      { error: "to, from, text 필드를 모두 입력해야 합니다." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data: user, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "유효하지 않은 인증 토큰입니다." },
      { status: 401 }
    );
  }

  const apiKey = process.env.COOLSMS_API_KEY;
  const apiSecret = process.env.COOLSMS_API_SECRET;

  const date = new Date().toISOString();
  const salt = crypto.randomBytes(16).toString("hex");

  const bodyData = JSON.stringify({
    message: { to, from, text },
  });

  if (!apiSecret) {
    return NextResponse.json(
      { error: "API KEY가 존재하지 않습니다." },
      { status: 400 }
    );
  }

  const hmacData = `${date}${salt}`;
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(hmacData)
    .digest("hex");

  const authorizationHeader = `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;

  try {
    const response = await fetch("https://api.coolsms.co.kr/messages/v4/send", {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
      body: bodyData,
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return NextResponse.json({
        message: data.errorMessage || "Failed to send message",
      });
    }
    return NextResponse.json({ message: "전송 성공" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `메시지 전송 실패: ${error}` },
      { status: 500 }
    );
  }
}
