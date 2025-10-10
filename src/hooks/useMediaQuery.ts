/**
 * useMediaQuery - Custom hook to check if a media query matches
 *
 * @param mediaQuery - Media query string (e.g., '(min-width: 1024px)')
 * @returns boolean indicating if the media query matches
 *
 * @example
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)')
 */

import { makeMediaQueryStore } from './makeMediaQueryStore'

export const useMediaQuery = (mediaQuery: string): boolean => {
  return makeMediaQueryStore(mediaQuery)
}
