"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// Create a singleton supabase client for the browser
const createBrowserClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export default function WaitlistCounter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    const supabase = createBrowserClient()

    // Subscribe to changes in the waitlist table
    const channel = supabase
      .channel("waitlist-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "waitlist" }, () => {
        // Increment the counter when a new record is inserted
        setCount((prevCount) => prevCount + 1)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="text-sm text-gray-600 font-medium animate-pulse">
      <span className="font-bold">{count}</span> people have joined the waitlist
    </div>
  )
}
