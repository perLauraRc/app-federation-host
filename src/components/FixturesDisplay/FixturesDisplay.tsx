import type { FixtureFilter, Match } from '@src/types'

export interface FixturesDisplayProps {
  fixtures: (Match & FixtureFilter)[]
}

const FixturesDisplay = ({ fixtures }: FixturesDisplayProps) => {
  return (
    <div className="flex h-full flex-col">
      <h1>Fixtures</h1>
      {!fixtures.length ? (
        'No fixtures scheduled in the few days.'
      ) : (
        <ul className="bg-violet rounded-[0.5rem] p-6 lg:p-8">
          {fixtures.length &&
            fixtures.map((match: Match & FixtureFilter) => {
              const {
                // area,
                competition,
                awayTeam,
                // group,
                homeTeam,
                id
                // isFavorite,
                // lastUpdated,
                // matchday,
                // odds,
                // referees,
                // score,
                // season,
                // stage,
                // status,
                // utcDate
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
            })}
        </ul>
      )}
    </div>
  )
}

export default FixturesDisplay
