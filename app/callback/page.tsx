"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CallbackPage() {
  const params = useSearchParams()
  const code = params.get("code")
  const state = params.get("state")
  const [message, setMessage] = useState("Processing LINE Login...")
  const router = useRouter()

  useEffect(() => {
    if (code) {
      fetch(`/api/line/callback?code=${code}&state=${state}`)
        .then(res => res.json())
        .then(data => {
          console.log("LINE Profile:", data)
          setMessage(`Welcome ${data.displayName}`)
          router.push("/history") // redirect ไปหน้า history
        })
        .catch(err => {
          console.error(err)
          setMessage("Login failed")
        })
    }
  }, [code, state, router])

  fetch(`/api/line/callback?code=${code}&state=${state}`)
  .then(res => res.json())
  .then(data => {
    console.log("LINE Profile:", data)
  })


  return <div>{message}</div>
}

