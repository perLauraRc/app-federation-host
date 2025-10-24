import { useState } from 'react'

import './App.css'

import Background from 'remoteApp/Background'
import ErrorPage from 'remoteApp/ErrorPage'

import thex from '@/assets/thex.svg'
import type { APIError } from '@/types'
import Home from '@/components/pages/Home/Home'
import ImportMap from '@/components/ImportMap/ImportMap'

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<APIError | null>(null)
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
      <div className="relative h-full bg-black pr-[var(--padding-w-page)] pl-[var(--padding-w-page)]">
        <Home />
      </div>
    </main>
  )
}

export default App
