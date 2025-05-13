import { BookOpen } from "lucide-react"
import WaitlistForm from "./components/waitlist-form"
import { getWaitlistCount } from "./actions/waitlist"
import BookIllustration from "./components/book-illustration"
import BackgroundParticles from "./components/background-particles"

export default async function WaitlistPage() {
  // Get the initial waitlist count from the server
  const initialCount = await getWaitlistCount()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black p-4 relative overflow-hidden">
      {/* Background Particles */}
      <BackgroundParticles />
      
      {/* Abstract illustration elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-black opacity-20 -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 border-b border-r border-black opacity-20 translate-x-20 translate-y-20"></div>
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-black rounded-full opacity-10"></div>
      <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-black opacity-5 rotate-45"></div>
      
      <div className="absolute top-20 left-20 w-8 h-8 opacity-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" />
          <path d="M2 12L12 17L22 12" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-20 w-10 h-10 opacity-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      </div>
      
      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="flex flex-col items-center space-y-8 p-8 rounded-lg border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)]">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-black opacity-30"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-black opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-black opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-black opacity-30"></div>
          
          <div className="flex items-center justify-center w-24 h-24 relative">
            <BookIllustration />
          </div>

          <div className="space-y-3 text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Join the Waitlist for Early Access to OpenBook.
            </h1>
            <p className="text-gray-700">Be the first to explore AI-powered, multilingual learning.</p>
          </div>

          <WaitlistForm initialCount={initialCount} />

          <p className="text-xs text-gray-600 text-center">We value your privacy. No spam, just exciting updates.</p>
        </div>
      </div>
    </main>
  )
}
