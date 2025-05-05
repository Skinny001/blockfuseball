import type { MatchInfo as MatchInfoType } from "@/types/match"

interface MatchInfoProps {
  matchInfo: MatchInfoType
}

export function MatchInfo({ matchInfo }: MatchInfoProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <span className="font-bold text-red-500">{matchInfo.homeTeam.shortName}</span>
          </div>
          <span className="mt-2 font-medium">{matchInfo.homeTeam.name}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">
            {matchInfo.score.home} - {matchInfo.score.away}
          </div>
          <div className="text-sm text-gray-500">
            {matchInfo.status === "live" ? (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                LIVE
              </span>
            ) : (
              matchInfo.status
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="font-bold text-blue-500">{matchInfo.awayTeam.shortName}</span>
          </div>
          <span className="mt-2 font-medium">{matchInfo.awayTeam.name}</span>
        </div>
      </div>
    </div>
  )
}
