import { BookOpen } from "lucide-react"
import WaitlistForm from "./components/waitlist-form"
import { getWaitlistCount } from "./actions/waitlist"

export default async function WaitlistPage() {
  // Get the initial waitlist count from the server
  const initialCount = await getWaitlistCount()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="flex flex-col items-center space-y-8 p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 transition-transform duration-500 hover:rotate-12">
            <BookOpen className="w-8 h-8 text-black" />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Join the Waitlist for Early Access to OpenBook.
            </h1>
            <p className="text-gray-600">Be the first to explore AI-powered, multilingual learning.</p>
          </div>

          <WaitlistForm initialCount={initialCount} />

          <p className="text-xs text-gray-500 text-center">We value your privacy. No spam, just exciting updates.</p>
        </div>
      </div>
    </main>
  )
}
