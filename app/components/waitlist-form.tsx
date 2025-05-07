"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { addToWaitlist } from "../actions/waitlist"
import WaitlistCounter from "./waitlist-counter"

export default function WaitlistForm({ initialCount }: { initialCount: number }) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [source, setSource] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!source) {
      setError("Please select where you heard about OpenBook")
      return
    }
    setIsSubmitting(true)

    try {
      const result = await addToWaitlist(email, source)

      if (result.success) {
        setIsSubmitted(true)
        setEmail("")
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 border-gray-200 focus:border-black focus:ring-black transition-all duration-300"
              aria-label="Email address"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="space-y-2">
            <Select
              value={source}
              onValueChange={(value) => setSource(value)}
            >
              <SelectTrigger className="w-full h-12 border-gray-200 focus:border-black focus:ring-black transition-all duration-300">
                <SelectValue placeholder="Where did you hear about OpenBook" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="X">X</SelectItem>
                <SelectItem value="Founders">Founders</SelectItem>
                <SelectItem value="Referals">Referals</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white transition-all duration-300 transform hover:translate-y-[-2px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Join the Waitlist"
            )}
          </Button>

          <div className="flex justify-center pt-2">
            <WaitlistCounter initialCount={initialCount} />
          </div>
        </form>
      ) : (
        <div className="w-full flex flex-col items-center space-y-4 animate-fadeIn">
          <CheckCircle className="w-12 h-12 text-black" />
          <p className="text-center font-medium">Thank you for joining our waitlist! We'll be in touch soon.</p>
          <WaitlistCounter initialCount={initialCount} />
        </div>
      )}
    </div>
  )
}
