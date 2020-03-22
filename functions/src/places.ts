import { Client } from '@googlemaps/google-maps-services-js'
import { AddressType } from '@googlemaps/google-maps-services-js/dist/common'
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
      key: gmapsApiKey
    }
  })

  const googlePlace = searchResponse.data.result

  let imageUrl: string | null = null
  if (googlePlace.photos) {
    const photoResponse = await client.placePhoto({
      params: {
        photoreference: googlePlace.photos[0].photo_reference,
        maxwidth: 600,
        maxheight: 600,
        key: gmapsApiKey
      }
    })

    imageUrl = 'https://lh3.googleusercontent.com' + photoResponse.request.path
  }

  let type: string | null = null
  if (googlePlace.types && googlePlace.types.includes('bar' as AddressType)) type = 'BAR'
  else if (googlePlace.types && googlePlace.types.includes('cafe' as AddressType)) type = 'CAFE'

  const street = googlePlace.formatted_address?.split(', ')[0]
  const zipCode = googlePlace.formatted_address?.split(', ')[1].split(' ')[0]
  const city = googlePlace.formatted_address?.split(', ')[1].split(' ')[1]

  const place = {
    name: googlePlace.name,
    address: googlePlace.formatted_address,
    website: googlePlace.website,
    imageUrl,
    googlePlaceId,
    type,
    street,
    city,
    zipCode,
    latitude: googlePlace.geometry?.location.lat,
    longitude: googlePlace.geometry?.location.lng
  }

  return place
}
