import { useState } from 'react'

import './App.css'

import Background from 'remoteApp/Background'
import ErrorPage from 'remoteApp/ErrorPage'
import IconButton from 'remoteApp/IconButton'
import { FavoriteIcon } from 'remoteApp/FavoriteIcon'
import { NotificationIcon } from 'remoteApp/NotificationIcon'

import thex from '@src/assets/thex.svg'
import type { APIError } from '@src/types'
import Home from '@src/components/pages/Home/Home'
import ImportMap from '@src/components/ImportMap/ImportMap'
import { Sidebar } from '../Sidebar/Sidebar'

import { useUserStore } from '../../../store/store'

const App = () => {
  const { notifications, wishlist } = useUserStore()
  const [sidebarRetracted, setSidebarRetracted] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<APIError | null>(null)

  const retractSidebarBack = () => {
    setSidebarRetracted((prev) => !prev)
  }

  if (error) {
    return (
      <ErrorPage
        action={
          <button className="border-1 pt-1 pr-2 pb-1 pl-2">Go back home</button>
        }
        message={error.message}
        status={error.status}
        title="Error fetching matches data."
      />
    )
  }

  const showConfetti = false

  return (
    <main className="font-roboto relative">
      {showConfetti && <ImportMap />}
      <Background position="absolute" size="full" src={thex} />
      <div className="relative ml-14 lg:ml-16 h-full bg-black pr-[var(--padding-w-page)] pl-[var(--padding-w-page)]">
        <Home />
      </div>
      <Sidebar
        retracted={sidebarRetracted}
        onRetractBack={retractSidebarBack}
        side="left"
      >
        <ul className="flex flex-col gap-3 text-[1rem]/[1rem] font-bold lg:gap-4">
          <li className="flex items-center gap-2">
            <IconButton
              onClick={() => alert('IconButton clicked')}
              color={
                wishlist.size
                  ? 'var(--color-tiktok-red)'
                  : 'var(--color-powder-blue)'
              }
              notifications={wishlist.size}
              size="32"
            >
              <FavoriteIcon />
            </IconButton>
            <span className={`${sidebarRetracted ? 'hidden' : 'block'}`}>
              Wishlist
            </span>
          </li>
          <li className="flex items-center gap-2">
            <IconButton
              onClick={() => alert('IconButton clicked')}
              color={
                notifications.size
                  ? 'var(--color-tiktok-red)'
                  : 'var(--color-powder-blue)'
              }
              notifications={notifications.size}
              size="32"
            >
              <NotificationIcon />
            </IconButton>
            <span className={`${sidebarRetracted ? 'hidden' : 'block'}`}>
              Notifications
            </span>
          </li>
        </ul>
      </Sidebar>
    </main>
  )
}

export default App
