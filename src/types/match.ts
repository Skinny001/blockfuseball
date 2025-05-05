export interface Player {
    id: string
    name: string
    number: number
    team: "home" | "away"
    x: number
    y: number
    targetX: number
    targetY: number
  }
  
  export interface Ball {
    x: number
    y: number
  }
  
  export interface MatchEvent {
    id: string
    type: "goal" | "foul" | "substitution" | string
    time: number
    x: number
    y: number
    team: "home" | "away"
    player?: string
    description: string
  }
  
  export interface Team {
    name: string
    shortName: string
  }
  
  export interface MatchInfo {
    homeTeam: Team
    awayTeam: Team
    score: {
      home: number
      away: number
    }
    status: "live" | "upcoming" | "finished" | string
  }
  
  export interface MatchStats {
    possession: {
      home: number
      away: number
    }
    shots: {
      home: number
      away: number
    }
    shotsOnTarget: {
      home: number
      away: number
    }
    corners: {
      home: number
      away: number
    }
    fouls: {
      home: number
      away: number
    }
    yellowCards: {
      home: number
      away: number
    }
    redCards: {
      home: number
      away: number
    }
    offsides: {
      home: number
      away: number
    }
  }
  