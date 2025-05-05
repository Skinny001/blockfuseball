import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchList } from "@/components/match-list"
import { LeagueTable } from "@/components/league-table"

export default function MatchesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 mr-4">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold">Matches</h1>
          </div>
          <div className="w-24"></div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4 space-y-4">
            <MatchList type="upcoming" />
          </TabsContent>
          <TabsContent value="live" className="mt-4 space-y-4">
            <MatchList type="live" />
          </TabsContent>
          <TabsContent value="completed" className="mt-4 space-y-4">
            <MatchList type="completed" />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">League Table</h2>
          <Card>
            <CardContent className="p-0">
              <LeagueTable />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
