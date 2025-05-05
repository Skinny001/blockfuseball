import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function LeagueTable() {
  // Mock data for the league table
  const teams = [
    {
      position: 1,
      name: "Manchester City",
      played: 36,
      won: 26,
      drawn: 7,
      lost: 3,
      goalsFor: 89,
      goalsAgainst: 32,
      goalDifference: 57,
      points: 85,
      form: ["W", "W", "D", "W", "W"],
    },
    {
      position: 2,
      name: "Arsenal",
      played: 36,
      won: 26,
      drawn: 5,
      lost: 5,
      goalsFor: 85,
      goalsAgainst: 28,
      goalDifference: 57,
      points: 83,
      form: ["W", "W", "W", "L", "W"],
    },
    {
      position: 3,
      name: "Liverpool",
      played: 36,
      won: 23,
      drawn: 9,
      lost: 4,
      goalsFor: 79,
      goalsAgainst: 37,
      goalDifference: 42,
      points: 78,
      form: ["D", "W", "L", "W", "D"],
    },
    {
      position: 4,
      name: "Aston Villa",
      played: 36,
      won: 20,
      drawn: 7,
      lost: 9,
      goalsFor: 71,
      goalsAgainst: 52,
      goalDifference: 19,
      points: 67,
      form: ["W", "L", "W", "W", "D"],
    },
    {
      position: 5,
      name: "Tottenham",
      played: 36,
      won: 19,
      drawn: 6,
      lost: 11,
      goalsFor: 70,
      goalsAgainst: 59,
      goalDifference: 11,
      points: 63,
      form: ["L", "W", "L", "W", "W"],
    },
    {
      position: 6,
      name: "Newcastle",
      played: 36,
      won: 17,
      drawn: 9,
      lost: 10,
      goalsFor: 77,
      goalsAgainst: 54,
      goalDifference: 23,
      points: 60,
      form: ["W", "W", "D", "W", "L"],
    },
    {
      position: 7,
      name: "Manchester United",
      played: 36,
      won: 17,
      drawn: 6,
      lost: 13,
      goalsFor: 54,
      goalsAgainst: 56,
      goalDifference: -2,
      points: 57,
      form: ["L", "W", "L", "W", "D"],
    },
    {
      position: 8,
      name: "Chelsea",
      played: 36,
      won: 15,
      drawn: 10,
      lost: 11,
      goalsFor: 69,
      goalsAgainst: 59,
      goalDifference: 10,
      points: 55,
      form: ["D", "W", "D", "W", "W"],
    },
    {
      position: 9,
      name: "West Ham",
      played: 36,
      won: 13,
      drawn: 9,
      lost: 14,
      goalsFor: 55,
      goalsAgainst: 67,
      goalDifference: -12,
      points: 48,
      form: ["L", "D", "W", "L", "D"],
    },
    {
      position: 10,
      name: "Brighton",
      played: 36,
      won: 12,
      drawn: 11,
      lost: 13,
      goalsFor: 54,
      goalsAgainst: 59,
      goalDifference: -5,
      points: 47,
      form: ["D", "D", "L", "W", "D"],
    },
  ]

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Pos</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-center">P</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">D</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-center">GF</TableHead>
            <TableHead className="text-center">GA</TableHead>
            <TableHead className="text-center">GD</TableHead>
            <TableHead className="text-center">Pts</TableHead>
            <TableHead className="text-center">Form</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.position} className={team.position <= 4 ? "bg-green-50 dark:bg-green-950/20" : ""}>
              <TableCell className="font-medium">{team.position}</TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell className="text-center">{team.played}</TableCell>
              <TableCell className="text-center">{team.won}</TableCell>
              <TableCell className="text-center">{team.drawn}</TableCell>
              <TableCell className="text-center">{team.lost}</TableCell>
              <TableCell className="text-center">{team.goalsFor}</TableCell>
              <TableCell className="text-center">{team.goalsAgainst}</TableCell>
              <TableCell className="text-center">{team.goalDifference}</TableCell>
              <TableCell className="text-center font-bold">{team.points}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-1">
                  {team.form.map((result, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white
                        ${result === "W" ? "bg-green-500" : result === "D" ? "bg-gray-500" : "bg-red-500"}`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
