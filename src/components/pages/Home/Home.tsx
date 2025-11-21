import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client/react'

import CircleProgress from 'remoteApp/CircleProgress'
import FixturesCarousel from 'remoteApp/FixturesCarousel'
import ErrorPage from 'remoteApp/ErrorPage'

import type {
  APIError,
  Match,
  GetPostsQueryResponse,
  GetPostsQueryVariables
} from '@/types'

import { classNames } from '@/utils/classNames'
import { fetchRequest } from '@/services/fetchApiService'
import {
  CompetitionIds,
  EndpointPath,
  MatchStatuses
} from '@/constants/restApi'
import type { GetCompetitionMatchesApiResponse } from '@/types'
import {
  GRID_GAP_LG,
  GRID_GAP_MD,
  GRID_ITEM_BORDER_WIDTH,
  GRID_ITEM_PADDING_LG,
  GRID_ITEM_PADDING_MD
} from '@/constants/layout'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { GET_POSTS, GET_POSTS_TABLE } from '@/types/graphQL/queries'
import { FixturesDisplay } from '@/components/FixturesDisplay/FixturesDisplay'
import { BrandHeading, Posts } from '@/components'

const gridItemClassName = `flex justify-center items-center p-${GRID_ITEM_PADDING_MD} lg:p-${GRID_ITEM_PADDING_LG} border-cerulean/50 bg-cerulean/20 border-6`

