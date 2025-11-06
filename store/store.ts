import { create } from 'zustand'
import type { Match } from '../src/types'

export interface StoreState {
  fixtures: number
  notifications: Map<number, string>
  wishlist: Map<number, Match>
  emptyWishlist: () => void
  addToWishlist: (fixture: Match) => void
  removeFromWishlist: (fixtureId: number) => void
}

export const useUserStore = create<StoreState>((set) => ({
  fixtures: 0,
  notifications: new Map<number, string>(),
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
