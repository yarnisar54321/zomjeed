import type { Metadata } from "next"
import LoginPageClient from "./login/LoginPageClient"

export const metadata: Metadata = {
  title: "ZOMJEED - Login",
  description: "Login to ZOMJEED with LINE Authentication",
}

export default function HomePage() {
  return <LoginPageClient />
}
