import type { Area } from './area'
import type { Competition } from './competition'
import type { Odds } from './odds'
import type { Referee } from './referee'
import type { Score } from './score'
import type { Season } from './season'
import type { Team } from './team'

export type MatchStatus =
  | 'SCHEDULED'
  | 'TIMED'
  | 'LIVE'
  | 'IN_PLAY'
  | 'PAUSED'
  | 'FINISHED'
  | 'POSTPONED'
  | 'SUSPENDED'
  | 'CANCELLED'

export type Match = {
  area: Area
  competition: Competition
  awayTeam: Team
  group: string | null
  homeTeam: Team
  id: number
  lastUpdated: string
  matchday: number
  odds: Odds
  referees: Referee[]
  score: Score
  season: Season
  stage: string
  status: MatchStatus
  utcDate: string
}
