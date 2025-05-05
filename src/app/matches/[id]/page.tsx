import { MatchClient } from "@/components/match-client"

interface MatchPageParams {
  id: string;
}

export default function MatchPage({ params }: { params: MatchPageParams }) {
  return <MatchClient id={params.id} />
}