export const Home = () => {
  const isLGMediaQuery = useMediaQuery('(min-width: 1024px)')
  // GraphQL query for posts
  const {
    data: postsData,
    dataState, // "empty" | "complete" | "streaming"
    error: postsQueryError,
    loading: loadingPosts
  } = useQuery<GetPostsQueryResponse, GetPostsQueryVariables>(GET_POSTS_TABLE, {
    variables: {
      options: {
        paginate: {
          page: 1,
          limit: 100
        }
      }
    }
  })
  console.log(' dataState: ', dataState)
  console.log(' postsData: ', postsData)
  const [competitionProgress, setCompetitionProgress] = useState<
    GetCompetitionMatchesApiResponse['resultSet'] | null
  >(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [competitionData, setCompetitionData] = useState<
    GetCompetitionMatchesApiResponse['competition'] | null
  >(null)
  const [matchesData, setMatchesData] = useState<
    GetCompetitionMatchesApiResponse['matches'] | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<APIError | null>(null)
  const gridItemSquareRef = useRef<HTMLDivElement>(null)
  const circleProgressRef = useRef<HTMLDivElement>(null)
  const [gridFullHeight, setGridItemFullHeight] = useState(0)
  const [circleProgressSize, setCircleProgressSize] = useState(0)

  const gridItemBorderBoxPaddingPlusBorder =
    GRID_ITEM_BORDER_WIDTH * 2 +
    (isLGMediaQuery ? GRID_ITEM_PADDING_LG : GRID_ITEM_PADDING_MD) * 4 * 2

  useEffect(() => {
    const fetchGridData = async () => {
      try {
        const data: GetCompetitionMatchesApiResponse = await fetchRequest([
          EndpointPath.Competitions,
          CompetitionIds.CL,
          EndpointPath.Matches
        ])
        setCompetitionProgress(data.resultSet)
        setCompetitionData(data.competition)
        setMatchesData(data.matches)
        setError(null)
      } catch (error) {
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
        const { width: circleProgressWidth } = entry.contentRect

        if (circleProgressWidth > 0) {
          setCircleProgressSize(circleProgressWidth)
        }
      }
    })

    resizeObserver.observe(observeTarget)

    return () => resizeObserver.disconnect()
  }, [competitionProgress])

  useEffect(() => {
    const observeTarget = gridItemSquareRef.current
    if (!observeTarget || !matchesData) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height: gridItemSquareHeight } = entry.contentRect

        if (gridItemSquareHeight > 0) {
          // Calculates the height of a grid item which spans 3 (LG) or 4 (MD) rows plus gaps
          const gridFullHeight = isLGMediaQuery
            ? (gridItemSquareHeight + gridItemBorderBoxPaddingPlusBorder) * 3 +
              GRID_GAP_LG * 4 * 2 // Media query screen bigger than 1024px renders a grid with 3 rows
            : (gridItemSquareHeight + gridItemBorderBoxPaddingPlusBorder) * 4 +
              GRID_GAP_MD * 4 * 3 // Media query screen smaller than 1024px renders a grid with 4 rows
          // eslint-disable-next-line no-console
          console.log(
            'gridItemSquareHeight observed:',
            gridItemSquareHeight,
            'isLGMediaQuery:',
            isLGMediaQuery,
            'gridFullHeight calculated:',
            gridFullHeight
          )
          setGridItemFullHeight(gridFullHeight)
        }
      }
    })

    resizeObserver.observe(observeTarget)

    return () => resizeObserver.disconnect()
  }, [matchesData, isLGMediaQuery, gridItemBorderBoxPaddingPlusBorder])

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
    <div
      className={`mx-auto max-w-4xl${GRID_ITEM_PADDING_MD} lg:lg:max-w-7xl${GRID_ITEM_PADDING_LG}`}
      data-testid="home-page"
    >
      <BrandHeading />
      {loading ? (
        <div className="p-8 text-9xl text-white">Loading matchesData...</div>
      ) : (
        <div
          className={
            'mt-6 grid grid-cols-2 gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-6'
          }
        >
          <div
            className={classNames(
              gridItemClassName,
              'col-start-1 col-end-2 row-start-1 row-end-2',
              'aspect-square'
            )}
            ref={gridItemSquareRef}
          >
            {matchesData ? (
              <FixturesCarousel
                fixtures={matchesData as Match[]}
                visibleCount={1}
              />
            ) : (
              'No fixtures could be loaded.'
            )}
          </div>
          {competitionProgress && (
            <div
              ref={circleProgressRef}
              className={classNames(
                gridItemClassName,
                'col-start-1 col-end-2 row-start-2 row-end-3',
                'lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2',
                'aspect-square'
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
              'col-span-2 lg:col-span-1'
            )}
          >
            {postsQueryError ? (
              <div className="text-white">
                <p>Error loading posts: {postsQueryError.message}</p>
              </div>
            ) : (
              <Posts
                loading={loadingPosts}
                posts={postsData?.posts.data || []}
              />
            )}
          </div>
          <div
            className={classNames(
              gridItemClassName,
              'aspect-square',
              'items-start'
            )}
          >
            <div className="max-h-full w-full overflow-hidden">
              <p>
                This is box C.
                <br />
                <br />
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                  in fugiat rem maxime nihil officiis corrupti nostrum
                  asperiores culpa odio esse ducimus ratione, facilis magni
                  dolores nesciunt! Commodi, provident hic. Lorem ipsum dolor,
                  sit amet consectetur adipisicing elit. Eius in fugiat rem
                  maxime nihil officiis corrupti nostrum asperiores culpa odio
                  esse ducimus ratione, facilis magni dolores nesciunt! Commodi,
                  provident hic. Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Eius in fugiat rem maxime nihil officiis
                  corrupti nostrum asperiores culpa odio esse ducimus ratione,
                  facilis magni dolores nesciunt! Commodi, provident hic.
                </span>
              </p>
            </div>
          </div>
          <div className={classNames(gridItemClassName, 'aspect-square')}>
            This is box D
          </div>
          <div
            className={classNames(
              gridItemClassName,
              'items-start',
              'col-start-2 col-end-3 row-start-1 row-end-5',
              'lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4'
            )}
          >
            <div
              className="overflow-hidden"
              style={{
                maxHeight: `${
                  gridFullHeight - gridItemBorderBoxPaddingPlusBorder
                }px`
              }}
            >
              {matchesData ? (
                <FixturesDisplay
                  fixtures={matchesData.filter(
                    (
                      match: GetCompetitionMatchesApiResponse['matches'][number]
                    ) =>
                      match.status === MatchStatuses.TIMED ||
                      match.status === MatchStatuses.SCHEDULED ||
                      match.status === MatchStatuses.IN_PLAY ||
                      match.status === MatchStatuses.LIVE ||
                      match.status === MatchStatuses.FINISHED
                  )}
                />
              ) : (
                'No fixtures could be loaded.'
              )}
            </div>
          </div>
          <div className={classNames(gridItemClassName, 'aspect-square')}>
            <p>This is box E</p>
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
