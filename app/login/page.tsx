import type { Metadata } from "next"
import LoginPageClient from "./login-client"

export const metadata: Metadata = {
  title: "ZOMJEED - Login",
  description: "Login to your ZOMJEED account",
}

export default function LoginPage() {
  return <LoginPageClient />
}
