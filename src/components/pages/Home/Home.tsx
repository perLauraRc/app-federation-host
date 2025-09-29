import { useEffect, useRef, useState } from 'react'

import CircleProgress from 'remoteApp/CircleProgress'
import GalleryCell from 'remoteApp/GalleryCell'
import ErrorPage from 'remoteApp/ErrorPage'

import type { APIError, MatchStatus } from '@/types'

import { classNames } from '@/utils/classNames'
import { fetchRequest } from '@/services/fetchApiService'
import {
  CompetitionIdEnum,
  EndpointPath,
  MatchStatuses
} from '@/constants/restApi'
import { GetCompetitionMatchesApiResponse } from '@/types/API/getCompetitionMatchesApiResponse'
import FixturesDisplay from '@/components/FixturesDisplay/FixturesDisplay'

const gridClassName =
  'mt-6 lg:mt-8 grid gap-4 lg:gap-6 lg:grid-cols-3 lg:grid-rows-2'
const gridItemClassName =
  'p-6 lg:p-8 bg-cerulean/20 border-8 border-solid border-cerulean/50'

const Home = () => {
  const [competitionProgress, setCompetitionProgress] = useState<
    GetCompetitionMatchesApiResponse['resultSet'] | null
  >(null)
  const [competitionData, setCompetitionData] = useState<
    GetCompetitionMatchesApiResponse['competition'] | null
  >(null)
  const [matchesData, setMatchesData] = useState<
    GetCompetitionMatchesApiResponse['matches'] | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<APIError | null>(null)
  const circleProgressRef = useRef<HTMLDivElement>(null)
  const [circleProgressSize, setCircleProgressSize] = useState(0)

  useEffect(() => {
    const fetchGridData = async () => {
      try {
        const data: GetCompetitionMatchesApiResponse = await fetchRequest([
          EndpointPath.Competitions,
          CompetitionIdEnum.CL,
          EndpointPath.Matches
        ])
        debugger
        setCompetitionProgress(data.resultSet)
        setCompetitionData(data.competition)
        setMatchesData(data.matches)
        setError(null)
      } catch (error) {
        console.log(error)
        setMatchesData(null)
        setError(error as APIError)
      } finally {
        setLoading(false)
      }
    }

    fetchGridData()
  }, [])

  useEffect(() => {
    const observeTarget = circleProgressRef.current
    if (!observeTarget || !competitionProgress) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: circleProgressRefWidth } = entry.contentRect
        if (circleProgressRefWidth > 0) {
          setCircleProgressSize(circleProgressRefWidth - 64) // Subtracting padding
        }
      }
    })

    resizeObserver.observe(circleProgressRef.current)

    return () => resizeObserver.disconnect()
  }, [competitionProgress])

  if (error) {
    return (
      <ErrorPage
        action={
          <button className="border-1 pt-1 pr-2 pb-1 pl-2">Go back home</button>
        }
        message={error.message}
        status={error.status}
        title="Error fetching matches matchesData."
      />
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 lg:max-w-7xl lg:px-8">
      <h1 className="max-w-(--breakpoint-sm) text-[2.5rem]/13 lg:text-[5rem]/20 tracking-tight text-pretty">
        <span className="relative inline-block bg-tiktok-red -inset-1 -skew-x-4 -skew-y-3 font-[600] pt-2 pr-4 pb-2 pl-4">
          TheX
          <span className="absolute left-1 top-1 inline-block text-white pt-2 pr-4 pb-2 pl-4 font-[600] z-2">
            TheX
          </span>
          <span className="absolute left-0 top-0 inline-block text-black pt-2 pr-4 pb-2 pl-4 font-[600]] z-3">
            TheX
          </span>
        </span>
      </h1>

      {loading ? (
        <div className="p-8 text-white text-9xl">Loading matchesData...</div>
      ) : (
        <div className="mt-6 lg:mt-8 grid gap-4 lg:gap-6 lg:grid-cols-3 lg:auto-rows-auto">
          <div
            className={classNames(
              gridItemClassName,
              'flex justify-center items-center',
              'col-start-1 col-end-2 row-start-1 row-end-2 '
            )}
          >
            <p>This is box A</p>
          </div>
          {competitionProgress && (
            <div
              ref={circleProgressRef}
              className={classNames(
                gridItemClassName,
                'flex justify-center items-center',
                'col-start-2 col-end-3 row-start-1 row-end-2 '
              )}
            >
              <CircleProgress
                ariaLabel="Profile completion"
                bgColor="--color-violet"
                color="--color-moonstone"
                size={circleProgressSize}
                strokeWidth={circleProgressSize / 8}
                value={
                  (competitionProgress.played * 100) / competitionProgress.count
                }
              />
            </div>
          )}
          <div
            className={classNames(
              gridItemClassName,
              'flex justify-center items-center'
            )}
          >
            <p>This is box B</p>
          </div>
          <div
            className={classNames(
              gridItemClassName,
              'flex justify-center items-center'
            )}
          >
            <div className="w-full aspect-square bg-violet">
              This is box C SQUARED
            </div>
          </div>
          <div
            className={classNames(
              gridItemClassName,
              'flex justify-center items-center'
            )}
          >
            This is box D
          </div>
          <div
            className={classNames(
              gridItemClassName,
              'flex justify-center items-center',
              'col-start-3 col-end-4 row-start-1 row-end-4'
            )}
          >
            {matchesData ? (
              <FixturesDisplay
                fixtures={matchesData.filter(
                  (
                    match: GetCompetitionMatchesApiResponse['matches'][number]
                  ) =>
                    match.status === MatchStatuses.TIMED ||
                    match.status === MatchStatuses.LIVE ||
                    match.status === MatchStatuses.IN_PLAY
                )}
              />
            ) : (
              'No fixtures could be loaded.'
            )}
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-4xl" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                Mobile friendly
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupimatchesDatat commodo.
              </p>
            </div>
            <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 outline outline-white/20">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
        </div>
        <div className="relative max-lg:row-start-1">
          <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-4xl" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                Performance
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores
                impedit.
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
                className="w-full max-lg:max-w-xs"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
        </div>
        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
          <div className="absolute inset-px rounded-lg bg-gray-800" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                Security
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                suspendisse semper morbi.
              </p>
            </div>
            <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                className="h-[min(152px,40cqw)] object-cover"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
        </div>
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                Powerful APIs
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
                eget sem sodales gravida.
              </p>
            </div>
            <div className="relative min-h-120 w-full grow">
              <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900/60 outline outline-white/10">
                <div className="flex bg-gray-900 outline outline-white/5">
                  <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                    <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                      NotificationSetting.jsx
                    </div>
                    <div className="border-r border-gray-600/10 px-4 py-2">
                      App.jsx
                    </div>
                  </div>
                </div>
                <div className="px-6 pt-6 pb-14">{/* Your code example */}</div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
        </div>
      </div>
    </div>
  )
}

export default Home
