"use client"

import { useState, useEffect, useRef } from "react"
import type { Player, Ball, MatchEvent, MatchInfo, MatchStats } from "@/types/match"

interface UseMatchSimulationProps {
  isPlaying: boolean
  timeScale: number
}

export function useMatchSimulation({ isPlaying, timeScale }: UseMatchSimulationProps) {
  // Match state
  const [players, setPlayers] = useState<Player[]>(generateInitialPlayers())
  const [ball, setBall] = useState<Ball>({ x: 50, y: 50 })
  const [events, setEvents] = useState<MatchEvent[]>([])
  const [activeEvents, setActiveEvents] = useState<MatchEvent[]>([])

  // Match info
  const [matchInfo, setMatchInfo] = useState<MatchInfo>({
    homeTeam: { name: "Manchester United", shortName: "MUN" },
    awayTeam: { name: "Liverpool", shortName: "LIV" },
    score: { home: 0, away: 0 },
    status: "live",
  })

  // Match stats
  const [matchStats, setMatchStats] = useState<MatchStats>({
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    offsides: { home: 0, away: 0 },
  })

  // Timeline
  const [currentTime, setCurrentTime] = useState(0)
  const totalTime = 90 * 60 // 90 minutes in seconds

  // Animation frame reference
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(Date.now())

  // Generate initial players
  function generateInitialPlayers(): Player[] {
    const homeTeam: Player[] = [
      { id: "h1", name: "De Gea", number: 1, team: "home", x: 10, y: 50, targetX: 10, targetY: 50 },
      { id: "h2", name: "Shaw", number: 3, team: "home", x: 20, y: 20, targetX: 20, targetY: 20 },
      { id: "h3", name: "Maguire", number: 5, team: "home", x: 20, y: 40, targetX: 20, targetY: 40 },
      { id: "h4", name: "Varane", number: 19, team: "home", x: 20, y: 60, targetX: 20, targetY: 60 },
      { id: "h5", name: "Wan-Bissaka", number: 29, team: "home", x: 20, y: 80, targetX: 20, targetY: 80 },
      { id: "h6", name: "Fred", number: 17, team: "home", x: 35, y: 30, targetX: 35, targetY: 30 },
      { id: "h7", name: "McTominay", number: 39, team: "home", x: 35, y: 70, targetX: 35, targetY: 70 },
      { id: "h8", name: "Fernandes", number: 18, team: "home", x: 50, y: 50, targetX: 50, targetY: 50 },
      { id: "h9", name: "Sancho", number: 25, team: "home", x: 65, y: 20, targetX: 65, targetY: 20 },
      { id: "h10", name: "Rashford", number: 10, team: "home", x: 65, y: 80, targetX: 65, targetY: 80 },
      { id: "h11", name: "Ronaldo", number: 7, team: "home", x: 80, y: 50, targetX: 80, targetY: 50 },
    ]

    const awayTeam: Player[] = [
      { id: "a1", name: "Alisson", number: 1, team: "away", x: 90, y: 50, targetX: 90, targetY: 50 },
      { id: "a2", name: "Robertson", number: 26, team: "away", x: 80, y: 20, targetX: 80, targetY: 20 },
      { id: "a3", name: "Van Dijk", number: 4, team: "away", x: 80, y: 40, targetX: 80, targetY: 40 },
      { id: "a4", name: "Matip", number: 32, team: "away", x: 80, y: 60, targetX: 80, targetY: 60 },
      { id: "a5", name: "Alexander-Arnold", number: 66, team: "away", x: 80, y: 80, targetX: 80, targetY: 80 },
      { id: "a6", name: "Fabinho", number: 3, team: "away", x: 65, y: 30, targetX: 65, targetY: 30 },
      { id: "a7", name: "Henderson", number: 14, team: "away", x: 65, y: 70, targetX: 65, targetY: 70 },
      { id: "a8", name: "Thiago", number: 6, team: "away", x: 50, y: 50, targetX: 50, targetY: 50 },
      { id: "a9", name: "Mané", number: 10, team: "away", x: 35, y: 20, targetX: 35, targetY: 20 },
      { id: "a10", name: "Salah", number: 11, team: "away", x: 35, y: 80, targetX: 35, targetY: 80 },
      { id: "a11", name: "Firmino", number: 9, team: "away", x: 20, y: 50, targetX: 20, targetY: 50 },
    ]

    return [...homeTeam, ...awayTeam]
  }

  // Update player positions
  const updatePlayerPositions = () => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        // Random movement around target position
        const randomX = (Math.random() - 0.5) * 5
        const randomY = (Math.random() - 0.5) * 5

        // Calculate new position with some randomness
        let newX = player.x + (player.targetX - player.x) * 0.05 + randomX * 0.02
        let newY = player.y + (player.targetY - player.y) * 0.05 + randomY * 0.02

        // Keep players within bounds
        newX = Math.max(5, Math.min(95, newX))
        newY = Math.max(5, Math.min(95, newY))

        return {
          ...player,
          x: newX,
          y: newY,
        }
      })
    })
  }

  // Update ball position
  const updateBallPosition = () => {
    // Find the closest player to the ball
    const closestPlayer = players.reduce(
      (closest, player) => {
        const distToBall = Math.sqrt(Math.pow(player.x - ball.x, 2) + Math.pow(player.y - ball.y, 2))

        if (!closest || distToBall < closest.distance) {
          return { player, distance: distToBall }
        }
        return closest
      },
      null as { player: Player; distance: number } | null,
    )

    if (closestPlayer && closestPlayer.distance < 10) {
      // Ball follows the player with some lag
      setBall((prevBall) => ({
        x: prevBall.x + (closestPlayer.player.x - prevBall.x) * 0.2,
        y: prevBall.y + (closestPlayer.player.y - prevBall.y) * 0.2,
      }))
    } else {
      // Ball moves slightly randomly
      setBall((prevBall) => {
        const randomX = (Math.random() - 0.5) * 2
        const randomY = (Math.random() - 0.5) * 2

        let newX = prevBall.x + randomX
        let newY = prevBall.y + randomY

        // Keep ball within bounds
        newX = Math.max(2, Math.min(98, newX))
        newY = Math.max(2, Math.min(98, newY))

        return { x: newX, y: newY }
      })
    }
  }

  // Generate match events
  const generateMatchEvents = () => {
    // Only generate events occasionally
    if (Math.random() > 0.005) return

    const eventTypes = ["goal", "foul", "substitution"]
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const team = Math.random() > 0.5 ? "home" : "away"
    const teamPlayers = players.filter((p) => p.team === team)
    const player = teamPlayers[Math.floor(Math.random() * teamPlayers.length)]

    let description = ""

    switch (eventType) {
      case "goal":
        description = `GOAL! ${player.name} scores for ${team === "home" ? "Manchester United" : "Liverpool"}!`
        // Update score
        setMatchInfo((prev) => ({
          ...prev,
          score: {
            ...prev.score,
            [team]: prev.score[team] + 1,
          },
        }))
        // Update stats
        setMatchStats((prev) => ({
          ...prev,
          shots: {
            ...prev.shots,
            [team]: prev.shots[team] + 1,
          },
          shotsOnTarget: {
            ...prev.shotsOnTarget,
            [team]: prev.shotsOnTarget[team] + 1,
          },
        }))
        break
      case "foul":
        description = `Foul by ${player.name}`
        // Update stats
        setMatchStats((prev) => ({
          ...prev,
          fouls: {
            ...prev.fouls,
            [team]: prev.fouls[team] + 1,
          },
        }))
        break
      case "substitution":
        description = `Substitution for ${team === "home" ? "Manchester United" : "Liverpool"}`
        break
    }

    const newEvent: MatchEvent = {
      id: `event-${Date.now()}-${Math.random()}`,
      type: eventType,
      time: currentTime,
      x: ball.x,
      y: ball.y,
      team,
      player: player.name,
      description,
    }

    setEvents((prev) => [...prev, newEvent])

    // Add to active events (will be removed after a few seconds)
    setActiveEvents((prev) => [...prev, newEvent])
    setTimeout(() => {
      setActiveEvents((prev) => prev.filter((e) => e.id !== newEvent.id))
    }, 3000)
  }

  // Update player targets based on ball position
  const updatePlayerTargets = () => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        // Goalkeepers stay in position
        if (player.number === 1) return player

        // Calculate distance to ball
        const distToBall = Math.sqrt(Math.pow(player.x - ball.x, 2) + Math.pow(player.y - ball.y, 2))

        // If player is far from the ball, move towards it slightly
        if (distToBall > 20) {
          // Home team moves towards the right, away team towards the left
          const directionFactor = player.team === "home" ? 1 : -1

          // Calculate new target position
          let targetX = player.targetX + (ball.x - player.targetX) * 0.1 * directionFactor
          let targetY = player.targetY + (ball.y - player.targetY) * 0.1

          // Keep targets within reasonable bounds based on player position
          if (player.team === "home") {
            targetX = Math.max(player.id.includes("h1") ? 5 : 15, Math.min(85, targetX))
          } else {
            targetX = Math.max(15, Math.min(player.id.includes("a1") ? 95 : 85, targetX))
          }

          targetY = Math.max(10, Math.min(90, targetY))

          return {
            ...player,
            targetX,
            targetY,
          }
        }

        return player
      })
    })
  }

  // Update possession stats
  const updatePossessionStats = () => {
    // Find the closest player to the ball
    const closestPlayer = players.reduce(
      (closest, player) => {
        const distToBall = Math.sqrt(Math.pow(player.x - ball.x, 2) + Math.pow(player.y - ball.y, 2))

        if (!closest || distToBall < closest.distance) {
          return { player, distance: distToBall }
        }
        return closest
      },
      null as { player: Player; distance: number } | null,
    )

    if (closestPlayer && closestPlayer.distance < 10) {
      // Update possession stats
      setMatchStats((prev) => {
        const team = closestPlayer.player.team
        const otherTeam = team === "home" ? "away" : "home"

        // Slightly adjust possession
        let homePossession = prev.possession.home
        let awayPossession = prev.possession.away

        if (team === "home") {
          homePossession += 0.1
          awayPossession -= 0.1
        } else {
          homePossession -= 0.1
          awayPossession += 0.1
        }

        // Normalize to ensure they sum to 100
        const total = homePossession + awayPossession
        homePossession = (homePossession / total) * 100
        awayPossession = (awayPossession / total) * 100

        return {
          ...prev,
          possession: {
            home: Math.round(homePossession),
            away: Math.round(awayPossession),
          },
        }
      })
    }
  }

  // Main animation loop
  const animate = () => {
    const now = Date.now()
    const deltaTime = (now - lastUpdateTimeRef.current) / 1000 // in seconds
    lastUpdateTimeRef.current = now

    // Update time if playing
    if (isPlaying) {
      setCurrentTime((prevTime) => {
        const newTime = prevTime + deltaTime * timeScale
        return Math.min(newTime, totalTime)
      })
    }

    // Update simulation
    updatePlayerPositions()
    updateBallPosition()
    updatePlayerTargets()
    updatePossessionStats()
    generateMatchEvents()

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate)
  }

  // Start/stop animation based on isPlaying
  useEffect(() => {
    if (isPlaying) {
      lastUpdateTimeRef.current = Date.now()
      animationFrameRef.current = requestAnimationFrame(animate)
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, timeScale])

  // Control functions
  const togglePlayPause = () => {
    // This is handled by the parent component through isPlaying prop
  }

  const skipForward = () => {
    setCurrentTime((prevTime) => Math.min(prevTime + 60, totalTime)) // Skip forward 1 minute
  }

  const skipBackward = () => {
    setCurrentTime((prevTime) => Math.max(prevTime - 60, 0)) // Skip backward 1 minute
  }

  const resetMatch = () => {
    setCurrentTime(0)
    setPlayers(generateInitialPlayers())
    setBall({ x: 50, y: 50 })
    setEvents([])
    setActiveEvents([])
    setMatchInfo({
      homeTeam: { name: "Manchester United", shortName: "MUN" },
      awayTeam: { name: "Liverpool", shortName: "LIV" },
      score: { home: 0, away: 0 },
      status: "live",
    })
    setMatchStats({
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      shotsOnTarget: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      yellowCards: { home: 0, away: 0 },
      redCards: { home: 0, away: 0 },
      offsides: { home: 0, away: 0 },
    })
  }

  return {
    matchState: {
      players,
      ball,
      activeEvents,
    },
    matchInfo,
    matchStats,
    matchEvents: events,
    currentTime,
    totalTime,
    setCurrentTime,
    togglePlayPause,
    skipForward,
    skipBackward,
    resetMatch,
  }
}
