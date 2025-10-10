import { useCallback, useSyncExternalStore } from 'react'

export const makeMediaQueryStore = (mediaQuery: string): boolean => {
  const getMediaQuerySnapshot = useCallback(() => {
    console.log('getMediaQuerySnapshot called with mediaQuery:', mediaQuery)
    return window.matchMedia(mediaQuery).matches
  }, [mediaQuery])

  const subscribeToMediaQuery = useCallback(
    (callback: () => void) => {
      console.log('subscribeToMediaQuery called with mediaQuery:', mediaQuery)
      const mediaQueryList = window.matchMedia(mediaQuery)
      mediaQueryList.addEventListener('change', callback)
      return () => {
        mediaQueryList.removeEventListener('change', callback)
      }
    },
    [mediaQuery]
  )

  return useSyncExternalStore(subscribeToMediaQuery, getMediaQuerySnapshot)
}
