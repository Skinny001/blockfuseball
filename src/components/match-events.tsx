import type { MatchEvent } from "@/types/match"

interface MatchEventsProps {
  events: MatchEvent[]
  currentTime: number
}

export function MatchEvents({ events, currentTime }: MatchEventsProps) {
  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => a.time - b.time)

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Get event icon based on type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">⚽</div>
      case "foul":
        return <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">🛑</div>
      case "substitution":
        return <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">↔️</div>
      default:
        return <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">•</div>
    }
  }

  return (
    <div className="space-y-2">
      {sortedEvents.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No events yet</div>
      ) : (
        sortedEvents.map((event) => (
          <div
            key={event.id}
            className={`flex items-center p-3 rounded-lg border ${
              event.time <= currentTime ? "bg-gray-50 border-gray-200" : "bg-gray-100 border-gray-200 opacity-60"
            }`}
          >
            <div className="mr-3">{getEventIcon(event.type)}</div>
            <div className="flex-1">
              <div className="font-medium">{event.description}</div>
              <div className="text-sm text-gray-500">{event.player && `${event.player} (${event.team})`}</div>
            </div>
            <div className="text-sm font-medium">{formatTime(event.time)}</div>
          </div>
        ))
      )}
    </div>
  )
}
