// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// 로그인 필요 없는 경로들
const PUBLIC_PATHS = ["/login", "/register", "/_next", "/favicon.ico"];

export async function middleware(req: NextRequest) {
  console.log("1");
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  const path = req.nextUrl.pathname;

  const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p));

  if (!user && !isPublic) {
    // 로그인 안 되어 있고 보호된 페이지일 경우
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (user && path === "/login") {
    // 로그인된 사용자가 로그인 페이지 가려고 하면 홈으로 보내기
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// middleware.ts
export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|static|.*\\..*).*)",
    // "_next", "api", 정적 파일 등 제외
  ],
};
