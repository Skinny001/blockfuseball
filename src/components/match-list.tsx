import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MatchListProps {
  type: "upcoming" | "live" | "completed"
}

export function MatchList({ type }: MatchListProps) {
  // Mock data for matches
  const matches = [
    {
      id: "1",
      homeTeam: { name: "Arsenal", shortName: "ARS", logo: "arsenal" },
      awayTeam: { name: "Chelsea", shortName: "CHE", logo: "chelsea" },
      date: "2024-05-10",
      time: "15:00",
      status: type === "live" ? "live" : type === "completed" ? "finished" : "upcoming",
      score: type === "completed" ? { home: 2, away: 1 } : type === "live" ? { home: 1, away: 0 } : null,
    },
    {
      id: "2",
      homeTeam: { name: "Liverpool", shortName: "LIV", logo: "liverpool" },
      awayTeam: { name: "Manchester City", shortName: "MCI", logo: "mancity" },
      date: "2024-05-11",
      time: "17:30",
      status: type === "live" ? "live" : type === "completed" ? "finished" : "upcoming",
      score: type === "completed" ? { home: 3, away: 3 } : type === "live" ? { home: 2, away: 2 } : null,
    },
    {
      id: "3",
      homeTeam: { name: "Tottenham", shortName: "TOT", logo: "tottenham" },
      awayTeam: { name: "Manchester United", shortName: "MUN", logo: "manutd" },
      date: "2024-05-12",
      time: "14:00",
      status: type === "live" ? "live" : type === "completed" ? "finished" : "upcoming",
      score: type === "completed" ? { home: 0, away: 2 } : type === "live" ? { home: 0, away: 1 } : null,
    },
    {
      id: "4",
      homeTeam: { name: "Newcastle", shortName: "NEW", logo: "newcastle" },
      awayTeam: { name: "Aston Villa", shortName: "AVL", logo: "astonvilla" },
      date: "2024-05-13",
      time: "20:00",
      status: type === "live" ? "live" : type === "completed" ? "finished" : "upcoming",
      score: type === "completed" ? { home: 1, away: 0 } : type === "live" ? { home: 0, away: 0 } : null,
    },
    {
      id: "5",
      homeTeam: { name: "Brighton", shortName: "BHA", logo: "brighton" },
      awayTeam: { name: "West Ham", shortName: "WHU", logo: "westham" },
      date: "2024-05-14",
      time: "19:45",
      status: type === "live" ? "live" : type === "completed" ? "finished" : "upcoming",
      score: type === "completed" ? { home: 2, away: 2 } : type === "live" ? { home: 1, away: 1 } : null,
    },
  ]

  if (matches.length === 0) {
    return <div className="text-center py-8 text-gray-500">No {type} matches available</div>
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Card key={match.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{match.date}</span>
                  <Clock className="w-4 h-4 ml-3 mr-1" />
                  <span>{match.time}</span>
                </div>
                {match.status === "live" && (
                  <div className="flex items-center text-sm font-medium text-red-500">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                    LIVE
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center w-5/12">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="font-bold">{match.homeTeam.shortName}</span>
                  </div>
                  <span className="mt-2 text-center font-medium">{match.homeTeam.name}</span>
                </div>

                <div className="flex flex-col items-center w-2/12">
                  {match.score ? (
                    <div className="text-2xl font-bold">
                      {match.score.home} - {match.score.away}
                    </div>
                  ) : (
                    <div className="text-lg font-medium">vs</div>
                  )}
                </div>

                <div className="flex flex-col items-center w-5/12">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="font-bold">{match.awayTeam.shortName}</span>
                  </div>
                  <span className="mt-2 text-center font-medium">{match.awayTeam.name}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Link href={match.status === "live" ? `/matches/live?id=${match.id}` : `/matches/${match.id}`}>
                  <Button variant={match.status === "live" ? "default" : "outline"}>
                    {match.status === "live"
                      ? "Watch Live"
                      : match.status === "upcoming"
                        ? "Match Preview"
                        : "Match Summary"}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
