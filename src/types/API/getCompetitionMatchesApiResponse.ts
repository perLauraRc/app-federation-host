import type { FixtureFilter } from '../filters'
import type { Competition } from './competition'
import type { Match } from './match'

export type ResultSet = {
  count: number
  first: string
  last: string
  played: number
}

export type GetCompetitionMatchesApiResponse = {
  competition: Competition
  filters: {
    season: number
  }
  matches: (Match & FixtureFilter)[] | null
  resultSet: ResultSet
}
