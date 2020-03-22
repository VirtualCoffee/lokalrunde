import { Client } from '@googlemaps/google-maps-services-js'
const client = new Client({})

export const findPlaces = async (gmapsApiKey: string, searchText: string): Promise<object[]> => {
  const searchResponse = await client.textSearch({
    params: {
      query: searchText,
      key: gmapsApiKey
    }
  })

  const places = searchResponse.data.results.map(place => ({
    name: place.name,
    address: place.formatted_address,
    googlePlaceId: place.place_id
  }))

  return places
}

export const getPlace = async (gmapsApiKey: string, googlePlaceId: string): Promise<object> => {
  const searchResponse = await client.placeDetails({
    params: {
      place_id: googlePlaceId,
      fields: ['name', 'geometry', 'formatted_address', 'photos', 'website'],
      key: gmapsApiKey
    }
  })

  const googlePlace = searchResponse.data.result

  let imageUrl: string | null = null
  if (googlePlace.photos) {
    const photoResponse = await client.placePhoto({
      params: {
        photoreference: googlePlace.photos[0].photo_reference,
        maxwidth: 300,
        key: gmapsApiKey
      }
    })

    imageUrl = 'https://lh3.googleusercontent.com' + photoResponse.request.path
  }

  const place = {
    name: googlePlace.name,
    address: googlePlace.formatted_address,
    website: googlePlace.website,
    imageUrl
  }

  return place
}
