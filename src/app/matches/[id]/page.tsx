"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Pause, Play, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FootballPitch } from "@/components/football-pitch"
import { MatchStats } from "@/components/match-stats"
import { MatchEvents } from "@/components/match-events"
import { MatchInfo } from "@/components/match-info"
import { useMatchSimulation } from "@/hooks/use-match-simulation"

export default function MatchPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [timeScale, setTimeScale] = useState(1)
  const [currentTab, setCurrentTab] = useState("pitch")

  const {
    matchState,
    matchInfo,
    matchStats,
    matchEvents,
    currentTime,
    totalTime,
    setCurrentTime,
    togglePlayPause,
    skipForward,
    skipBackward,
    resetMatch,
  } = useMatchSimulation({ isPlaying, timeScale })

  const formattedTime = () => {
    const minutes = Math.floor(currentTime / 60)
    const seconds = Math.floor(currentTime % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const formattedTotalTime = () => {
    const minutes = Math.floor(totalTime / 60)
    const seconds = Math.floor(totalTime % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleTimelineChange = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    togglePlayPause()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 md:px-6">
          <Link href="/matches" className="flex items-center gap-2 mr-4">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Matches</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold">Match #{params.id}</h1>
          </div>
          <div className="w-24"></div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <MatchInfo matchInfo={matchInfo} />

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pitch">Pitch View</TabsTrigger>
            <TabsTrigger value="stats">Match Stats</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="pitch" className="mt-4">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="relative aspect-[16/9] md:aspect-[2/1] w-full overflow-hidden">
                  <FootballPitch players={matchState.players} ball={matchState.ball} events={matchState.activeEvents} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Match Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <MatchStats stats={matchStats} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="events" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Match Events</CardTitle>
              </CardHeader>
              <CardContent>
                <MatchEvents events={matchEvents} currentTime={currentTime} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{formattedTime()}</span>
            <Slider
              value={[currentTime]}
              max={totalTime}
              step={1}
              onValueChange={handleTimelineChange}
              className="mx-4 flex-1"
            />
            <span className="text-sm font-medium">{formattedTotalTime()}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" onClick={skipBackward}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={skipForward}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <select
              className="ml-4 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              value={timeScale}
              onChange={(e) => setTimeScale(Number(e.target.value))}
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="2">2x</option>
              <option value="4">4x</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  )
}
