import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 })
  }

  try {
    // แลก token
    const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URI!,
        client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID!,
        client_secret: process.env.LINE_CHANNEL_SECRET!,
      }).toString(),
    })

    const tokenData = await tokenRes.json()

    // ดึง profile
    const userRes = await fetch("https://api.line.me/v2/profile", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
    const profile = await userRes.json()

    return NextResponse.json(profile)
  } catch (err) {
    console.error("LINE login error:", err)
    return NextResponse.json({ error: "LINE Login failed" }, { status: 500 })
  }
}
