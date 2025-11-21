import type { APIError } from './API/apiError'
import type { Area } from './API/area'
import type { Competition, CompetitionId } from './API/competition'
import type { GetCompetitionMatchesApiResponse } from './API/getCompetitionMatchesApiResponse'
import type {
  GetPostsDocumentQuery,
  GetPostsQueryResponse,
  GetPostsQueryVariables
} from './graphQL/queries'
import type { Post } from './graphQL/post'
import type { Match, MatchStatus } from './API/match'
import type { Odds } from './API/odds'
import type { Referee } from './API/referee'
import type { Score, PartialScore } from './API/score'
import type { Season } from './API/season'
import type { Team } from './API/team'

export type { APIError }
export type { Area }
export type { Competition, CompetitionId }
export type { GetCompetitionMatchesApiResponse }
export type { Post }
export type { Match, MatchStatus }
export type { Odds }
export type {
  GetPostsDocumentQuery,
  GetPostsQueryResponse,
  GetPostsQueryVariables
}
export type { Referee }
export type { Score, PartialScore }
export type { Season }
export type { Team }
