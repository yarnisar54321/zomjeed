"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoginPageClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
    // TODO: Implement actual authentication logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 pt-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:drop-shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-all duration-300">
            ZOMJEED
          </h1>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email or Username
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all duration-300"
                  placeholder="Enter your email or username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:shadow-[0_0_10px_rgba(251,146,60,0.3)] transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-md font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-all duration-300 transform hover:scale-[1.02] border-0 text-white"
              style={{
                background: "linear-gradient(to right, rgb(236, 72, 153), rgb(251, 146, 60))",
                backgroundImage: "linear-gradient(to right, rgb(236, 72, 153), rgb(251, 146, 60))",
              }}
            >
              Log In
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">or</span>
              </div>
            </div>

            <div className="space-y-3">
             <Button
  type="button"
  variant="outline"
  className="w-full h-12 border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600"
  onClick={() => {
    const clientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID
    const redirectUri = process.env.NEXT_PUBLIC_LINE_REDIRECT_URI
    const state = "random123"

    if (!clientId || !redirectUri) {
      console.error("LINE Login env not set")
      return
    }

    const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&scope=openid%20profile%20email`
    
    console.log("Redirecting to:", lineLoginUrl)
    window.location.href = lineLoginUrl
  }}
>
  Login with LINE
</Button>



              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2 border-green-400 text-green-500 hover:bg-green-50 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300 font-medium bg-transparent"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391-.855.496-1.05.739-3.468.033-.447.161-.888.372-1.277.155-.287.337-.543.535-.775.586-.686 1.337-1.118 2.171-1.118 1.714 0 3.096 1.235 3.096 2.756 0 .45-.313.81-.7.81-.387 0-.7-.36-.7-.81 0-.734-.896-1.33-2.006-1.33-.49 0-.944.15-1.297.404-.353.254-.56.606-.56.996 0 .585.295 1.095.742 1.354.447.26.742.775.742 1.365v.046c-.024 2.066.018 2.465.355 3.18C19.73 19.156 24 15.125 24 10.314" />
                </svg>
                Create account with LINE
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
