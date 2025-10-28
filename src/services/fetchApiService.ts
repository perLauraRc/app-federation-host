import { apiToken, urlPathnameBase } from '@src/constants/restApi'
import type { GetCompetitionMatchesApiResponse, APIError } from '@src/types'

const apiURL = (pathSegments: string) =>
  `/api${urlPathnameBase}/${pathSegments}`

export const fetchRequest = async (pathSegments: string[]) => {
  // Fetch API is a modern interface for making asynchronous http GET and POST requests to servers from web browsers
  // The Fetch function returns a promise that can either be resolved or rejected
  const response = await fetch(apiURL(pathSegments.join('/')), {
    headers: { 'X-Auth-Token': apiToken } // My personal API Token
  })

  // The Fetch function only rejects on a network failure and a CORS error (server status errors like 404 or 500 are thus not rejected)
  // A promise resolved will always return a response object that contains the http status of the request and the ok property
  // The ok property is a boolean value that will be true (successful) if the response status code is in the range 200-299
  // A response status code outside of the range 200-299 will output a false (failed) value for the ok property
  // We must check if the response was successful and if not, we throw a custom error message that will
  // be detected in the catch block of the try/catch/finally statement
  if (!response.ok) {
    // Custom error messages for 404 and 500 HTTP status codes
    if (response.status === 404)
      throw {
        status: 500,
        message: 'API request failed with status 404, Not found'
      } as APIError
    if (response.status === 500) {
      throw {
        status: 500,
        message: 'API request failed with status 500, internal server error'
      } as APIError
    }
    // Custom error messages other status codes
    throw {
      status: 500,
      message: `API request failed with status ${response.status}`
    } as APIError
  }
  // Response object is of a non JSON format
  // We must resolve the response to JSON format before returning it
  const requestData: GetCompetitionMatchesApiResponse = await response.json()
  return requestData
}
