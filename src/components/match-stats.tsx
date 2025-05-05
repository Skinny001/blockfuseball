import type { MatchStats as MatchStatsType } from "@/types/match"

interface MatchStatsProps {
  stats: MatchStatsType
}

export function MatchStats({ stats }: MatchStatsProps) {
  const statItems = [
    { label: "Possession", home: stats.possession.home, away: stats.possession.away },
    { label: "Shots", home: stats.shots.home, away: stats.shots.away },
    { label: "Shots on Target", home: stats.shotsOnTarget.home, away: stats.shotsOnTarget.away },
    { label: "Corners", home: stats.corners.home, away: stats.corners.away },
    { label: "Fouls", home: stats.fouls.home, away: stats.fouls.away },
    { label: "Yellow Cards", home: stats.yellowCards.home, away: stats.yellowCards.away },
    { label: "Red Cards", home: stats.redCards.home, away: stats.redCards.away },
    { label: "Offsides", home: stats.offsides.home, away: stats.offsides.away },
  ]

  return (
    <div className="space-y-4">
      {statItems.map((item) => (
        <div key={item.label} className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4">
          <div className="text-right font-medium">{item.home}</div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
              style={{ width: `${(item.home / (item.home + item.away)) * 100}%` }}
            ></div>
            <div
              className="absolute top-0 right-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${(item.away / (item.home + item.away)) * 100}%` }}
            ></div>
          </div>
          <div className="text-left font-medium">{item.away}</div>
          <div className="text-right text-sm text-gray-500">{item.label}</div>
          <div></div>
          <div className="text-left text-sm text-gray-500">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
