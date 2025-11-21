/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GetCompetitionMatchesApiResponse } from '@/types'

export interface FixturesDisplayProps {
  fixtures: GetCompetitionMatchesApiResponse['matches']
}

export const FixturesDisplay = ({ fixtures }: FixturesDisplayProps) => {
  return (
    <div className="flex h-full flex-col">
      <h1>Fixtures</h1>
      {!fixtures.length ? (
        'No fixtures scheduled in the few days.'
      ) : (
        <ul className="bg-violet rounded-[0.5rem] p-6 lg:p-8">
          {fixtures.length &&
            fixtures.map(
              (match: GetCompetitionMatchesApiResponse['matches'][number]) => {
                const {
                  area,
                  competition,
                  awayTeam,
                  group,
                  homeTeam,
                  id,
                  lastUpdated,
                  matchday,
                  odds,
                  referees,
                  score,
                  season,
                  stage,
                  status,
                  utcDate
                } = match

                return (
                  <li
                    key={id}
                    className="border-b border-gray-100 text-sm sm:text-base"
                  >
                    {competition.emblem}
                    {homeTeam.tla} VS {awayTeam.tla}
                  </li>
                )
              }
            )}
        </ul>
      )}
    </div>
  )
}
