"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Debug environment variables
console.log("DEBUG: NEXT_PUBLIC_SUPABASE_URL =", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("DEBUG: SUPABASE_SERVICE_ROLE_KEY =", process.env.SUPABASE_SERVICE_ROLE_KEY)

// Create a single supabase client for the server
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function addToWaitlist(email: string) {
  try {
    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Please enter a valid email address" }
    }

    // Insert email into waitlist table
    const { data, error } = await supabase.from("waitlist").insert([{ email }])

    if (error) {
      console.error("Error adding to waitlist:", error)
      // Handle duplicate email error
      if (error.code === "23505") {
        return { success: false, error: "This email is already on the waitlist" }
      }
      // Surface Supabase error message in UI for debugging
      return { success: false, error: error.message }
    }

    // Revalidate the page to update the counter
    revalidatePath("/")

    return { success: true }
  } catch (err) {
    console.error("Unexpected error:", err)
    return { success: false, error: "Something went wrong. Please try again." }
  }
}

export async function getWaitlistCount() {
  try {
    const { count, error } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error getting waitlist count:", error)
      return 0
    }

    return count || 0
  } catch (err) {
    console.error("Unexpected error getting count:", err)
    return 0
  }
}
