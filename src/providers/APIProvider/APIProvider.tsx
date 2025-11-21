import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import type { ReactNode } from 'react'

// Create our Apollo Client instance
const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphqlzero.almansi.me/api' // The API endpoint to execute GraphQL operations against the network
  }),
  cache: new InMemoryCache() // Apollo's caching system
})

interface APIProviderProps {
  children: ReactNode
}

// Create our API Provider component
const APIProvider = ({ children }: APIProviderProps) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default APIProvider
