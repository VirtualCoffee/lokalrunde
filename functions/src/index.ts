import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import 'firebase-functions'
admin.initializeApp()

import { getPlace, findPlaces } from './places'

const gmapsApiKey: string = functions.config().gmaps.key

export const places = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    const searchText: string = request.query.searchText
    const places = await findPlaces(gmapsApiKey, searchText)

    response.send(places)
  })

export const place = functions
  .region('europe-west1')
  .https.onCall(async (data: { googlePlaceId: string }, context) => {
    if (!data.googlePlaceId)
      throw new functions.https.HttpsError(
        'invalid-argument',
        'You have to provide a google place id (googlePlaceId).'
      )

    console.log('data', data)
    console.log('place id', data.googlePlaceId)

    const place = await getPlace(gmapsApiKey, data.googlePlaceId)

    return place
  })
