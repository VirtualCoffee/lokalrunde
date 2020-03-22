import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import 'firebase-functions'
admin.initializeApp()

import { getPlace, findPlaces } from './places'

export const places = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    const searchText: string = request.query.searchText
    const gmapsApiKey: string = functions.config().gmaps.key

    const places = await findPlaces(gmapsApiKey, searchText)

    response.send(places)
  })

export const place = functions.region('europe-west1').https.onRequest(async (request, response) => {
  const googlePlaceId: string = request.query.googlePlaceId
  const gmapsApiKey: string = functions.config().gmaps.key

  const place = await getPlace(gmapsApiKey, googlePlaceId)

  response.send(place)
})
