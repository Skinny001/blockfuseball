"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import type { Player, Ball, MatchEvent } from "@/types/match"

interface FootballPitchProps {
  players: Player[]
  ball: Ball
  events: MatchEvent[]
}

export function FootballPitch({ players, ball, events }: FootballPitchProps) {
  const pitchRef = useRef<HTMLDivElement>(null)

  // Function to convert pitch coordinates (0-100) to pixel positions
  const getPixelPosition = (x: number, y: number) => {
    if (!pitchRef.current) return { x: 0, y: 0 }

    const pitchWidth = pitchRef.current.clientWidth
    const pitchHeight = pitchRef.current.clientHeight

    return {
      x: (x / 100) * pitchWidth,
      y: (y / 100) * pitchHeight,
    }
  }

  return (
    <div
      ref={pitchRef}
      className="relative w-full h-full bg-green-600 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px),
          radial-gradient(circle at center, white 0.5%, transparent 0.6%),
          radial-gradient(circle at 50% 0%, white 0.5%, transparent 0.6%),
          radial-gradient(circle at 50% 100%, white 0.5%, transparent 0.6%)
        `,
        backgroundSize: `
          calc(100% / 6) calc(100% / 4),
          calc(100% / 6) calc(100% / 4),
          auto,
          auto,
          auto
        `,
        backgroundPosition: `
          0 0,
          0 0,
          center,
          center top,
          center bottom
        `,
        backgroundRepeat: "repeat, repeat, no-repeat, no-repeat, no-repeat",
      }}
    >
      {/* Field markings */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-2/5 rounded-full border-2 border-white/40"></div>

        {/* Center line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-white/40"></div>

        {/* Penalty areas */}
        <div className="absolute top-1/4 left-0 w-1/6 h-1/2 border-2 border-l-0 border-white/40"></div>
        <div className="absolute top-1/4 right-0 w-1/6 h-1/2 border-2 border-r-0 border-white/40"></div>

        {/* Goal areas */}
        <div className="absolute top-[35%] left-0 w-[8%] h-[30%] border-2 border-l-0 border-white/40"></div>
        <div className="absolute top-[35%] right-0 w-[8%] h-[30%] border-2 border-r-0 border-white/40"></div>

        {/* Goals */}
        <div className="absolute top-[42%] left-0 w-[1%] h-[16%] bg-white/80 -translate-x-full"></div>
        <div className="absolute top-[42%] right-0 w-[1%] h-[16%] bg-white/80 translate-x-full"></div>
      </div>

      {/* Players */}
      {players.map((player) => (
        <motion.div
          key={player.id}
          className={`absolute w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold
            ${player.team === "home" ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}
          initial={{ x: getPixelPosition(player.x, player.y).x, y: getPixelPosition(player.x, player.y).y }}
          animate={{
            x: getPixelPosition(player.x, player.y).x - 8, // Center the player (half of width)
            y: getPixelPosition(player.x, player.y).y - 8, // Center the player (half of height)
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {player.number}
          <div className="absolute -bottom-5 text-[10px] font-normal text-white whitespace-nowrap">{player.name}</div>
        </motion.div>
      ))}

      {/* Ball */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-white shadow-md"
        initial={{ x: getPixelPosition(ball.x, ball.y).x, y: getPixelPosition(ball.x, ball.y).y }}
        animate={{
          x: getPixelPosition(ball.x, ball.y).x - 6, // Center the ball (half of width)
          y: getPixelPosition(ball.x, ball.y).y - 6, // Center the ball (half of height)
        }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />

      {/* Event overlays */}
      {events.map((event) => (
        <motion.div
          key={event.id}
          className="absolute"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: getPixelPosition(event.x, event.y).x - 15, // Center the event icon
            y: getPixelPosition(event.x, event.y).y - 15, // Center the event icon
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {event.type === "goal" && (
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xs font-bold">GOAL</span>
            </div>
          )}
          {event.type === "foul" && (
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">FOUL</span>
            </div>
          )}
          {event.type === "substitution" && (
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">SUB</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
