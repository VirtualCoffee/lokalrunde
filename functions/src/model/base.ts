export interface LRLocation {
  id: string
  name: string
  imageUrl: string
  city: string
  street: string
  zipCode: string
  googlePlaceId: string
  type: LocationType
}

export enum LocationType {
  BAR = "BAR",
  CAFE = "CAFE"
}

export interface LocationDetail {
  ownerName: string
  donationLink: string
  paypalAccountReceiver: string
  description: string
  lat: number
  lng: number
  website: string
}

export interface Product {
  id?: string
  name: string
  price: number
  type: ProductType
}

export enum ProductType {
  COFFEE = "COFFEE",
  CAKE = "CAKE",
  BEER = "BEER",
  BURGER = "BURGER",
  BUYAROUND = "BUYAROUND"
}
