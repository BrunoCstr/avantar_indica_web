import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  try {
    // Verifica se o token é válido
    await adminAuth.verifyIdToken(idToken);

    // Gera um cookie de sessão (ex.: 5 dias)
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const res = NextResponse.json({ ok: true });

    // Seta o cookie já verificado
    res.cookies.set("authToken", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return res;

  } catch (err) {
    console.error("ID token inválido:", err);
    return NextResponse.json({ error: "credenciais inválidas" }, { status: 401 });
  }
}
