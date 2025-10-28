import { create } from 'zustand'
import type { Match } from '../src/types'

export interface StoreState {
  fixtures: number
  wishlist: Map<number, Match>
  emptyWishlist: () => void
  addToWishlist: (fixture: Match) => void
  removeFromWishlist: (fixtureId: number) => void
}

export const useStore = create<StoreState>((set) => ({
  fixtures: 0,
  wishlist: new Map<number, Match>(),
  emptyWishlist: () => set({ wishlist: new Map<number, Match>() }),
  addToWishlist: (fixture: Match) =>
    set((state) => {
      const newWishlist = new Map(state.wishlist)
      newWishlist.set(fixture.id, fixture)
      return { wishlist: newWishlist }
    }),
  removeFromWishlist: (fixtureId: number) =>
    set((state) => {
      const newWishlist = new Map(state.wishlist)
      newWishlist.delete(fixtureId)
      return { wishlist: newWishlist }
    })
}))
