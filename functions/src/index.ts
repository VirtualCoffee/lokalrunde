import * as functions from 'firebase-functions'
import { findPlaces, getPlace } from './places'

const gmapsApiKey: string = functions.config().gmaps.key

export const places = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    const searchText: string = request.query.searchText

    const places = await findPlaces(gmapsApiKey, searchText)

    response.send(places)
  })

export const place = functions.region('europe-west1').https.onRequest(async (request, response) => {
  const googlePlaceId: string = request.query.googlePlaceId

  const place = await getPlace(gmapsApiKey, googlePlaceId)

  response.send(place)
})
