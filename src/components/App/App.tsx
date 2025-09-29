import { useState } from 'react'

import './App.css'

import Background from 'remoteApp/Background'
import ErrorPage from 'remoteApp/ErrorPage'

import thex from '@/assets/thex.svg'
import type { APIError } from '@/types'
import Home from '@/components/pages/Home/Home'

const App = () => {
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

  return (
    <div className="font-roboto relative">
      <Background position="absolute" size="full" src={thex} />
      <div className="relative h-full pr-w-page pl-w-page bg-black">
        <Home />
      </div>
    </div>
  )
}

export default App
