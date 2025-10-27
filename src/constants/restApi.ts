import type { CompetitionId, MatchStatus } from '@src/types'

// Free Football API https://www.football-data.org/
// Documentation https://www.football-data.org/documentation/quickstart
export const apiDomain = 'https://api.football-data.org'
export const apiToken = '0219878c3f3a42809be6125fef967e80' // My personal authorization API Token
export const urlPathnameBase = '/v4'

export const CompetitionIds: Record<CompetitionId, string> = {
  /** Bundesliga */
  BL1: 'BL1',
  /** Campeonato Brasileiro Série A */
  BSA: 'BSA',
  /** UEFA Champions League */
  CL: 'CL',
  /** Eredivisie */
  DED: 'DED',
  /** Championship */
  ELC: 'ELC',
  /** European Championship */
  EC: 'EC',
  /** Ligue 1 */
  FL1: 'FL1',
  /** Primera División */
  PD: 'PD',
  /** Premier League */
  PL: 'PL',
  /** Primeira Liga */
  PPL: 'PPL',
  /** Serie A */
  SA: 'SA',
  /** FIFA World Cup */
  WC: 'WC'
}

export const MatchStatuses: Record<MatchStatus, string> = {
  SCHEDULED: 'SCHEDULED',
  TIMED: 'TIMED',
  LIVE: 'LIVE',
  IN_PLAY: 'IN_PLAY',
  PAUSED: 'PAUSED',
  FINISHED: 'FINISHED',
  POSTPONED: 'POSTPONED',
  SUSPENDED: 'SUSPENDED',
  CANCELLED: 'CANCELLED'
}

export enum EndpointPath {
  Competitions = 'competitions',
  Matches = 'matches',
  Standings = 'standings',
  Teams = 'teams'
}
