import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* SVG Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <svg className="absolute left-0 top-0 h-full w-1/3" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="20" cy="50" r="8" fill="#3B82F6" />
          <circle cx="50" cy="20" r="6" fill="#10B981" />
          <circle cx="80" cy="70" r="10" fill="#EF4444" />
          <path d="M30,50 Q50,30 70,50 T90,30" stroke="#F59E0B" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute right-0 bottom-0 h-full w-1/3" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="70" y="40" width="10" height="10" rx="2" fill="#6366F1" />
          <polygon points="30,60 40,50 50,60 40,70" fill="#EC4899" />
          <path d="M10,20 Q30,10 50,20 T80,10" stroke="#14B8A6" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-600 dark:text-green-400">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5 3.9 4 4 0 0 1-1-7.5V4a2 2 0 0 1 4 0v1.4a8 8 0 0 0 .5 7.3 1 1 0 0 1-.9 1.3H7a1 1 0 0 1-1-1 4 4 0 0 1 4-4h.5a8 8 0 0 0 8-8 10 10 0 0 0-10-10z" />
            </svg>
            <span className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-400">FootballViz</span>
          </Link>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </Button>
          
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Home
            </Link>
            <Link href="/matches" className="font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Matches
            </Link>
            <Link href="/teams" className="font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Teams
            </Link>
            <Link href="/stats" className="font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Stats
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Live matches available now
              </div>
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-400">
                  Football Intelligence <br className="hidden md:inline" />Reimagined
                </h1>
                <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Experience matches with advanced analytics, real-time tracking, and immersive visualizations that bring every play to life.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/matches/live">
                  <Button size="lg" className="cursor-pointer bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 shadow-lg">
                    Watch Live Matches
                  </Button>
                </Link>
                <Link href="/matches">
                  <Button variant="outline" size="lg" className="cursor-pointer border-gray-300 dark:border-gray-600 shadow-sm">
                    Explore Match Archive
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-400">
                Advanced Football Analytics
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed dark:text-gray-300">
                Unlock powerful insights with our cutting-edge visualization tools
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                  title: "Real-Time Tracking",
                  description: "Follow every player movement and ball trajectory with millisecond precision during live matches."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                      <path d="M12 2v4" />
                      <path d="m16 5 3 3" />
                      <path d="M18 12h4" />
                      <path d="m16 19 3-3" />
                      <path d="M12 22v-4" />
                      <path d="m8 19-3 3" />
                      <path d="M6 12H2" />
                      <path d="m8 5-3-3" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  ),
                  title: "Tactical Analysis",
                  description: "Visualize team formations, pressing triggers, and passing networks with heatmap overlays."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                      <path d="M21 7 6 18" />
                      <path d="M3 8l7.5 6.5L9 17l-4-1L3 8Z" />
                      <path d="m10 12 4.5 4.5" />
                      <path d="M16 3c3 3 2 8 2 10s1 3 1 3h3s1-1 1-3-1-10-3-13Z" />
                    </svg>
                  ),
                  title: "Set Piece Designer",
                  description: "Create and analyze set piece strategies with our interactive play designer tool."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      <path d="m15 5 3 3" />
                    </svg>
                  ),
                  title: "Match Annotations",
                  description: "Add custom notes and drawings to match footage for coaching and analysis."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  ),
                  title: "Performance Metrics",
                  description: "Track player fitness, sprint stats, and workload with detailed performance dashboards."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                      <path d="M12 2v4" />
                      <path d="m16.24 7.76 2.83 2.83" />
                      <path d="M18 12h4" />
                      <path d="m16.24 16.24 2.83-2.83" />
                      <path d="M12 18v4" />
                      <path d="m7.76 16.24-2.83-2.83" />
                      <path d="M6 12H2" />
                      <path d="m7.76 7.76-2.83 2.83" />
                    </svg>
                  ),
                  title: "Compare Players",
                  description: "Side-by-side player comparison with hundreds of statistical metrics."
                }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center p-6 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Ready to transform how you experience football?
                </h2>
                <p className="max-w-[700px] text-green-100 md:text-xl/relaxed">
                  Join thousands of coaches, analysts, and fans using FootballViz to gain deeper match insights.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button size="lg" className="cursor-pointer bg-white text-green-600 hover:bg-gray-100 hover:text-green-700 shadow-lg">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="cursor-pointer border-white text-black hover:bg-white/10 hover:text-white shadow-sm">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="container flex flex-col gap-4 py-8 md:h-20 md:flex-row md:items-center md:justify-between md:py-0">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-600 dark:text-green-400">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5 3.9 4 4 0 0 1-1-7.5V4a2 2 0 0 1 4 0v1.4a8 8 0 0 0 .5 7.3 1 1 0 0 1-.9 1.3H7a1 1 0 0 1-1-1 4 4 0 0 1 4-4h.5a8 8 0 0 0 8-8 10 10 0 0 0-10-10z" />
            </svg>
            <span className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-400">FootballViz</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors">
              Features
            </Link>
            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors">
              Pricing
            </Link>
            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors">
              Blog
            </Link>
            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors">
              Documentation
            </Link>
            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="container border-t py-4 text-center text-xs text-gray-500 dark:text-gray-400">
          © 2024 FootballViz. All rights reserved. | <Link href="#" className="hover:underline">Terms</Link> | <Link href="#" className="hover:underline">Privacy</Link>
        </div>
      </footer>
    </div>
  )
}